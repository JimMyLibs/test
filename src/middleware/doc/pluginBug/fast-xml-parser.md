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
<script>
    // Jim@2019-06-28 08:44: 中英文双语，切换版本还是逃不过version类型验证
    window.onload=()=>{
        let i = 0;
        let timer = setInterval(()=>{
            i++;
            let versions_btn = document.querySelectorAll('.dropdown-toggle strong')
            let versions_ul = document.querySelectorAll('.dropdown-menu .version a')
            if(versions_btn.length&&versions_ul.length){
                versions_btn.forEach(item=>{
                    if(item.innerText=='0.0.1'){
                        item.innerText = '中文'
                    }else if(item.innerText=='0.0.2'){
                        item.innerText = 'English'
                    }
                })
                versions_ul.forEach(item=>{
                    if(item.innerText=='0.0.1'){
                        item.innerText = '中文'
                    }else if(item.innerText=='0.0.2'){
                        item.innerText = 'English'
                    }
                })
                console.log(i,versions_btn,versions_ul)
                clearInterval(timer);
            }
        },100)
    }
</script>
```
