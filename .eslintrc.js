module.exports = {
    plugins: ['vue'],

    extends: [
        'airbnb-base',
        'plugin:vue/vue3-recommended',
        'prettier',
    ],
    env: {
        node: true,
        'vue/setup-compiler-macros': true,
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'import/no-unresolved': 'off',
        'comma-dangle': ['error', 'always-multiline'],
        'arrow-parens': ['error', 'as-needed'],
        'no-trailing-spaces': 'error',
        'computed-property-spacing': ['error', 'never'],
        'comma-spacing': ['error', {
            before: false,
            after: true,
        }],
        'space-in-parens': ['error', 'never'],
        'key-spacing': ['error'],
        'object-curly-spacing': ['error', 'always'],
        'no-multi-spaces': ['error'],
        'space-unary-ops': 1,
        'space-infix-ops': ['error', { int32Hint: true }],
        'arrow-spacing': 'error',
        'import/prefer-default-export': 'off',
        'class-methods-use-this': 'off',
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'import/extensions': 'off',


        'vue/component-tags-order': ['error', {
            order: ['template', 'script', 'style'],
        }],
        'vue/first-attribute-linebreak': ['error', {
            singleline: 'beside',
            multiline: 'below',
        }],
        'vue/max-attributes-per-line': ['error', {
            singleline: {
                max: 2,
            },
            multiline: {
                max: 1,
            },
        }],
        'vue/html-closing-bracket-spacing': 'error',
        'vue/multi-word-component-names': 'off',
        'vue/valid-define-props': 'error',
        'vue/valid-define-emits': 'error',
        'vue/static-class-names-order': 'error',
        'vue/space-in-parens': ['error', 'never'],
        'vue/object-curly-spacing': ['error', 'always'],
        'vue/space-infix-ops': ['error', { int32Hint: true }],
        'vue/arrow-spacing': 'error',

    },
};
