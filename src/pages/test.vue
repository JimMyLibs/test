<template>
    <div class="pages_test">
        <div class="preCode flex">
            <pre contenteditable="true" v-html="result"></pre>
            <pre contenteditable="true" v-html="CouponInfo"></pre>
        </div>        
    </div>
</template>

<script>
import api from "../middleware/api/test1";
export default {
    name: "pages_test",
    data() {
        return {
            pageName: "pages_test",
            resData: {
                result:{},
                CouponInfo:{},
            }
        };
    },
    computed:{
        result() {
            return this.syntaxHighlight(this.resData.result)
        },
        CouponInfo() {
            return this.syntaxHighlight(this.resData.CouponInfo)
        },
    },
    mounted() {
        this.FB_GetInfo_chi();
    },
    methods: {
        async FB_GetInfo_chi() {
            console.time('FB_GetInfo_chi');
            this.resData = await api.FB_GetInfo_chi();
            console.log(110,this.resData)
            console.timeEnd('FB_GetInfo_chi');
        },
        syntaxHighlight(json) {
            if (typeof json != "string") {
                json = JSON.stringify(json, undefined, 4);
            }
            json = json
                .replace(/&/g, "&")
                .replace(/</g, "<")
                .replace(/>/g, ">");
            return json.replace(
                /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
                function(match) {
                    var cls = "number";
                    if (/^"/.test(match)) {
                        if (/:$/.test(match)) {
                            cls = "key";
                        } else {
                            cls = "string";
                        }
                    } else if (/true|false/.test(match)) {
                        cls = "boolean";
                    } else if (/null/.test(match)) {
                        cls = "null";
                    }
                    return '<span class="' + cls + '">' + match + "</span>";
                }
            );
        },
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.pages_test {
    pre{
        padding: 10px;
        &:not(:last-of-type){
            border-right: 2px solid #444;
        }
    }
    .flex {
        display: flex;
    }
}
</style>
