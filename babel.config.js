module.exports = {
  presets: ["babel-preset-expo"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          "@data": "./src/data",
          "@components": "./src/components",
          "@services": "./src/services",
          "@utils": "./src/utils",
          "@assets": "./src/assets",
          "@styles": "./src/styles",
          "@models": "./src/models",
          "@navigation": "./src/navigation"
        }
      }
    ]
  ]
};