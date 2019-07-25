import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json

import MatchList from '../../components/MatchList'
// import MatchList from '../../components/MatchListFlat'
import ModelMenu from '../../components/ModelMenu'

import api from '../../middleware/api'

class HomeScreen extends React.Component {

    static navigationOptions = {
        title: 'Home',
        // headerRight: (<ModelMenu/>),
        header:null,
    };
    state = {
        matchList: [],
        childLoading: 1,
    }
    matchFilter = async (pool='HAD')=>{
        // console.warn('matchFilter',pool);
        const result = await api.Matches.filter({
            pool,
            date: '',
            league: '',
        })
        const { matchList } = result.data;
        // console.warn('matchList',matchList)
        this.setState({
            matchList,
            childLoading: 0,
        })
    }
    loaddingTime() {
        const timer = setInterval(()=>{
            if(this.state.childLoading === 0){
                console.warn('清除计时器',this.state.childLoading)
                clearInterval(timer);
            }else{
                this.setState({
                    childLoading: this.state.childLoading+1
                })
            }
        },1)
    }

    componentDidMount() {
        this.loaddingTime(); 
        this.matchFilter();
    }

    goToPage = (name) => () => {
        this.props.navigation.navigate(name)
    }
    render() {
        return (
            <View style={styles.page_home}>                    
                <Button title={JSON.stringify(new Date())} onPress={ this.goToPage('Details') } /> 

                <ModelMenu setPool={this.matchFilter}/>
                <MatchList navigation={this.props.navigation} data={this.state.matchList} loading={this.state.childLoading}/>

                <Button title={JSON.stringify(new Date())} onPress={ this.goToPage('Details') } />
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