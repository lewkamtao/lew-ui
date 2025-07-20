module.exports = {
  extends: [
    'stylelint-config-standard', // 标准 CSS 规则
    'stylelint-config-standard-vue/scss', // Vue 组件中的 SCSS 规则
    'stylelint-config-rational-order',
  ],

  plugins: [
    'stylelint-order',
    'stylelint-config-rational-order/plugin',
  ],

  rules: {
    'selector-class-pattern': null, // 禁用类名模式检查
    'at-rule-no-unknown': null, // 禁用未知 at-rule 检查（Vue 特有的 at-rules）
    'no-descending-specificity': null, // 禁用选择器优先级冲突检查
    'order/properties-order': [],
    'plugin/rational-order': [true, {
      'border-in-box-model': false,
      'empty-line-between-groups': false,
    }],
  },
  overrides: [
    {
      files: ['*.vue', '**/*.vue'],
      customSyntax: 'postcss-html', // 使用 postcss-html 解析 Vue 文件
    },
  ],
  ignoreFiles: [
    'node_modules/**/*.css',
    'dist/**/*.css',
    'public/**/*.css',
  ],
}
