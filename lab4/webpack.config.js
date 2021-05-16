const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
    },
    devtool: 'inline-source-map',
    plugins: [
        new CopyPlugin([
            {
                from: "src/*.html",
                to: "",
                flatten: true
            }
        ])
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: "style-loader"
                    },
                    "css-loader",
                    "sass-loader"
                ]
            }
        ],
    },

};
