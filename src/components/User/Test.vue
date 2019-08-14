<template>
    <div class="User_test">   
        <div class="preCode flex">
            <div class="preBox">
                <div class="preTitle">login</div>
                <pre contenteditable="true" v-html="json2html()"></pre>
                <!-- <loading /> -->
            </div>
            <div class="preBox">
                <div class="preTitle">check</div>
                <pre contenteditable="true" v-html="json2html('check')"></pre>
                <!-- <loading /> -->
            </div>
            <div class="preBox">
                <div class="preTitle">statement</div>
                <pre contenteditable="true" v-html="json2html('statement')"></pre>
                <!-- <loading /> -->
            </div>
            <div class="preBox">
                <div class="preTitle">sell</div>
                <pre contenteditable="true" v-html="json2html('sell')"></pre>
                <!-- <loading /> -->
            </div>
        </div>     
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import api from '../../middleware/api'

@Component({
    components: {
        
    }
})
export default class User_test extends Vue {
    pageName: string = "User_test";
    data: any = {
        login: {},
        check: {},
        statement: {},
        sell: {},
    }
    json2html(name= 'login') {
        return this.syntaxHighlight(this.data[name]);
    }
    async mounted() {
        this.data.login = await api.User.login();
        this.data.check = await api.User.check();
        this.data.statement = await api.User.statement();
        this.data.sell = await api.User.sell();
    }
}
</script>

<style lang='scss'>
.User_test {
    height: 98%;
    .preCode {
        height: 100%;
        .preBox {
            padding: 10px;
            max-width: 500px;
            max-height: 100%;
            overflow: auto;
            .preTitle {
                text-align: center;
            }
            &:not(:last-of-type) {
                border-right: 2px solid #444;
            }
        }
    }
}
</style>
