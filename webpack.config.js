'use strict';

const webpack = require('webpack');
const path = require('path');

let config = {
	entry: {
		main: [
			"@babel/polyfill",
			'./src/app.js'
		]
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js'
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx|tsx|ts)$/,
				exclude: path.resolve(__dirname, 'node_modules'),
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-react'
						],
						plugins: [
							['@babel/plugin-proposal-class-properties', { "loose": true }]
						]
					}
				},
			}
		]
	},
};

if (process.env.NODE_ENV === 'production') {
	config.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: false,
			compress: {
				sequences: true,
				conditionals: true,
				booleans: true,
				if_return: true,
				join_vars: true,
				drop_console: true
			},
			output: {
				comments: false
			},
			minimize: true
		})
	);
}

module.exports = config;