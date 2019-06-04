<template>
    <div class="pages_test">
        <h1>{{ pageName }}</h1>
    </div>
</template>

<script>
import { testMock, betslip } from '../middleware/api/test'
export default {
    name: "pages_test",
    data() {
        return {
            pageName: "pages_test"
        };
    },
    mounted() {
        testMock();
        betslip(1);
    },
    methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pages_test {
    color: #212121;
}
</style>
