import React from 'react';
import { StyleSheet, View, Text, Button, ActivityIndicator } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json


class Loading extends React.Component {

    state = {
        loadingTime: 1,
        loadingSumTime: 0,
        timer: null,
    }
    loaddingTime() {
        const timer = setInterval(()=>{
            this.setState({
                loadingTime: this.state.loadingTime+1,
                loadingSumTime: this.state.loadingTime,
            })
        },1)
        this.setState({
            timer,
        })
    }
    componentDidMount() {
        this.loaddingTime();
    }
    componentWillUnmount() {
        // console.warn('首次总耗时',this.state.loadingSumTime)
        clearInterval(this.state.timer);
    }

    render() {
        return (
            <View style={styles.page}>
                <View style={styles.loadingTime}>
                    <Text>{this.state.loadingTime}</Text>
                </View>
                <ActivityIndicator style={styles.loading} size="large" color="#0000ff" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingTime:{
        position:'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
});

export default Loading