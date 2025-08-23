module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'airbnb-typescript',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ["./tsconfig.app.json"],
    },
    plugins: [
        'react',
        '@typescript-eslint',
    ],
    settings: {
        'import/resolver': {
            'node': {
                'paths': ['src'],
                'extensions': [".js", ".jsx", ".ts", ".tsx"]
            },
        },
    },   
    rules: {
        "react/react-in-jsx-scope": "off",
        "react/require-default-props": "off",
        "import/prefer-default-export": "off",
        "no-param-reassign": "off",
    },
}; 