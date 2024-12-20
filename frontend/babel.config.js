export default {
    presets: [
      '@babel/preset-env', // For JavaScript transformation
      '@babel/preset-typescript', // For TypeScript transformation
    ],
    plugins: [
      '@babel/plugin-transform-modules-commonjs', // Convert ESM to CommonJS for Jest
    ],
  };
  