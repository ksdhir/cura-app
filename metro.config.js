const { getDefaultConfig } = require("expo/metro-config");

// Get the default configuration
const config = getDefaultConfig(__dirname);

// Modify the configuration to include both sets of changes
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer"),
};

config.resolver.assetExts = config.resolver.assetExts.filter(
  (ext) => ext !== "svg"
);
config.resolver.sourceExts.push("svg");
config.resolver.assetExts.push("cjs"); // Add "cjs" to asset extensions

module.exports = config;
