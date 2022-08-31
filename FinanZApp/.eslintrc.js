module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
  },
};
