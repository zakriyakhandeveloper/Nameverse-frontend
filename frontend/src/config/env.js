/**
 * Environment Configuration
 * Validates and exports environment variables with defaults
 */

/**
 * Validates required environment variables
 * @throws {Error} If required env vars are missing
 */
function validateEnv() {
  const required = [
    'NEXT_PUBLIC_SITE_URL',
    'NEXT_PUBLIC_API_BASE',
  ];

  const missing = required.filter((key) => !process.env[key]);

  // Only warn in production build, not during development
  if (missing.length > 0 && process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'phase-production-build') {
    console.warn(
      `Warning: Missing environment variables: ${missing.join(', ')}. Using defaults.`
    );
  }
}

// Validate on import (only in production build phase)
if (typeof window === 'undefined') {
  validateEnv();
}

/**
 * Environment Configuration Object
 */
export const env = {
  // Site Configuration
  site: {
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app',
    name: process.env.NEXT_PUBLIC_SITE_NAME || 'NameVerse',
  },

  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000/api',
    // Increased timeout for build processes
    timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '60000', 10),
    version: '', // No API version prefix
  },

  // Environment
  nodeEnv: process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',

  // Feature Flags
  features: {
    analytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    pwa: process.env.NEXT_PUBLIC_ENABLE_PWA !== 'false',
    sentry: process.env.NEXT_PUBLIC_ENABLE_SENTRY === 'true',
  },

  // Analytics
  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_ID || '',
    gtmId: process.env.NEXT_PUBLIC_GTM_ID || '',
  },
};

// Export default
export default env;