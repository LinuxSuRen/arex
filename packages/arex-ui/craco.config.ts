// @ts-ignore
import path from 'path'

const webpack = require('webpack');
const CracoLessPlugin = require('craco-less');
export default {
    plugins: [{
        plugin: CracoLessPlugin,
        options: {
            // less loader option
            lessLoaderOptions: {
                lessOptions: {
                    javascriptEnabled: true,
                },
            }
        }
    }],
    babel: {
        presets: ['@emotion/babel-preset-css-prop'],
    },
    devServer: {
        client: {
            overlay: false,
        },
        port: 8000,
        open: false,
    },
    typescript: {
        enableTypeChecking: true,
    },
    webpack: {
        alias: {
            '@': path.resolve(__dirname, './src/'),
            '@components': path.resolve(__dirname, './src/components'),
        },
        // 以下代码！！！  与alias或babel同级
        configure: (
            webpackConfig: {
                output: any,
                resolve:any,
                experiments:any,
                module:any,
                plugins:any
            },
            {env, paths}: any,
        ) => {
            // 修改build的生成文件名称
            paths.appBuild = 'dist'
            webpackConfig.output = {
                ...webpackConfig.output,
                path: path.resolve(__dirname, 'dist'),
                publicPath: '/',
            }

            // cra支持wasm
            const wasmExtensionRegExp = /\.wasm$/
            webpackConfig.resolve.extensions.push('.wasm')
            webpackConfig.experiments = {
                syncWebAssembly: true,
            }

            webpackConfig.module.rules.forEach((rule:any) => {
                ;(rule.oneOf || []).forEach((oneOf:any) => {
                    if (oneOf.type === 'asset/resource') {
                        oneOf.exclude.push(wasmExtensionRegExp)
                    }
                })
            })
            return webpackConfig
        },
    },
}
