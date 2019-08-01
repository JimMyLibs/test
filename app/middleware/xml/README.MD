### the defect of fast-xml-parser or xml
> the keyName in the data of xml, is not allowed to has blank space after it.
1. for example
```xml
<Add Key ="EnableMobileBettingService" Value="1" >
    <Chi>http://dev-ambs.cuww.com/wcip/Mobile/xxxxx.aspx?UIC=zh-HK&amp;Channel=Mobile</Chi>
    <Eng>http://dev-ambs.cuww.com/wcip/Mobile/xxxxx.aspx?UIC=en-US&amp;Channel=Mobile</Eng>
</Add>
```
