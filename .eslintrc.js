module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
    extends: [
        '@nuxtjs',
        'prettier',
        'prettier/vue',
        'plugin:prettier/recommended',
        'plugin:nuxt/recommended',
    ],
    plugins: ['prettier'],
    // add your custom rules here
    rules: {
        'vue/comment-directive': 'off',
        'no-unused-expressions': 'off',
        'vue/no-v-html': 'off',
        'vue/require-component-is': 'error',
        'no-console': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'on' : 'off',
        'no-unused-vars': process.env.NODE_ENV === 'production' ? 'on' : 'off',
    },
}
