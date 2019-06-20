<template>
    <div class="pages_test">
        <select @change="changeMatche" v-model="Matche.selected">
            <option v-for="(item,index) in menu" :key="item" :value="index">{{index}}={{item}}</option>
        </select>
        <div class="preCode flex">
            <pre contenteditable="true" v-html="listFilter"></pre>
            <pre contenteditable="true" v-html="listAll"></pre>
            <pre contenteditable="true" v-html="CouponInfo"></pre>
        </div>        
    </div>
</template>

<script>
import api from "../middleware/api/index";
export default {
    name: "pages_test",
    data() {
        return {
            pageName: "pages_test",
            FB_GetInfo_data: {
                listFilter:{},
                listAll:{},
                CouponInfo:{},
            },
            Matche:{
                selected:''
            },
        };
    },
    computed:{
        listFilter() {
            return this.syntaxHighlight(this.FB_GetInfo_data.listFilter)
        },
        listAll() {
            return this.syntaxHighlight(this.FB_GetInfo_data.listAll)
        },
        CouponInfo() {
            return this.syntaxHighlight(this.FB_GetInfo_data.CouponInfo)
        },
        menu() {
            return api.menu;
        },
        menuHtml() {
            return this.syntaxHighlight(api.menu);
        },
    },
    mounted() {
        this.FB_GetInfo_chi();
    },
    methods: {
        async changeMatche() {
            console.time('changeMatche');
            const result = await api.getMatches(this.Matche.selected);
            this.FB_GetInfo_data.listFilter = result;
            console.timeEnd('changeMatche');
        },
        async FB_GetInfo_chi() {
            console.time('FB_GetInfo_chi');
            this.FB_GetInfo_data.listAll = await api.FB_GetInfo_chi();
            this.FB_GetInfo_data.CouponInfo = api.tmp.CouponInfo;
            // console.log(110,this.FB_GetInfo_data)
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
