<template>
    <div class="pages_test">
        <div class="prePage">

        </div>
        <div class="preCode">
            <pre contenteditable="true" v-html="resFormat"></pre>
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
            resData: {}
        };
    },
    computed:{
        resFormat() {
            return this.syntaxHighlight(this.resData)
        }
    },
    mounted() {
        this.FB_GetInfo_chi();
    },
    methods: {
        async FB_GetInfo_chi() {
            console.time('FB_GetInfo_chi');
            this.resData = await api.FB_GetInfo_chi();
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
    .events {
        .list {
            .item {
                margin-bottom: 10px;
            }
        }
    }
    .flex {
        display: flex;
    }
}
</style>
