import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    // 允许使用 console 方法，不再限制只能使用 warn 和 error
    'no-console': 'off',

    // 允许使用 new Function() 构造函数
    'no-new-func': 'off',

    // 正则表达式相关 - 开发中常见且合理
    'regexp/no-unused-capturing-group': 'off',
    'regexp/no-dupe-disjunctions': 'off',

  },
  formatters: {
    css: true,
    html: true,
    markdown: 'prettier',
  },
  ignores: [
    '**/*.md',
  ],
})
