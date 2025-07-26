const { override } = require('customize-cra');

module.exports = override(
  (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback, // Keep existing fallbacks
      "http": require.resolve('stream-http'),
      "https": require.resolve('https-browserify'),
      "util": require.resolve('util'),
      "zlib": require.resolve('browserify-zlib'),
      "stream": require.resolve('stream-browserify'),
      "url": require.resolve('url'),
      "crypto": require.resolve('crypto-browserify'),
      "assert": require.resolve('assert'),
    };
    return config;
  }
);