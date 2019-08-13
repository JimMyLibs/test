<template>
    <div class="User_test">        
        {{pageName}}
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
    async mounted() {
        const check = await api.User.check();
        console.log('check',check)
        const login = await api.User.login();
        console.log('login',login)
    }
}
</script>

<style lang='scss'>
.User_test {
    height: 100%;
}
</style>
