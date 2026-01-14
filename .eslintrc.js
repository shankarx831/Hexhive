module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true, // For process.env
        jest: true, // For test/expect
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: [
        'react',
    ],
    rules: {
        'react/react-in-jsx-scope': 'off', // Not needed in React 17+
        'react/prop-types': 'off', // Skip prop types for this project
        'no-unused-vars': 'warn',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
