<template>
    <div id="app">
        <div id="nav">
            <router-link v-for="item in routers" :key="item.name" :to="item.path">{{item.name}} | </router-link>
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
    get routers(): object[] {
        return (this as any).$router.options.routes;
    }
    mounted() {
        
    }
}
</script>


<style lang='scss'>
#nav * {
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
