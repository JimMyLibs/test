import React from 'react';
import { StyleSheet, View, Text, Button, SectionList } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json

import MatchItem from '../MatchItem'

class MatchList extends React.PureComponent {

    state = {
        selected: (new Map())
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
        width: '100%',
    },
    page_date: {
        fontWeight: "bold",
        fontSize: 16,
        padding: 5,
        backgroundColor: '#fff',
        borderBottomColor: '#888',
        borderBottomWidth: 1,
    }
});

export default MatchList