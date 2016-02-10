var path = require('path');
module.exports = {
  entry: {
    app: ["./js/letter_painter.js"]
  },
  output: {
    path: path.join(__dirname, 'js'),
    publicPath: '/js/',
    filename: 'bundle.js',
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
  },
  devtool: 'source-maps',
  resolve: {
    extensions: ["", ".js", '.jsx']
  }
};
