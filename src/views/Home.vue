<template>
    <div class="home">        
        <Test />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Test from "@/components/test.vue"; // @ is an alias to /src

@Component({
    components: {
        Test
    }
})
export default class Home extends Vue {}
</script>

<style lang='scss'>
.home {
    height: 100%;
}
</style>
