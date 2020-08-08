module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'jest'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'eslint-config-prettier/@typescript-eslint'
  ],
  ignorePatterns: 'example/',
  rules: {
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-inferrable-types': 'warn',
    // Allow Prettier to throw errors via ESLint
    'prettier/prettier': 'error'
  },
  env: {
    'jest/globals': true,
    node: true
  }
}
