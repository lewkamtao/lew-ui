module.exports = {
  extends: [
    'stylelint-config-recess-order',
  ],

  overrides: [
    {
      files: ['**/*.scss'],
      rules: {
        'property-no-unknown': null,
      },
    },
  ],

  ignoreFiles: [
    'node_modules/**/*.css',
    'dist/**/*.css',
    'public/**/*.css',
    'lib/styles/*.scss',
  ],
}
