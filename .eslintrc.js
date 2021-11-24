module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  plugins: ['prettier', 'jsx-a11y'],
  extends: [
    'react-app',
    'react-app/jest',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jest/recommended',
    'plugin:testing-library/react',
    'plugin:prettier/recommended',
    'airbnb',
    'airbnb/hooks',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
    requireConfigFile: false,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  root: true,
  rules: {
    'no-unused-vars': 'warn',
    semi: 'off',
    'react/function-component-definition': 'off',
    'react/destructuring-assignment': [0, 'never', { ignoreClassFields: true }],
    'react/jsx-props-no-spreading': 'off',
    'arrow-body-style': 'off',
    'react/no-array-index-key': 'off',
    'object-curly-newline': 'off',
    'operator-linebreak': 'off',
    'no-promise-executor-return': 'off',
  },
}
