<template>
    <div class="pages_loading">
        <div class="spinner"></div>
    </div>
</template>

<script>
export default {
    name: "pages_loading",
    data() {
        return {
            pageName: "pages_loading"
        };
    },
    mounted() {},
    methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.pages_loading {
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
