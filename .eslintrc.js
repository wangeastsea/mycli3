module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        //关闭禁止混用tab和空格
        "no-mixed-spaces-and-tabs": [0],
         // 关闭语句强制分号结尾
        "semi": [0]
        // "indent": ["error", 4]
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
