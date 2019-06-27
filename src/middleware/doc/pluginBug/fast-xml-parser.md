### fast-xml-parser

> [Array(1) is translated to a Object](https://github.com/NaturalIntelligence/fast-xml-parser/issues/166)
![Array(1) is translated to a Object]
(https://camo.githubusercontent.com/652ebb4dac6b5d6cc0ed56d7fab4f67cb64269a9/68747470733a2f2f73322e617831782e636f6d2f323031392f30362f31372f5648486c51532e706e67)

```
// temporary solution
if(obj != Array){
    obj = [obj]
}
```


### 中英文双语
```
    let versions = document.querySelectorAll('.dropdown-toggle strong')
    [...versions].map(item=>{
        if(item.innerText=='0.0.1'){
            item.innerText = '中文'
        }else if(item.innerText=='0.0.2'){
            item.innerText = 'English'
        }
    })
```
