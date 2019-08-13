<template>
    <div class="Page_Match">        
        <Match_filter />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Match_filter from "../components/Match/filter.vue";

@Component({
    components: {
        Match_filter
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
