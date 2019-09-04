<template>
    <div class="Page_MatchObj">        
        <MatchByObj />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MatchByObj from "../../components/Match/MatchByObj.vue";

@Component({
    components: {
        MatchByObj
    }
})
export default class Page_MatchObj extends Vue {
    pageName: string = "Page_MatchObj";
}
</script>

<style lang='scss'>
.Page_MatchObj {
    height: 100%;
}
</style>
