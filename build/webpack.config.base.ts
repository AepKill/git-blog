import copyPlugin from 'copy-webpack-plugin';
import htmlPlugin from 'html-webpack-plugin';
import { resolve } from 'path';
import { Configuration } from 'webpack';
import { buildInfo } from './build-info';

const baseConfig: Configuration = {
  entry: {
    bootstrap: './src/bootstrap/index.ts',
    main: './src/index.tsx'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@stores': resolve(__dirname, '../src/stores'),
      '@services': resolve(__dirname, '../src/services'),
      '@components': resolve(__dirname, '../src/components'),
      '@utils': resolve(__dirname, '../src/utils'),
      '@pages': resolve(__dirname, '../src/pages'),
      '@i18n': resolve(__dirname, '../src/i18n')
    }
  },
  context: resolve(__dirname, '..'),
  module: {
    rules: [
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'assets/images/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    new copyPlugin([
      {
        from: './src/favicon.png',
        to: 'favicon.png',
        toType: 'file'
      }
    ]),
    new copyPlugin([
      {
        from: './src/assets/meta',
        to: 'assets/meta',
        toType: 'dir'
      }
    ]),
    new copyPlugin([
      {
        from: './src/assets/post',
        to: 'assets/post',
        toType: 'dir'
      }
    ]),
    ...['index.html', '404.html'].map(
      filename =>
        new htmlPlugin({
          template: './src/index.html',
          minify: {
            removeComments: false,
            minifyJS: false,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyCSS: true,
            minifyURLs: true
          },
          filename,
          buildInfo
        })
    )
  ],
  output: {
    path: resolve(__dirname, '../dist'),
    publicPath: '/'
  }
};

export default baseConfig;
