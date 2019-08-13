<template>
    <div class="Page_Tmpt">        
        {{pageName}}
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
    components: {
        
    }
})
export default class Page_Tmpt extends Vue {
    pageName: string = "Page_Tmpt";
}
</script>

<style lang='scss'>
.Page_Tmpt {
    height: 100%;
}
</style>
