module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        require.resolve("babel-plugin-module-resolver"),
        {
          extensions: [".ts", ".tsx", ".ios.ts", ".android.ts"],
          alias: {
            navigation: "./navigation",
            screens: "./screens",
            component: "./components",
            constants: "./constants",
            assets: "./assets",
            api: "./api",
            action: "./redux/action",
            types: "./types",
            hooks: "./hooks",
            storage: "./storage",
            utils: "./utils"
          }
        }
      ]
    ]
  };
};
