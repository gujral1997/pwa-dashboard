
const HtmlWebPackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

const path = require('path')

const commonPlugins = [
    new ServiceWorkerWebpackPlugin({
        entry: path.join(__dirname, 'src/sw.js'),
    }),
]

module.exports = ({ env }) => {
    const analyzer = env === "analyze" ?
        [
            new BundleAnalyzerPlugin({
                analyzerMode: "static",
                reportFilename: "./report.html",
                openAnalyzer: true,
            })] : []

    return {
        mode: "production",
        entry: "./src/index.tsx",
        resolve: {
            extensions: [".js", ".ts", ".tsx"]
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.(tsx|js|ts)$/,
                    loader: "babel-loader",
                    exclude: /node-modules/,
                    options: {
                        presets: [
                            "@babel/react",
                            "@babel/typescript",
                            ["@babel/env", { targets: { browsers: ["last 2 versions"] } }]
                        ],
                        plugins: [
                            "@babel/plugin-proposal-class-properties",
                            "@babel/plugin-proposal-export-default-from",
                            "@babel/plugin-syntax-dynamic-import"
                        ]
                    }
                }
            ],
        },
        plugins: [
            ...analyzer,
            ...commonPlugins,
            new HtmlWebPackPlugin({
                template: './src/index.html',
                filename: 'index.html',
            })
        ],
        devServer: {
            historyApiFallback: true
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            }
        }
    }
};