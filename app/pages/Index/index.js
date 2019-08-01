import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json

import MatchList from '../../components/MatchList'
// import MatchList from '../../components/MatchListFlat'
import ModelMenu from '../../components/ModelMenu'
import Loading from '../../components/Loading'

import api from '../../middleware/api'

class HomeScreen extends React.Component {

    static navigationOptions = {
        title: 'Home',
        // headerRight: (<ModelMenu/>),
        header:null,
    };
    state = {
        matchList: [],
        loading: 1,
    }
    matchFilter = async (pool='HAD')=>{
        // console.warn('matchFilter',pool);
        api.Matches.filter({
            pool,
            date: '',
            league: '',
        }).then(res=>{
            // console.warn('请求成功一次');
            const { matchList } = res.data;
            // console.warn('matchList',matchList)
            this.setState({
                matchList,
                loading: 0,
            })
        }).catch(err=>{
            console.warn('err',err)
            this.setState({
                loading: 0,
            })
        })
    }
    loopFetch() {
        setInterval(()=>{
            this.matchFilter();
        },5000)
    }

    componentDidMount() {
        this.matchFilter();
        // this.loopFetch();
    }

    goToPage = (name) => () => {
        this.props.navigation.navigate(name)
    }
    render() {
        return (
            <View style={styles.page_home}>                    
                <Button title={JSON.stringify(new Date())}/> 

                <ModelMenu setPool={this.matchFilter}/>
                {
                    this.state.loading?
                    <Loading />:
                    <MatchList navigation={this.props.navigation} data={this.state.matchList}/>

                }
                <Button title={JSON.stringify(new Date())}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page_home: {
        flex: 1,
    }
});

export default HomeScreen