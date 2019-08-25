module.exports = (api) => {
  api.cache(true);

  const presets = ['@babel/preset-env'];
  const plugins = [
      '@babel/transform-runtime',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-transform-classes'
  ];

  return {
    presets,
    plugins
  };
};
