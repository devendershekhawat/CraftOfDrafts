// eslint-disable-next-line no-undef
module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "next/core-web-vitals",
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    overrides: [
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
    ],
    rules: {
        'eol-last': ['error', 'always'],
        'semi': ['error', 'always'],
        'comma-dangle': ['error', 'always-multiline'],
        'react/react-in-jsx-scope': 0,
        'quotes': ['error', 'single'],
        'quote-props': ['error', 'consistent-as-needed'],
        'indent': ['error', 4],
        '@typescript-eslint/no-explicit-any': 0,
    },
};