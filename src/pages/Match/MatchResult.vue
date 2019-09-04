<template>
    <div class="Page_MatchResult">        
        <MatchResult />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MatchResult from "../../components/Match/MatchResult.vue";

@Component({
    components: {
        MatchResult
    }
})
export default class Page_MatchResult extends Vue {
    pageName: string = "Page_MatchResult";
}
</script>

<style lang='scss'>
.Page_MatchResult {
    height: 100%;
}
</style>
