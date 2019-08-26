<template>
    <div class='Match_filter'>
        <!-- <div class='testFetch' @click='testFetch'>高频请求</div> -->
        <div class='preCode flex' v-if='show.all || 1'>
            <div class='preBox' v-if='show.listFilter'>
                <select class='changeMatche' @change='changeMatche' v-model='selected.pool'>
                    <option v-for='(item,index) in poolList' :key='item' :value='index'>{{index}}={{item}}</option>
                    <option value>全部</option>
                </select>
                <select class='changeMatche' @change='changeMatche' v-model='selected.league'>
                    <option v-for='(item,index) in leagueList' :key='index' :value='item'>{{item}}</option>
                    <option value>全部</option>
                </select>
                <select class='changeMatche' @change='changeMatche' v-model='selected.date'>
                    <option v-for='(item,index) in dateList' :key='index' :value='item'>{{item}}</option>
                    <option value>全部</option>
                </select>
                <select class='changeMatche' @change='changeMatche' v-model='selected.inPlay'>
                    <option v-for='(item,index) in inPlayList' :key='index' :value='item'>{{item}}</option>
                    <option value>全部</option>
                </select>
                <pre contenteditable='true' v-html='listFilter'></pre>
            </div>
            <div class='preBox'>
                <div class='preTitle' @click='show.dateLeague=!show.dateLeague'>date-league:{{show.dateLeague?'开':'关'}}</div>
                <pre contenteditable='true' v-if='show.dateLeague' v-html='dateLeague'></pre>
                <!-- <loading /> -->
            </div>
            <div class='preBox'>
                <div class='preTitle' @click='show.leagueDate=!show.leagueDate'>league-date:{{show.leagueDate?'开':'关'}}</div>
                <pre contenteditable='true' v-if='show.leagueDate' v-html='leagueDate'></pre>
                <!-- <loading /> -->
            </div>
            <div class='preBox'>
                <div class='preTitle' @click='show.CouponInfo=!show.CouponInfo'>原始数据CouponInfo:{{show.CouponInfo?'开':'关'}}</div>
                <pre contenteditable='true' v-if='show.CouponInfo' v-html='CouponInfo'></pre>
                <!-- <loading /> -->
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
// import loading from './loading'
import api from '../../middleware/api';
const Matches = api.MatchByJson;

@Component({
    components: {
        // loading
    }
})
export default class Match_filter extends Vue {
    pageName: string = 'Match_filter';
    fbGetInfoData: any = {
        listFilter: {},
        dateLeague: {},
        leagueDate: {},
        CouponInfo: {},
    };
    selected: any = {
        pool: 'HAD',
        date: '',
        league: '',
        inPlay: '',
    };
    show: any = {
        all: location.hostname === '169.254.222.170',
        listFilter: 1,
        dateLeague: 1,
        leagueDate: 1,
        CouponInfo: 1,
    };
    createTime: number = 0;
    poolList: object[] = [];
    leagueList: object[] = [];
    dateList: object[] = [];
    inPlayList: number[] = [0,1];

    @Prop() private msg!: string;
    async getData() {
        const filterMenu = await Matches.filter({ pool: 'HAD' });
        console.log('filterMenu', filterMenu);
    }
    get CouponInfo() {
        return this.syntaxHighlight(this.fbGetInfoData.CouponInfo);
    }
    get leagueDate() {
        return this.syntaxHighlight(this.fbGetInfoData.leagueDate);
    }
    get dateLeague() {
        return this.syntaxHighlight(this.fbGetInfoData.dateLeague);
    }
    get listFilter() {
        return this.syntaxHighlight(this.fbGetInfoData.listFilter);
    }
    beforeCreate() {
        this.createTime = new Date().getTime();
    }
    async mounted() {
        await this.getFilterMenu();
        await this.changeMatche();
        await this.getdateLeague();
        // await this.getdateLeague(1);
        // await this.getOriginalData();
    }
    async getFilterMenu() {
        const { data: {poolList, leagueList, dateList} } = await Matches.getFilterMenu();;
        this.poolList = poolList;
        this.leagueList = leagueList;
        this.dateList = dateList;
    }
    async changeMatche() {
        console.time('筛选changeMatche:');
        const filterResult = await Matches.filter(this.selected);
        this.fbGetInfoData.listFilter = filterResult;
        console.log('筛选changeMatche:',filterResult);
        console.timeEnd('筛选changeMatche:');
    }
    async getOriginalData() {
        console.time('原始数据getOriginalData:');
        const originData = await Matches.getOriginalData();
        this.fbGetInfoData.CouponInfo = originData;
        console.timeEnd('原始数据getOriginalData:');
    }
    async getdateLeague(reverse=0) {
        console.time('处理getdateLeague:');
        const { data } = await Matches.dateLeague(reverse);
        this.fbGetInfoData[reverse?'leagueDate':'dateLeague'] = data;
        console.timeEnd('处理getdateLeague:');

        const renderTime = new Date(
            new Date().getTime() - this.createTime
        ).getMilliseconds();
        console.log('渲染时间', renderTime, 'ms');
    }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.Match_filter {
    height: 98%;
    .preCode {
        height: 100%;
        .preBox {
            padding: 10px;
            max-width: 600px;
            max-height: 100%;
            overflow: auto;
            .changeMatche {
                width: 100px;
            }
            .preTitle {
                text-align: center;
            }
            &:not(:last-of-type) {
                border-right: 2px solid #444;
            }
        }
    }
}
</style>
