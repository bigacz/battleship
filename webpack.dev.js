const path = require('path');

module.exports = {
  extends: path.resolve(__dirname, './webpack.common.js'),
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    open: true,
    watchFiles: ['src/**/*'],
  },
};
