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
        betslip().then(res=>{
            console.log(100,res);
            return testMock();
        }).then(res=>{
            console.log(101,res)
        })
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
