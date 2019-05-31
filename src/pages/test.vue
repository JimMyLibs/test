<template>
    <div class="pages_test">
        <h1>{{ pageName }}</h1>
    </div>
</template>

<script>
export default {
    name: 'pages_test',
    data () {
        return {
            pageName: 'pages_test'
        }
    },
    mounted () {
        this.$post('/test',{
            mock:{
                name:'cname'
            }
        })
    },
    methods:{
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pages_test{
    color: #212121;
}
</style>
