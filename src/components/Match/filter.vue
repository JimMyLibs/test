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
                <div class='preTitle' @click='show.datePools=!show.datePools'>日期-玩法:{{show.datePools?'开':'关'}}</div>
                <pre contenteditable='true' v-if='show.datePools' v-html='datePools'></pre>
                <!-- <loading /> -->
            </div>
            <div class='preBox'>
                <div class='preTitle' @click='show.FB_GetInfo=!show.FB_GetInfo'>过滤字段:{{show.FB_GetInfo?'开':'关'}}</div>
                <pre contenteditable='true' v-if='show.FB_GetInfo' v-html='FB_GetInfo'></pre>
                <!-- <loading /> -->
            </div>
            <div class='preBox'>
                <div class='preTitle' @click='show.CouponInfo=!show.CouponInfo'>原始数据CouponInfo:{{show.CouponInfo?'开':'关'}}</div>
                <pre contenteditable='true' v-if='show.CouponInfo' v-html='CouponInfo'></pre>
                <!-- <loading /> -->
            </div>
            <div class='preBox'>
                <div class='preTitle' @click='show.TournamentPoolInfo=!show.TournamentPoolInfo'>原始数据TournamentPoolInfo:{{show.TournamentPoolInfo?'开':'关'}}</div>
                <pre contenteditable='true' v-if='show.TournamentPoolInfo' v-html='TournamentPoolInfo'></pre>
                <!-- <loading /> -->
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
// import loading from './loading'
import api from '../../middleware/api';

@Component({
    components: {
        // loading
    }
})
export default class Match_filter extends Vue {
    pageName: string = 'Match_filter';
    fbGetInfoData: any = {
        listFilter: {},
        datePools: {},
        FB_GetInfo: {},
        CouponInfo: {},
        TournamentPoolInfo: {},
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
        datePools: 1,
        FB_GetInfo: 1,
        CouponInfo: 0,
        TournamentPoolInfo: 0
    };
    createTime: number = 0;
    poolList: object[] = [];
    leagueList: object[] = [];
    dateList: object[] = [];
    inPlayList: number[] = [0,1];

    @Prop() private msg!: string;
    async getData() {
        const filterMenu = await api.Matches.filter({ pool: 'HAD' });
        console.log('filterMenu', filterMenu);
    }
    get CouponInfo() {
        return this.syntaxHighlight(this.fbGetInfoData.CouponInfo);
    }
    get TournamentPoolInfo() {
        return this.syntaxHighlight(this.fbGetInfoData.TournamentPoolInfo);
    }
    get FB_GetInfo() {
        return this.syntaxHighlight(this.fbGetInfoData.FB_GetInfo);
    }
    get datePools() {
        return this.syntaxHighlight(this.fbGetInfoData.datePools);
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
        // await this.getDatePools();
        // await this.getOriginalData();
    }
    testFetch() {
        api.Matches.datePools();
        let count = 0;
        const timer = setInterval(() => {
            count++;
            api.Matches.datePools();
            if (count > 5) {
                clearInterval(timer);
            }
        }, 100);
    }
    async getFilterMenu() {
        const { data: filterList } = await api.Matches.getFilterMenu();
        const { poolList, leagueList, dateList } = filterList;
        this.poolList = poolList;
        this.leagueList = leagueList;
        this.dateList = dateList;
    }
    async changeMatche() {
        console.time('筛选changeMatche:');
        const filterResult = await api.Matches.filter(this.selected);
        this.fbGetInfoData.listFilter = filterResult;
        console.log('筛选changeMatche:',filterResult);
        console.timeEnd('筛选changeMatche:');
    }
    async getOriginalData() {
        console.time('原始数据getOriginalData:');
        const {
            data: { FB_GetInfo_res, CouponInfo, TournamentPoolInfo }
        } = await api.Matches.getOriginalData();
        this.fbGetInfoData.FB_GetInfo = FB_GetInfo_res;
        this.fbGetInfoData.CouponInfo = CouponInfo;
        this.fbGetInfoData.TournamentPoolInfo = TournamentPoolInfo;
        console.timeEnd('原始数据getOriginalData:');
    }
    async getDatePools() {
        console.time('处理getDatePools:');
        const { data } = await api.Matches.datePools();
        this.fbGetInfoData.datePools = data;
        console.timeEnd('处理getDatePools:');

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
            max-width: 500px;
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
