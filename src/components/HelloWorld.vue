<template>
    <div class="hello">{{pageName}}</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import api from "../middleware/api";

@Component
export default class HelloWorld extends Vue {
    pageName: string = "HelloWorld001";
    @Prop() private msg!: string;
    async getData() {
        const filterMenu = await api.Matches.filter({ pool: "HAD" });
        console.log("filterMenu", filterMenu);
    }
    mounted() {
        this.getData();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
