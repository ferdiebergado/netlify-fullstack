import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import unicorn from 'eslint-plugin-unicorn';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const sharedExtends = [unicorn.configs.recommended, prettier];

const unicornRelaxedRules = {
  'unicorn/prevent-abbreviations': 'off',
  'unicorn/no-anonymous-default-export': 'off',
  'unicorn/filename-case': 'off',
};

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['src/**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      sharedExtends,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: unicornRelaxedRules,
  },
  {
    files: [
      'backend/**/*ts',
      'netlify/functions/**/*.ts',
      'shared/**/*.ts',
      'tests/integration/**/*.ts',
      'tests/helpers/**/*.ts',
    ],
    extends: [js.configs.recommended, tseslint.configs.strictTypeChecked, sharedExtends],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        project: ['./tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: unicornRelaxedRules,
  },
  {
    files: ['netlify/edge-functions/**/*.ts'],
    extends: [js.configs.recommended, tseslint.configs.strictTypeChecked, sharedExtends],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        project: ['./tsconfig.edge-functions.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: unicornRelaxedRules,
  },
]);
