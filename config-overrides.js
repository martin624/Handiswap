// const webpack = require("webpack");

// module.exports = function override(config, env){
//     config.resolve.fallback = {
//         // util: require.resolve('util/'),
//         // url: require.resolve('url'),
//         // assert: require.resolve('assert'),
//         buffer: require.resolve('buffer'),
//     };
//     config.plugins.push(
//         new webpack.ProvidePlugin({
//             // process: 'process/browser',
//             buffer: ['buffer', 'Buffer'],
//         })
//     )
//     return config;
// }


const { override, addWebpackPlugin, addWebpackResolve } = require('customize-cra');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const webpack = require('webpack');

module.exports = override(
  addWebpackResolve({
    fallback: {
      buffer: require.resolve('buffer/'),
    }
  }),
  addWebpackPlugin(new NodePolyfillPlugin()),
  addWebpackPlugin(
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    })
  )
);
