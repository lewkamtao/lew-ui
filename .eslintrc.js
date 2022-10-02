const { tabWidth } = require('./prettier.config');

module.exports = {
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    extends: [
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:prettier/recommended',
        'plugin:vue/base',
    ],
    rules: {
        'prettier/prettier': [
            'error',
            {
                userTabs: true,
                tabWidth: 4,
            },
        ],
    },
};
