// Mainly by following webpack doc:
// https://webpack.js.org/guides/typescript/

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const outDir = path.join(__dirname, 'dist');

// Config use for development. used by webpack-dev-server
const devConfig = {
	mode: 'development',
	devtool: 'inline-source-map',
	cache: false,
	devServer: {
		port: 8800,
		static: [path.resolve(__dirname)],
		hot: true,
		liveReload: true,
		historyApiFallback: true,
	},
};

// TODO optimizations (currently quite random)
const prodConfig = {
	mode: 'production',
	performance: {
		hints: 'warning',
		maxAssetSize: 200000,
		maxEntrypointSize: 400000,
	},
	optimization: {
		chunkIds: 'total-size',
		moduleIds: 'size',
		nodeEnv: 'production',
		flagIncludedChunks: true,
		sideEffects: true,
		usedExports: true,
		concatenateModules: true,
		emitOnErrors: false,
		checkWasmTypes: true,
		minimize: true,
	},
};

module.exports = (env, argv) => {
	const config = {
		entry: './src/App.tsx',
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
				{
					test: /\.(sa|sc|c)ss$/,
					use: ['css-loader', 'sass-loader'],
				},
				{
					test: /\.jppoe?g$|\.gif$|\.ico$|\.png$|\.svg$|\.html$/,
					use: 'file-loader?name=[name].[ext]',
				},

				// the following rules handle font extraction
				{
					test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
					loader: 'url-loader',
					options: { limit: 10000, mimetype: 'application/font-woff' },
				},
				{
					test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
					loader: 'file-loader',
				},
				{
					test: /\.otf(\?.*)?$/,
					use: 'file-loader?name=/fonts/[name].[ext]&mimetype=application/font-otf',
				},
			],
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
		},
		plugins: [
			new CopyWebpackPlugin({
				patterns: [{ from: path.join(__dirname, 'public/'), to: outDir }],
			}),
		],
		output: {
			filename: 'bundle.js',
			path: outDir,
			publicPath: '/',
		},

		...(argv.mode === 'production' ? prodConfig : devConfig),
	};
	console.log('webpack config loaded: ', config);
	return config;
};
