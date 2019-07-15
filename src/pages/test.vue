<template>
    <div class="pages_test">
        <div class="preCode flex" v-if='show.all || 1'>
            <div class="preBox" v-if="show.listFilter">
                <select class="changeMatche" @change="changeMatche" v-model="selected.pool">
                    <option v-for="(item,index) in poolList" :key="item" :value="index">{{index}}={{item}}</option>
                    <option value="">全部</option>
                </select>
                <select class="changeMatche" @change="changeMatche" v-model="selected.league">
                    <option v-for="(item,index) in leagueList" :key="index" :value="item">{{item}}</option>
                    <option value="">全部</option>
                </select>
                <select class="changeMatche" @change="changeMatche" v-model="selected.date">
                    <option v-for="(item,index) in dateList" :key="index" :value="item">{{item}}</option>
                    <option value="">全部</option>
                </select>
                <pre contenteditable="true" v-html="listFilter"></pre>
            </div>
            <div class="preBox">
                <div class="preTitle" @click="show.datePools=!show.datePools">日期-玩法:{{show.datePools?'开':'关'}}</div>
                <pre contenteditable="true" v-if="show.datePools" v-html="datePools"></pre>
                <!-- <loading /> -->
            </div>
            <div class="preBox">
                <div class="preTitle" @click="show.FB_GetInfo_chi=!show.FB_GetInfo_chi">过滤字段:{{show.FB_GetInfo_chi?'开':'关'}}</div>
                <pre contenteditable="true" v-if="show.FB_GetInfo_chi" v-html="FB_GetInfo_chi"></pre>
                <!-- <loading /> -->
            </div>
            <div class="preBox">
                <div class="preTitle" @click="show.CouponInfo=!show.CouponInfo">原始数据CouponInfo:{{show.CouponInfo?'开':'关'}}</div>
                <pre contenteditable="true" v-if="show.CouponInfo" v-html="CouponInfo"></pre>
                <!-- <loading /> -->
            </div>
            <div class="preBox">
                <div class="preTitle" @click="show.TournamentPoolInfo=!show.TournamentPoolInfo">原始数据TournamentPoolInfo:{{show.TournamentPoolInfo?'开':'关'}}</div>
                <pre contenteditable="true" v-if="show.TournamentPoolInfo" v-html="TournamentPoolInfo"></pre>
                <!-- <loading /> -->
            </div>
        </div>        
    </div>
</template>

<script>
import loading from './loading'
import api from "../middleware/api";
import { FB_GetInfo_chi } from '../middleware/api/Matches/FB_GetInfo_chi'
export default {
    name: "pages_test",
    data() {
        return {
            pageName: "pages_test",
            FB_GetInfo_data: {
                CouponInfo:{},
                TournamentPoolInfo:{},
                FB_GetInfo_chi:{},
                datePools:{},
                listFilter:{},
            },
            selected:{
                pool:'HAD',
                date: '',
                league: '',
            },
            show:{
                all: location.hostname === '169.254.222.170',
                listFilter: 1,
                datePools: 1,
                FB_GetInfo_chi: 0,
                CouponInfo: 0,
                TournamentPoolInfo: 0,
            },
            createTime: 0,
            poolList: [],
            leagueList: [],
            dateList: [],
        };
    },
    computed:{
        CouponInfo() {
            return this.syntaxHighlight(this.FB_GetInfo_data.CouponInfo)
        },
        TournamentPoolInfo() {
            return this.syntaxHighlight(this.FB_GetInfo_data.TournamentPoolInfo)
        },
        FB_GetInfo_chi() {
            return this.syntaxHighlight(this.FB_GetInfo_data.FB_GetInfo_chi)
        },
        datePools() {
            return this.syntaxHighlight(this.FB_GetInfo_data.datePools)
        },
        listFilter() {
            return this.syntaxHighlight(this.FB_GetInfo_data.listFilter)
        },
        menu() {
            return api.Pools.list;
        },
    },
    components:{
        // loading
    },
    beforeCreate() {
        this.createTime = new Date();
    },
    mounted() {
        this.init();
        this.changeMatche();
    },
    methods: {
        async changeMatche() {
            console.time('筛选changeMatche:');
            const filterResult = await api.Matches.filter(this.selected);
            this.FB_GetInfo_data.listFilter = filterResult;
            this.poolList = api.Matches.poolList;
            this.leagueList = api.Matches.leagueList;
            this.dateList = api.Matches.dateList;
            console.timeEnd('筛选changeMatche:');
        },
        async init() {
            console.time('初始化FB_GetInfo_chi:');
            const { data, FB_GetInfo_chi_old, CouponInfo, TournamentPoolInfo } = await api.Matches.datePools();
            this.FB_GetInfo_data.datePools = data;
            this.FB_GetInfo_data.FB_GetInfo_chi = FB_GetInfo_chi_old;
            this.FB_GetInfo_data.CouponInfo = CouponInfo;
            this.FB_GetInfo_data.TournamentPoolInfo = TournamentPoolInfo;
            console.timeEnd('初始化FB_GetInfo_chi:');
            console.log('FB_GetInfo_chi',this.FB_GetInfo_data)

            const renderTime = new Date((new Date() - this.createTime)).getMilliseconds();
            console.log('渲染时间',renderTime,'ms')
        },
        syntaxHighlight(json) {
            if (typeof json != "string") {
                json = JSON.stringify(json, undefined, 4);
            }
            json = json
                .replace(/&/g, "&")
                .replace(/</g, "<")
                .replace(/>/g, ">");
            return json.replace(
                /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
                function(match) {
                    var cls = "number";
                    if (/^"/.test(match)) {
                        if (/:$/.test(match)) {
                            cls = "key";
                        } else {
                            cls = "string";
                        }
                    } else if (/true|false/.test(match)) {
                        cls = "boolean";
                    } else if (/null/.test(match)) {
                        cls = "null";
                    }
                    return '<span class="' + cls + '">' + match + "</span>";
                }
            );
        },
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.pages_test {
    height: 100%;
    .preCode{
        height: 100%;
        .preBox{
            padding: 10px;
            max-width: 500px;
            max-height: 100%;
            overflow: auto;
            .changeMatche{
                width: 100px;
            }
            .preTitle{
                text-align: center;
            }
            &:not(:last-of-type){
                border-right: 2px solid #444;
            }
            pre{
                background: linear-gradient(90deg,rgba(0, 0, 0, 0.1) 50%,transparent 0), linear-gradient(rgba(0, 0, 0,0) 50%,transparent 0);
                background-size: 4em 4em;
            }
        }
    }
    .flex {
        display: flex;
    }
}
</style>
