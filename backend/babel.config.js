export default {
    presets: [
      '@babel/preset-env',  // Transpile modern JavaScript to support older Node.js versions or browsers
    ],
    plugins: [
      '@babel/plugin-transform-modules-commonjs',  // Convert ESM to CommonJS for Jest compatibility
      '@babel/plugin-transform-runtime',  // Ensure async/await and polyfills work correctly
    ],
  };
  