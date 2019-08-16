<template>
    <div class="Page_Video">        
        <Video_Barrage />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Video_Barrage from "../components/Video/Barrage.vue";

@Component({
    components: {
        Video_Barrage
    }
})
export default class Page_Video extends Vue {
    pageName: string = "Page_Video";
}
</script>

<style lang='scss'>
.Page_Video {
    height: 100%;
}
</style>
