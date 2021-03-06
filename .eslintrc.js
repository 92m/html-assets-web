module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module'
  },
  globals: {
    html: true
  },
  plugins: ['html'],
  rules: {
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    'no-console': ['error', { 'allow': ['log', 'warn', 'error'] }],
    'no-unused-vars': ['error', { 'vars': 'all', 'args': 'none', 'ignoreRestSiblings': false }]
  }
}
