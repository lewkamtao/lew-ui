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
};
