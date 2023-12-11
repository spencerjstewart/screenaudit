const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js', // Path to your main JavaScript file
  output: {
    filename: 'background.js', // Output bundle file name
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
};
