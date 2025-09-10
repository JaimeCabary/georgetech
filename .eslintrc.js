module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  overrides: [
    {
      files: ['public/sw.js', 'src/sw.js', '**/sw.js', '**/*worker*.js'],
      env: {
        serviceworker: true,
        browser: true
      },
      globals: {
        self: 'readonly',
        caches: 'readonly',
        clients: 'readonly',
        registration: 'readonly',
        skipWaiting: 'readonly',
        importScripts: 'readonly'
      },
      rules: {
        'no-restricted-globals': 'off'
      }
    }
  ],
  rules: {
    // Add any custom rules here
  }
};