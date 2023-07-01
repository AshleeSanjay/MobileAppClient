const createExpoWebpackConfig = require("@expo/webpack-config");

async function createConfig(env, argv) {
  return await createExpoWebpackConfig(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: [],
      },
    },
    argv
  );
}

module.exports = createConfig;
