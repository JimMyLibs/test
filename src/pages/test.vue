<template>
    <div class="pages_test">
        <div class="events">
            <ul class="list">
                <li class="item" v-for="(item,index) in events" :key="index">
                    <div class="id">id:{{item.eventFeedId}};</div>
                    <div class="time">time:{{item.startTimeUtc}};</div>    
                    <div class="isInPlay">isInPlay:{{item.isInPlay}};</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import api from '../middleware/api/test'
export default {
    name: "pages_test",
    data() {
        return {
            pageName: "pages_test",
            events:{},
        };
    },
    mounted() {
        
    },
    methods: {
        async getEvents() {
            this.events = await api.getEvents();
        },
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.pages_test {
    .events{
        .list{
            .item{
                margin-bottom: 10px;
            }
        }
    }
    .flex{
        display: flex;
    }
}
</style>
