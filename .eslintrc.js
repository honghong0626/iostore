module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'plugin:prettier/recommended'],
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  rules: {
    'no-param-reassign': 0,
    'no-plusplus': 0,
  },
};
