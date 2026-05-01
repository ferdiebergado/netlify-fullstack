// eslint-disable-next-line unicorn/no-null
let cachedNonce: string | null = null;

export function getCSPNonce(): string {
  if (cachedNonce) return cachedNonce;

  cachedNonce = document.querySelector<HTMLMetaElement>('meta[property="csp-nonce"]')?.nonce ?? '';

  if (!cachedNonce) console.warn('CSP nonce meta tag not found. This may cause CSP violations.');

  return cachedNonce;
}
