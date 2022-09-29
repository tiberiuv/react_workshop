module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['prettier', 'babel', 'react', 'react-hooks', '@typescript-eslint'],
    extends: [
        'prettier',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:react/jsx-runtime',
    ],
    parserOptions: {
        ecmaVersion: 2020,
        ecmaFeatures: {
            jsx: true,
        },
        sourceType: 'module',
        tsconfigRootDir: __dirname,
    },
    env: {
        node: true,
        browser: true,
        amd: true,
        jest: true,
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        '@typescript-eslint/explicit-function-return-type': [
            'off',
            {
                allowExpressions: true,
                allowTypedFunctionExpressions: false,
            },
        ],
    },
    overrides: [{
        files: ['*.ts', '*.tsx'],
        extends: [
            'plugin:@typescript-eslint/eslint-recommended',
            'plugin:@typescript-eslint/recommended',
            'plugin:@typescript-eslint/recommended-requiring-type-checking',
        ],
        parserOptions: {
            project: ['./tsconfig.json'],
        }
    }]
}
