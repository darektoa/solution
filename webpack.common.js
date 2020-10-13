const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    entry: {
        index: "./src/app.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            template: "./src/team.html",
            filename: "team.html",
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            template: "./src/schedule.html",
            filename: "schedule.html",
            chunks: ['index']
        })
    ]
}