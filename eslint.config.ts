import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';
import reactPlugin from 'eslint-plugin-react';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier';

export default tseslint.config(js.configs.recommended, ...tseslint.configs.recommended, globalIgnores(['dist']), {
    files: ['src/**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parser: tseslint.parser,
        parserOptions: {
            ecmaFeatures: { jsx: true },
            project: ['./tsconfig.eslint.json'],
            tsconfigRootDir: process.cwd(),
        },
        globals: {
            ...globals.browser,
            ...globals.jest,
        },
    },
    plugins: {
        react: reactPlugin,
        'react-hooks': reactHooks,
        'jsx-a11y': jsxA11y,
        prettier: prettierPlugin,
    },
    rules: {
        ...reactPlugin.configs.recommended.rules,
        ...reactHooks.configs.recommended.rules,
        ...jsxA11y.configs.recommended.rules,
        'prettier/prettier': ['warn', { endOfLine: 'auto' }],
        'react/react-in-jsx-scope': 'off',
    },
    settings: {
        react: { version: 'detect' },
    },
    extends: [reactRefresh.configs.vite],
});
