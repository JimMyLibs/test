module.exports = {
    root: true,
    env: {// 环境定义了预定义的全局变量。更多在官网查看
        browser: true,//  - browser global variables.
        node: true,//  - Node.js global variables and Node.js scoping.
        commonjs: true,//  - CommonJS global variables and CommonJS scoping (use this for browser-only code that uses Browserify/WebPack).
        es6: true,//  - enable all ECMAScript 6 features except for modules (this automatically sets the ecmaVersion parser option to 6).
        worker: true,//  - web workers global variables.
        amd: true,//  - defines require() and define() as global variables as per the amd spec.
        mocha: true,//  - adds all of the Mocha testing global variables.
        jasmine: true,//  - adds all of the Jasmine testing global variables for version 1.3 and 2.0.
        jest: true,//  - Jest global variables.
        phantomjs: true,//  - PhantomJS global variables.
        protractor: true,//  - Protractor global variables.
        qunit: true,//  - QUnit global variables.
        jquery: true,//  - jQuery global variables.
        prototypejs: true,//  - Prototype.js global variables.
        shelljs: true,//  - ShellJS global variables.
        meteor: true,//  - Meteor global variables.
        mongo: true,//  - MongoDB global variables.
        applescript: true,//  - AppleScript global variables.
        nashorn: true,//  - Java 8 Nashorn global variables.
        serviceworker: true,//  - Service Worker global variables.
        atomtest: true,//  - Atom test helper globals.
        embertest: true,//  - Ember test helper globals.
        webextensions: true,//  - WebExtensions globals.
        greasemonkey: true,//  - GreaseMonkey globals.
    },
    extends: [
        'eslint:recommended'
    ],
    rules: {
        // "off" 或 0 - 关闭规则
        // "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出),
        // "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
        'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,// 禁用 console
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,// 禁用 debugger
        "no-unused-vars": 1,// 禁止出现未使用过的变量
        'no-case-declarations': 0,
        "linebreak-style": 0,// 强制使用一致的换行风格
        "quotes": [1, "single", { "allowTemplateLiterals": true }],
        // used to ts
        "import-name": 0,// the name from import must be declared
        "ban-types": 0,// 
        "no-string-literal": 0,// Forbids unnecessary string literal property access.
        "object-literal-sort-keys": 0,
        "max-classes-per-file": 0,
        "interface-over-type-literal": 0,
        "no-empty": 0,// 禁止空语句块
        "no-empty-interface": 0,//禁止空接口
    },
    parserOptions: {// JavaScript 语言选项
        ecmaVersion: 8,
        parser: 'babel-eslint',
        sourceType: 'module',
        ecmaFeatures: {
            arrowFunctions: true,
            defaultParams: true
        }
    }
}
