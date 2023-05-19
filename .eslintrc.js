module.exports = {
    root: true,
    env: {
        browser: true, // browser global variables
        es2021: true, // adds all ECMAScript 2021 globals and automatically sets the ecmaVersion parser option to 12.
    },
    parserOptions: {
        ecmaVersion: 12,
        parser: '@typescript-eslint/parser',
    },
    parser: 'vue-eslint-parser', // ++
    extends: [
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
        'airbnb-base',
        'plugin:prettier/recommended',
    ],
    plugins: ['@typescript-eslint'],
    rules: {
        'no-plusplus': 0,
        'import/no-unresolved': 0,
        'import/extensions': 0,
        'import/prefer-default-export': 0,
        'no-unused-vars': 0,
        'no-restricted-syntax': 0,
        'no-continue': 0,
        '@typescript-eslint/no-empty-function': 0,
        'import/no-extraneous-dependencies': 0,
        'no-param-reassign': 0,
    },
};
