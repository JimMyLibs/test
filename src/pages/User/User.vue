<template>
    <div class="Page_User">        
        <User_test />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import User_test from "../../components/User/Test.vue";

@Component({
    components: {
        User_test
    }
})
export default class Page_User extends Vue {
    pageName: string = "Page_User";
}
</script>

<style lang='scss'>
.Page_User {
    height: 100%;
}
</style>
