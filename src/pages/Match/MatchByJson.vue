<template>
    <div class="Page_Match">        
        <MatchByJson />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MatchByJson from "../../components/Match/MatchByJson.vue";

@Component({
    components: {
        MatchByJson
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
