<template>
    <div class="Page_MatchJson">        
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
export default class Page_MatchJson extends Vue {
    pageName: string = "Page_MatchJson";
}
</script>

<style lang='scss'>
.Page_MatchJson {
    height: 100%;
}
</style>
