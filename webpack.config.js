const path = require("path")
const fs = require("fs")
const MiniCSSExtractPlugin = require("mini-css-extract-plugin")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const TerserWebpackPlugin = require("terser-webpack-plugin")
const CSSMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin")

// С помощью модуля cross-env (cli) определяем, является ли текущий режим разработки "production"
const devMode = process.env.NODE_ENV === "development"
const prodMode = !devMode

// Находит все html-файлы в папке src
const htmlFiles = fs
	.readdirSync(path.resolve(__dirname, "src"), { withFileTypes: true })
	.filter(e => e.isFile() && e.name.includes(".html"))
	.map(file => file.name)

// Если включен режим разработки, папка dist будет удалена
if (devMode) {
	const pathDist = path.resolve(__dirname, 'dist')
	fs.stat(pathDist, err => {
		if (!err) {
			fs.rm(pathDist, { recursive: true }, err => {
				if (err) {
					throw Error(err)
				}
			})
		}
	})
}

module.exports = {
	// Контекст сборщика (корневая папка исходников)
	context: path.resolve(__dirname, 'src'),
	// Режим разработки
	mode: devMode ? "development" : "production",
	// Входные точки (js-файлы, которые webpack будет анализировать)
	entry: {
		index: [ "@babel/polyfill", "./assets/js/index.js" ],
	},
	// Выходные точки (файлы)
	output: {
		// Какое будет имя у файлов
		filename: devMode ? "[name].js" : "[name].[contenthash].js",
		// Где разместить файлы
		path: path.resolve(__dirname, "dist"),
		// Нужно ли чистить (удалять) папку с обработанными файлами перед сборкой
		clean: true,
	},
	// Настройка сервера (webpack-dev-server)
	devServer: {
		// Номер порта, на котором будет работать сервер
		port: 4200,
		// Режим горячей перезагрузки (обновление изменений без полной перезагрузки страницы)
		hot: devMode,
		// Открыть страницу после запуска
		open: true,
		// Какие файлы отслеживать на изменение
		watchFiles: [ "**/*.html" ]
	},
	// Карта исходников (source map)
	devtool: devMode ? 'source-map': false,
	// Разрешения модулей
	resolve: {
		// Массив расширений файлов, которые необязательно указывать при импорте
		extensions: [".js", ".json", ".png"],
		// Алиасы
		alias: {
			"@": './src',
			"@models": './src/models',
		}
	},
	optimization: {
		// splitChunks: {
		// 	chunks: 'all'
		// }
		minimizer: [
			new CSSMinimizerWebpackPlugin(),
			new TerserWebpackPlugin(),
		]
	},
	// Настройки модулей
	module: {
		// Правила
		rules: [
			// Правила обработки CSS
			{
				test: /\.css$/,
				use: [
					devMode ? "style-loader" : MiniCSSExtractPlugin.loader,
					"css-loader",
				],
			},
			// Правила обработки SASS
			{
				test: /\.(sass|scss)$/,
				use: [
					devMode ? "style-loader" : MiniCSSExtractPlugin.loader,
					"css-loader",
					"sass-loader",
				],
			},
			// Правила обработки изображений
			{
				test: /\.(png|jpeg|svg|jpg|webp|avif|ico)$/,
				type: "asset/resource",
			},
			// Правила обработки JavaScript
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: ['@babel/preset-env']
						}
					}
				]
			}
		],
	},
	// Плагины
	plugins: [
		// Если это продакшн, будет генерироваться отдельный файл со стилями, иначе стили будут вставляться в тег style с помощью js
		...(devMode ? [] : [new MiniCSSExtractPlugin( { filename: "[name].[contenthash].css" } )]),
		// Для каждого найденного в исходниках html-файла, будет создана копия с автоматически добавленными скриптами и стилями в папке с обработанными файлами.
		...htmlFiles.map(fileName => {
			return new HTMLWebpackPlugin({
				// Имя файла
				filename: fileName,
				// Шаблон файла (html-файл в папке src)
				template: `./${fileName}`,
				// Нужно ли минимизировать файл
				minify: false,
			})
		}),
		// Копирование файлов
		new CopyWebpackPlugin({
			patterns: [
				{
					// От куда
					from: path.resolve(__dirname, 'src/favicon.ico'),
					// Куда нужно скопировать
					to: path.resolve(__dirname, 'dist'),
				}
			]
		}),
	],
}
