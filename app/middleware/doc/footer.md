
---

### 目录结构 | directory structure

```javascript
middleware/					// 中间件 | Middleware
├── api/						// api
│   ├── index.js					// 入口文件 | Entry file
│   ├── Matches/					// 比赛 | game
│   │   └── index.js
│   └── pools/						// 玩法 | Play
│       ├── index.js
│       └── list.js
├── config/						// 项目配置 | Project configuration
│   ├── apiUrls.js					// api地址 | Api address
│   ├── fetchConf.js				// fetch配置 | Fetch configuration
│   └── project.js					// 项目配置 | Project configuration
├── doc/						// 接口文档 | Interface document
│   ├── apiDefine/					// 全局变量 | Global variable
│   │   ├── apiHeader.js
│   │   ├── apiParam.js
│   │   ├── apiReponse.js
│   │   └── groupName.js
│   ├── apidoc.json				// apidoc配置 | Apidoc configuration
│   ├── dataFormat/					// 数据结构 | data structure
│   │   ├── base_CN.js
│   │   └── base_EN.js
│   ├── Football/				// 足球 | football
│   │   ├── FB_GetInfo_CN.js		
│   │   ├── FB_GetInfo_EN.js
│   │   ├── poolsList_CN.js
│   │   └── poolsList_EN.js
│   ├── footer.md
│   ├── header.md
│   ├── pluginBug/				// plugin'bug
│   │   └── fast-xml-parser.md
│   └── README.MD				// 说明文件 | description file
├── fetch/						// fetch配置 | Fetch configuration
│   ├── Fetch.js
│   ├── FetchBase.js
│   └── Http.js						// 入口文件 | Entry file
├── README.MD
├── test/						// 单元测试 | unit test
│   └── index/
│       ├── filterMatches.test.js
│       └── poolsList.test.js
├── utils/						// 工具类 | Tools
│   ├── commApi.js
│   ├── promise.js
│   ├── url.js
│   └── utils.js
└── xml/						// 临时数据 | Temporary data
    └── index/
        ├── FB_GetInfo.json
        ├── FB_GetInfo.min.xml
        ├── FB_GetInfo.xml
        ├── FB_GetInfo_eng.min.xml
        ├── FB_GetInfo_eng.xml
        └── poolsList.json
```


### suggestions

| 左对齐 | 右对齐 | 居中对齐 |
| :-----| ----: | :----: |
| 单元格 | 单元格 | 单元格 |
| 单元格 | 单元格 | 单元格 |

```

```