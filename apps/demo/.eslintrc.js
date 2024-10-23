const { getESLintConfig } = require('@iceworks/spec');

module.exports = getESLintConfig('react-ts', {
  extends: ['taro/react', 'plugin:react/jsx-runtime', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  globals: {
    Taro: 'readonly',
    BUILD_TIME: 'readonly',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    '@iceworks/best-practices/recommend-functional-component': 'off',
    'no-return-assign': 'warn',
    'no-nested-ternary': 'warn',
    'no-case-declarations': 'warn',
    'no-fallthrough': 'warn',
    'import/no-commonjs': 'warn',
    'react/no-unescaped-entities': 'warn',
  },
  parser: '@typescript-eslint/parser',
});
