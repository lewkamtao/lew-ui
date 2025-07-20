module.exports = {
  extends: [
    'stylelint-config-rational-order',
  ],

  plugins: [
    'stylelint-order',
    'stylelint-config-rational-order/plugin',
  ],

  rules: {
    'order/properties-order': [],
    'plugin/rational-order': [true, {
      'border-in-box-model': false,
      'empty-line-between-groups': false,
    }],
  },

  ignoreFiles: [
    'node_modules/**/*.css',
    'dist/**/*.css',
    'public/**/*.css',
  ],
}
