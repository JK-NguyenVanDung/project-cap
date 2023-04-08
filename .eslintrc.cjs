module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'airbnb-typescript-prettier',
  ],
  overrides: [
    {
      files: ['src/**/*.ts'],
      parser: '@typescript-eslint/parser',
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 0,
    'prettier/prettier': 0,
    'react/jsx-no-bind': 0,
    'jsx-a11y/anchor-is-valid': 0,
    '@typescript-eslint/no-use-before-define': 0,
    'jsx-a11y/alt-text': 0,
    'react/destructuring-assignment': 0,
    'react/self-closing-comp': 0,
    '@typescript-eslint/no-empty-interface': 0,
    'react/jsx-props-no-spreading': 0,
    'react/no-array-index-key': 0,
    strict: 'error',
    'no-cond-assign': ['error', 'always'],
  },
};
