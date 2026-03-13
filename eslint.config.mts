// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from '@eslint/config-helpers';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import eslintPluginImport from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);
const compat = new FlatCompat({
    baseDirectory: dirName,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default defineConfig([
    {
        name: 'Prettier and Airbnb base rules for JS files',
        extends: compat.extends('airbnb-base', 'plugin:prettier/recommended'),

        languageOptions: {
            parserOptions: {
                ecmaVersion: 2022,
                sourceType: 'module',
            },
        },

        rules: {
            'prettier/prettier': [
                'error',
                {
                    semi: true,
                    trailingComma: 'es5',
                    singleQuote: true,
                    printWidth: 80,
                    tabWidth: 4,
                    useTabs: false,
                    endOfLine: 'auto',
                    bracketSpacing: true,
                    arrowParens: 'avoid',
                },
            ],
        },
    },
    {
        name: 'Rules for TypeScript files',
        files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.mjs'],

        extends: compat.extends(
            'airbnb',
            'airbnb-typescript',
            'plugin:prettier/recommended'
        ),

        plugins: {
            // '@typescript-eslint': typescriptEslint as any,
            'unused-imports': unusedImports,
            'simple-import-sort': simpleImportSort,
            import: eslintPluginImport,
            '@typescript-eslint': tseslint.plugin,
        },

        settings: {
            'import/resolver': {
                node: {
                    extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
                },
            },
        },

        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: '2022',
                sourceType: 'module',
                project: ['./tsconfig.json'],
            },
        },

        rules: {
            'prettier/prettier': [
                'error',
                {
                    singleQuote: true,
                    endOfLine: 'auto',
                },
            ],

            'import/extensions': 'off',
            'react/function-component-definition': 'off',
            'react/destructuring-assignment': 'off',
            'react/require-default-props': 'off',
            'react/jsx-props-no-spreading': 'off',
            '@typescript-eslint/comma-dangle': 'off',
            '@typescript-eslint/consistent-type-imports': 'error',
            'no-restricted-syntax': [
                'error',
                'ForInStatement',
                'LabeledStatement',
                'WithStatement',
            ],
            'import/prefer-default-export': 'off',
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
            'import/order': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            'unused-imports/no-unused-imports': 'error',
            '@typescript-eslint/lines-between-class-members': 0,
            '@typescript-eslint/no-throw-literal': 0,

            'unused-imports/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                },
            ],

            '@typescript-eslint/default-param-last': 'off',
            'no-param-reassign': 'off',
            'no-underscore-dangle': 'off',
            'no-nested-ternary': 'off',
            'import/no-unresolved': 'off',
            'import/no-extraneous-dependencies': [
                'error',
                {
                    devDependencies: true, // Allow devDependencies in files like tests, build scripts
                    optionalDependencies: false,
                    peerDependencies: false,
                    bundledDependencies: false,
                },
            ],

            'react/button-has-type': [
                'error',
                {
                    reset: true,
                },
            ],

            'no-plusplus': 'off',
            'react/react-in-jsx-scope': 'off',
            'jsx-a11y/no-noninteractive-element-interactions': 0,
            'jsx-a11y/click-events-have-key-events': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
    {
        name: 'Storybook stories rules',
        files: ['**/*.stories.*'],
        rules: {
            'import/no-extraneous-dependencies': [
                'error',
                {
                    devDependencies: true,
                },
            ],
        },
    },
]);
