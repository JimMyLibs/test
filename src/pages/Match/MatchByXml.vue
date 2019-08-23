<template>
    <div class="Page_MatchByXml">        
        <MatchByXml />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MatchByXml from "../../components/Match/MatchByXml.vue";

@Component({
    components: {
        MatchByXml
    }
})
export default class Page_MatchByXml extends Vue {
    pageName: string = "Page_MatchByXml";
}
</script>

<style lang='scss'>
.Page_MatchByXml {
    height: 100%;
}
</style>
