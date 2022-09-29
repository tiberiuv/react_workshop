require('dotenv').config()
var path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
// const autoprefixer = require('autoprefixer')

const buildEnv = process.env.NODE_ENV || 'production'
console.log(buildEnv)
const isProduction = buildEnv === 'production'

let config = {
    development: {
        minify: false,
        sourceMap: 'cheap-module-source-map',
        hotReload: true,
    },
    production: {
        minify: true,
        sourceMap: 'sourcemap',
        hotReload: false,
    },
}

config = config[buildEnv]

let filename = '[name].[contenthash:10].js'
let chunkFilename = '[name].[contenthash:10].chunk.js'

if (config.hotReload) {
    filename = '[name].js'
    chunkFilename = '[name].chunk.js'
}

const postCssOptions = {
    sourceMap: true,
}

module.exports = (env, argv) => {
    console.log("ENV", env)
    console.log("CLI args", argv)
    const isDev = argv.mode === 'development'
    const isProd = !argv.mode || argv.mode === 'production'
    const prod = {
        mode: 'production',
    }
    return {
        mode: isProduction ? buildEnv : 'development',
        entry: {boiler_plate: ['./src/index']},
        output: {
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/',
            sourceMapFilename: '[file].map',
            filename: filename,
            chunkFilename,
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json'],
            fallback: {
                path: false,
                os: false,
            },
            plugins: [new TsconfigPathsPlugin()]
        },
        cache: true,
        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                },
                {
                    test: /\.css/,
                    use: [
                        'style-loader',
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {loader: 'postcss-loader', options: postCssOptions},
                    ],
                },
                {
                    test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                    type: 'asset/inline',
                },
                {
                    test: /\.(png|jpg|jpeg)/,
                    type: 'asset/resource',
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/template.html',
                filename: './index.html',
                inject: 'body',
                buildEnv,
                minify: config.minify,
            }),
            new CaseSensitivePathsPlugin(),
            new MiniCssExtractPlugin(),
            // new BundleAnalyzerPlugin(),
        ],
        optimization: {
            nodeEnv: buildEnv,
            moduleIds: 'deterministic',
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    defaultVendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module, chunks, cacheGroupKey) {
                            const moduleFileName = module
                                .identifier()
                                .split('/')
                                .reduceRight((item) => item);
                            const allChunksNames = chunks.map((item) => item.name).join('~');
                            return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`
                        },
                        priority: -10,
                        chunks: 'all',
                        reuseExistingChunk: true,
                    },
                     default: {
                          minChunks: 2,
                          priority: -20,
                          reuseExistingChunk: true,
                    }
                },
            },
        },
        devtool: config.source_map,
    }
}
