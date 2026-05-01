import type { Context } from '@netlify/edge-functions';
import { randomBytes } from 'node:crypto';

import { CSP_NONCE_PLACEHOLDER, GOOGLE_ACCOUNTS_ORIGIN } from '@shared/constants.js';

// Security headers configuration
const SECURITY_HEADERS = {
  // Content Security Policy configuration
  CSP_DIRECTIVES: {
    'default-src': ["'none'"],
    'script-src': [
      "'self'",
      GOOGLE_ACCOUNTS_ORIGIN,
      "'strict-dynamic'", // Enables strict dynamic for better XSS protection
    ],
    'style-src': ["'self'", GOOGLE_ACCOUNTS_ORIGIN],
    'img-src': ["'self'", 'https://*.googleusercontent.com'],
    'font-src': ["'self'"],
    'connect-src': ["'self'", GOOGLE_ACCOUNTS_ORIGIN],
    'worker-src': ["'self'", 'blob:'],
    'frame-src': [GOOGLE_ACCOUNTS_ORIGIN],
    'frame-ancestors': [GOOGLE_ACCOUNTS_ORIGIN],
    'base-uri': ["'none'"], // Prevents <base> manipulation
    'form-action': ["'self'"], // Restricts where forms can submit
    'upgrade-insecure-requests': [], // Forces HTTPS upgrades
  },

  // Permissions Policy directives
  PERMISSIONS_POLICY: {
    geolocation: '()',
    midi: '()',
    payment: '()',
    camera: '()',
    microphone: '()',
    usb: '()',
    fullscreen: 'self',
    accelerometer: '()',
    'ambient-light-sensor': '()',
    autoplay: '()',
    battery: '()',
    'clipboard-read': '()',
    'clipboard-write': '()',
    'display-capture': '()',
    'document-domain': '()',
    'encrypted-media': '()',
    'execution-while-not-rendered': '()',
    'execution-while-out-of-viewport': '()',
    gamepad: '()',
    hid: '()',
    'identity-credentials-get': '()',
    'idle-detection': '()',
    'local-fonts': '()',
    magnetometer: '()',
    'microphone-map': '()',
    'otp-credentials': '()',
    'payment-handler': '()',
    'picture-in-picture': '()',
    'publickey-credentials-create': '()',
    'publickey-credentials-get': '()',
    'screen-wake-lock': '()',
    serial: '()',
    'speaker-selection': '()',
    'storage-access': '()',
    'sync-xhr': '()',
    'unoptimized-images': '()',
    'unoptimized-video': '()',
    'vertical-scroll': '()',
    'web-share': '()',
    'window-management': '()',
    'xr-spatial-tracking': '()',
  },

  // Other security headers
  REFERRER_POLICY: 'strict-origin-when-cross-origin',
  X_CONTENT_TYPE_OPTIONS: 'nosniff',
  X_FRAME_OPTIONS: 'DENY', // Additional protection against clickjacking
};

type CSPDirective = keyof typeof SECURITY_HEADERS.CSP_DIRECTIVES;

/**
 * Builds a Content Security Policy string from directives
 * @param directives Object mapping directive names to their values
 * @param nonce Optional nonce to include in script/style-src
 * @returns Formatted CSP string
 */
function buildCSP(directives: Record<CSPDirective, string[]>, nonce?: string): string {
  // Extract environment check for clarity and performance
  const isDevelopment = process.env.ENV === 'development';

  return Object.entries(directives)
    .map(([directive, values]) => {
      let value = '';

      // Handle nonce-specific directives when nonce is provided
      if (nonce) {
        const nonceValue = `'nonce-${nonce}'`;

        switch (directive) {
          case 'script-src': {
            value = nonceValue;
            break;
          }
          case 'style-src': {
            // Use unsafe-inline in development for HMR, nonce in production
            value = isDevelopment ? `'unsafe-inline'` : nonceValue;
            break;
          }
        }
      }

      // Filter out empty values to prevent unnecessary spacing
      values = [...values, value].filter(Boolean);

      return `${directive} ${values.join(' ')}`;
    })
    .join('; ');
}

type PermissionsDirective = keyof typeof SECURITY_HEADERS.PERMISSIONS_POLICY;

/**
 * Builds a Permissions Policy string from directives
 * @param directives Object mapping feature names to their allowlists
 * @returns Formatted Permissions Policy string
 */
function buildPermissionsPolicy(directives: Record<PermissionsDirective, string>): string {
  return Object.entries(directives)
    .map(([feature, allowlist]) => {
      // For empty allowlists, use empty parentheses to deny all
      if (allowlist === '()') return `${feature}=()`;

      // For self allowlists, use self without parentheses
      if (allowlist === 'self') return `${feature}=self`;

      return `${feature}=${allowlist}`;
    })
    .join(', ');
}

export default async (req: Request, ctx: Context) => {
  console.log({ url: req.url }, 'Processing security headers...');

  const res = await ctx.next();
  const contentType = res.headers.get('content-type');

  // Only process HTML responses
  if (!contentType?.includes('text/html')) return res;

  console.log('Injecting CSP nonce...');

  // Generate a secure nonce for this request
  const nonce = randomBytes(16).toString('base64');

  // Build security headers
  const csp = buildCSP(SECURITY_HEADERS.CSP_DIRECTIVES, nonce);
  const permissions = buildPermissionsPolicy(SECURITY_HEADERS.PERMISSIONS_POLICY);

  // Process HTML content
  const html = await res.text();
  const htmlWithNonce = html.replaceAll(CSP_NONCE_PLACEHOLDER, nonce);

  // Create new headers with security enhancements
  const headers = new Headers(res.headers);
  headers.set('Content-Security-Policy', csp);
  headers.set('Permissions-Policy', permissions);
  headers.set('Referrer-Policy', SECURITY_HEADERS.REFERRER_POLICY);
  headers.set('X-Content-Type-Options', SECURITY_HEADERS.X_CONTENT_TYPE_OPTIONS);
  headers.set('X-Frame-Options', SECURITY_HEADERS.X_FRAME_OPTIONS);

  return new Response(htmlWithNonce, {
    status: res.status,
    headers,
  });
};
