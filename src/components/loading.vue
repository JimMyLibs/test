<template>
    <div class="Page_Loading">
        <div class="spinner"></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
    components: {
        
    }
})
export default class Page_Loading extends Vue {
    pageName: string = "Page_Loading";
}
</script>

<style lang='scss'>
.Page_Loading {
    .spinner {
        width: 60px;
        height: 60px;
        background-color: #67cf22;
        margin: 100px auto;
        animation: rotateplane 1.2s infinite ease-in-out;
    }
    @keyframes rotateplane {
        0% {
            transform: perspective(120px) rotateX(0deg) rotateY(0deg);
        }
        50% {
            transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
        }
        100% {
            transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
        }
    }
}
</style>