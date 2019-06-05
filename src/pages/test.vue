<template>
    <div class="pages_test">
        <h1>{{ pageName }}</h1>
    </div>
</template>

<script>
import api from '../middleware/api/test'
export default {
    name: "pages_test",
    data() {
        return {
            pageName: "pages_test"
        };
    },
    mounted() {
        Promise.resolve(1).then(res=>{
            console.log(100,res);
            return api.betslip();
        }).then(res=>{
            console.log(101,res)
            return api.currentUser();
        }).then(res=>{
            console.log(102,res)
            return api.sportsbook();
        }).then(res=>{
            console.log(103,res)
            return api.versions();
        }).then(res=>{
            console.log(104,res)
            return '完成';
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
