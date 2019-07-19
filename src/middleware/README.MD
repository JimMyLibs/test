


### [文件下载](http://169.254.222.170)


### 接口地址
```
'http://json.jc.com:8081/',
'http://169.254.222.170:8081/',

```

### 待办
1. - [x] - rewrite the interface document to English-Chinese bilingual

2. - [x] - sort out the oddsNames of each item of the matchList

3. - [x] - 字段类型严格化，以便面向前后双端
	1. 服务端因上游数据字段的不确定性和安全性，建议都用字符串类型，并且XML只支持字符串
	2. 中间层每个字段挨个询问数据类型，性价比太差
	3. 结果：只能前段通过业务场景，自行转换

4. - [x] - 请求中英文数据
	1. 服务端给配置文件(中英文接口地址)，放置客户端。
	2. 前段提供获取语言的方法给BBF。
    3. 响应数据格式化
    ```javascript
        {
            ErrCode: 0,
            ErrMsg: '',
            data : {
                key : 'value'
            }
        }
    ```

5. - [ ] - 测试请求真实数据的耗时及性能
	1. 找vieli催服务端搭建。
    2. 或搭建本地临时服务

6. - [ ] - 多级多段缓存机制
	1. fetch层缓存+业务端缓存

7. - [ ] - test case



---

### unfinished function
fetch abort:  fetch/FetchBase.js > coverFetch()