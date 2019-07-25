import React from 'react';
import { StyleSheet, View, Text, Button, SectionList, ActivityIndicator } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json

import MatchItem from '../MatchItem'

class MatchList extends React.PureComponent {
    state = {

    };

    _keyExtractor = (item, index) => index.toString();

    _renderItem = ({ item, index }) => {
        return (
            <MatchItem id={index} data={item} navigation={this.props.navigation} />
        )
    }
    _renderSectionHeader = ({ section: { date } }) => (
        <Text style={styles.page_date}>{date}</Text>
    )
    render() {
        const data = this.props.data.map((item, index) => {
            return {
                date: item.date,
                data: item.coupons,
            }
        })
        return (
            this.props.loading ?
                <View style={styles.page}>
                    <View style={styles.loadingTime}>
                        <Text>{this.props.loading}</Text>
                    </View>
                    <ActivityIndicator style={styles.loading} size="large" color="#0000ff" />
                </View> :
                <SectionList
                    style={styles.page}
                    stickySectionHeadersEnabled
                    renderItem={this._renderItem}
                    renderSectionHeader={this._renderSectionHeader}
                    sections={data}
                    keyExtractor={this._keyExtractor}
                />
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    page_date: {
        fontWeight: "bold",
        fontSize: 16,
        padding: 5,
        backgroundColor: '#fff',
        borderBottomColor: '#888',
        borderBottomWidth: 1,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    loadingTime:{
        position:'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default MatchList