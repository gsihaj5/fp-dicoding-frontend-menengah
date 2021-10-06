const HtmlWebpackPlugin = require("html-webpack-plugin");
require("babel-core/register");
require("babel-polyfill");

module.exports = {
    entry: ["babel-polyfill", "./src/js/main.js"],
    output: {
        path: __dirname + "/dist",
        filename: "main.js",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            inject: true,
        }),
    ],
};
