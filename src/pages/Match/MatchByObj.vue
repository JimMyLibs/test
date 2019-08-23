<template>
    <div class="Page_Match">        
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
export default class Page_Match extends Vue {
    pageName: string = "Page_Match";
}
</script>

<style lang='scss'>
.Page_Match {
    height: 100%;
}
</style>
