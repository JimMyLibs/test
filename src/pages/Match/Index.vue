<template>
    <div class="Page_Match">
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
    components: {
        
    }
})
export default class Page_Match extends Vue {
    pageName: string = "Page_Match";
}
</script>

<style lang='scss'>
.Page_Match {
    height: 100%;
}
</style>
