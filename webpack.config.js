const path = require('path');

module.exports = (env, argv) => {
    const dev = argv.mode !== 'production';
    return {
        entry: {
            common: path.resolve(__dirname, 'core/node.js'),
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js',
        },
        devtool: dev ? 'cheap-module-source-map' : false,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                }
            ]
        },
    };
};
