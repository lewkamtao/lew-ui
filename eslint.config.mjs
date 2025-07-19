import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    // 允许使用 console 方法，不再限制只能使用 warn 和 error
    'no-console': 'off',

    // 正则表达式相关 - 开发中常见且合理
    'regexp/no-unused-capturing-group': 'off',
    'regexp/no-dupe-disjunctions': 'off',

  },
})
