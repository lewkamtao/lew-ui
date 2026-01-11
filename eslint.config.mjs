import antfu from '@antfu/eslint-config'
import unusedImports from 'eslint-plugin-unused-imports'

export default antfu({
  plugins: {
    'unused-imports': unusedImports,
  },
  rules: {
    // 自动删除未使用的 imports（可通过 lint:fix 自动修复）
    'unused-imports/no-unused-imports': 'error',
    // 未使用的变量检测（不自动删除，仅报错）
    'unused-imports/no-unused-vars': ['error', {
      vars: 'all',
      varsIgnorePattern: '^_',
      args: 'after-used',
      argsIgnorePattern: '^_',
    }],
    // 关闭默认的 no-unused-vars 规则，避免重复报错
    '@typescript-eslint/no-unused-vars': 'off',

    // 允许使用 console 方法，不再限制只能使用 warn 和 error
    'no-console': 'off',

    // 允许使用 new Function() 构造函数
    'no-new-func': 'off',

    // 正则表达式相关 - 开发中常见且合理
    'regexp/no-unused-capturing-group': 'off',
    'regexp/no-dupe-disjunctions': 'off',

    // 忽略 || 运算符的换行位置检查
    'vue/operator-linebreak': 'off',
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
