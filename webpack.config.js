var path = require('path'); // used to get context
var fs = require('fs');

module.exports = {
    context: __dirname, // resolves entry below, must be absolute path
    entry: './src/index.js', // entry point or loader for the application
    output: {
        path: path.join(__dirname, 'app/lib'), // express static folder is at /app/lib
        filename: '[name].bundle.js', // the file name of the bundle to create.  [name] is replaced by the name of the chunk (code-splitting)
        publicPath: 'static' // example uses express as the webserver
    },
    devServer: {
        publicPath: "/",
        contentBase: "./",
        hot: true
    },
    experiments: {
        topLevelAwait: true
    },
    externals: fs.readdirSync("node_modules")
        .reduce(function (acc, mod) {
            if (mod === ".bin") {
                return acc
            }

            acc[mod] = "commonjs " + mod
            return acc
        }, {}),
    loader: {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
            "babel?{stage:0,jsxPragma:'this.createElement'}",
            "eslint",
        ],
    },
    resolve: {
        fallback: {
            "crypto": require.resolve("crypto-browserify"),
            "path": require.resolve('path'),
            "os": require.resolve("os-browserify/browser")
        }
    },
    module: {
        rules: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
}