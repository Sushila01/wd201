// eslint.config.mjs

import { eslint } from '@eslint/js';
import prettier from 'eslint-config-prettier';

export default [
  eslint.configs.recommended, // Use ESLint's recommended config
  prettier, // Disable ESLint rules that conflict with Prettier
  {
    files: ['**/*.js'], // Specify that the rules apply to all JavaScript files
    rules: {
      // Add any custom rules here
      'no-unused-vars': 'warn', // Warn about unused variables
      'no-console': 'off', // Allow console statements
      'prefer-const': 'error', // Enforce using const for variables that aren't reassigned
    },
    env: {
      node: true, // Set Node.js environment
      es6: true,
    },
    parserOptions: {
      ecmaVersion: 'latest', // Use the latest ECMAScript syntax
      sourceType: 'module', // Enable ES6 modules
    },
  },
];
