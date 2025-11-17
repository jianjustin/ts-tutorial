const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx', // 入口文件
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist') // 输出目录
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'] // 解析的文件类型
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // 处理 TypeScript 文件
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // 指向含 index.html 的目录，或保留 dist 并使用 HtmlWebpackPlugin
    },
    port: 3000, // 开发服务器端口
    open: true, // 自动打开浏览器
    historyApiFallback: true // SPA 路由回退到 index.html
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      inject: 'body'
    })
  ],
  mode: 'development' // 设置开发模式
};
