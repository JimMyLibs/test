<template>
    <div id="app">
        <div id="nav">
            <router-link v-for="item in routers" :key="item.name" :to="item.path">
                <template v-if="item.children">
                    <router-link v-for="item2 in item.children" :key="item2.name" :to="item2.path">
                        {{item2.name}} | 
                    </router-link>
                </template>
                <template v-else>{{item.name}} | </template>                
            </router-link>
            <select class='changeLanguage' @change='changeLanguage' v-model='language'>
                <option v-for='(item,index) in ["Eng","Chi"]' :key='index' :value='item'>{{item}}</option>
            </select>
        </div>
        <router-view />
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
    components: {
        
    }
})
export default class Page_app extends Vue {
    pageName: string = "Page_app";
    language: string = 'Eng';
    get routers(): object[] {
        return (this as any).$router.options.routes;
    }
    changeLanguage() {
        localStorage.setItem('language',this.language);
    }
    mounted() {
        this.language = (window as any).getLanguage();
        // console.log('routers',this.routers)
    }
}
</script>


<style lang='scss'>
#nav a {
    color: #fff;
}
/*********************** reset ***********************/
body {
    font-family: Consolas, "Courier New", monospace, "microsoft yahei",        Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #fff;
    background: #303030;
    margin: 0;
    padding: 0;
    font-size: 14px;
    line-height: 1.5;
    outline: none;
}
button,input,select,textarea,pre {
    font-family: Consolas, "Courier New", monospace, "Helvetica",        "Microsoft Yahei";
    tab-size: 4;
}
html,body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,textarea,a,p,blockquote,table,th,td,header,hgroup,nav,section,article,aside,footer,figure,figcaption,menu,button,img {
    margin: 0;
    padding: 0;
    text-decoration: none;
    box-sizing: border-box;
    list-style-type: none;
    list-style-image: none;
    resize: none;
}
html,body,#app {
    width: 100%;
    height: 100%;
    .flex {
        display: flex;
        .flex1 {
            flex: 1
        }
    }
}
/*********************** global ***********************/
pre {
    .string {
        color: #e6db74;
    }
    .number {
        color: #ae81ff;
    }
    .boolean {
        color: #ae81ff;
    }
    .null {
        color: #f92672;
    }
    .key {
        color: #a6e22e;
    }
    background: linear-gradient(
            90deg,
            rgba(0, 0, 0, 0.1) 50%,
            transparent 0
        ),
        linear-gradient(rgba(0, 0, 0, 0) 50%, transparent 0);
    background-size: 4em 4em;
}
</style>
