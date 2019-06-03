module.exports = {
    root: true,
    env: {// 环境定义了预定义的全局变量。更多在官网查看
        node: true
    },
    extends: [
        'plugin:vue/essential',
        'eslint:recommended'
    ],
    rules: {
        // "off" 或 0 - 关闭规则
        // "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出),
        // "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',// 禁用 console
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',// 禁用 debugger
        "no-unused-vars": 0,// 禁止出现未使用过的变量
        "linebreak-style": 0,// 强制使用一致的换行风格
    },
    parserOptions: {// JavaScript 语言选项
        parser: 'babel-eslint'
    }
}
