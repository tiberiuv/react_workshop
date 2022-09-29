const path = require('path')

const toPath = _path => path.join(process.cwd(), _path)

module.exports = {
    stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
    babel: async opts => {
        return {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        targets: {
                            node: 'current',
                        },
                    },
                ],
                ['@babel/preset-react', {runtime: 'automatic', importSource: '@emotion/react'}],
                ['@babel/typescript', {allExtensions: true, isTSX: true}],
            ],
            plugins: [
                '@emotion/babel-plugin',
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-proposal-export-default-from',
                '@babel/plugin-proposal-optional-chaining',
                '@babel/plugin-proposal-class-properties',
            ],
        }
    },
    webpackFinal: async config => {
        return {
            ...config,
            resolve: {
                ...config.resolve,
                alias: {
                    ...config.resolve.alias,
                    '@emotion/core': toPath('node_modules/@emotion/react'),
                    '@emotion/styled': toPath('node_modules/@emotion/styled'),
                    'emotion-theming': toPath('node_modules/@emotion/react'),
                },
            },
        }
    },
}
