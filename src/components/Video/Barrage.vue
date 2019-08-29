<template>
    <div class="Video_Barrage">
        <div class="container">
            <div id="content" class="content"></div>
        </div>
        <div class="preCode flex">
            <div class="preBox">
                <div class="preTitle">barrage</div>
                <div class="btn flex">
                    <button class="get flex1" @click="brgGet">获取</button>
                    <input type="text" v-model="data.barrage.shoot" @keyup.enter="brgSet">
                    <button class="get flex1" @click="brgSet">发送</button>
                </div>
                <pre contenteditable="true" v-html="json2html()"></pre>
                <!-- <loading /> -->
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import api from "../../middleware/api";
import Barrage from "./Barrage";


@Component({
    components: {}
})
export default class Video_Barrage extends Vue {
    pageName: string = "Video_Barrage";
    barrage: any = null;
    data: any = {
        barrage: {
            shoot:'弹幕',
            data: {},
            list: []
        }
    };
    json2html(name = "barrage") {
        return this.syntaxHighlight(this.data[name]['data']);
    }
    async mounted() {
            this.brgGet();
    }
    async brgGet() {
        const result = await api.Video.barrage.get({
            videoId: 100,
            videoTime: 123456789
        });
        this.data.barrage.data = result; 
        const { data : { list } } = result;
        this.data.barrage.list = list; 
        this.play();
    }
    async brgSet() {
        await api.Video.barrage.shoot({
            videoId: 100,
            videoTime: 123456789,
            value: this.data.barrage.shoot
        });        
        this.barrage.shoot(this.data.barrage.shoot);
    }
    play() {
        this.barrage = new Barrage('content');
        function appendList(text) {
            let p = document.createElement("p");
            p.innerText = text;
        }
        this.data.barrage.list.forEach(s => {
            this.barrage.shoot(s.value);
            appendList(s.value);
        });
    }
}
</script>

<style lang='scss'>
.Video_Barrage {
    height: 98%;
    .preCode {
        min-width: 200px;
        height: 100%;
        .preBox {
            padding: 10px;
            max-width: 500px;
            max-height: 100%;
            overflow: auto;
            .preTitle {
                text-align: center;
            }
            &:not(:last-of-type) {
                border-right: 2px solid #444;
            }
        }
    }

    .container {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -1;
        margin: auto;
        .content {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
