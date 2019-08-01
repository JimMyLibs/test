import React from 'react';
import { StyleSheet, View, Text, Button, FlatList } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json

import MatchItem from '../../components/MatchItemFlat'

class MatchList extends React.PureComponent {

    state = { selected: (new Map()) };

    _keyExtractor = (item, index) => index.toString();

    _onPressItem = (id) => {
        // updater functions are preferred for transactional updates
        this.setState((state) => {
            // copy the map rather than modifying state.
            const selected = new Map(state.selected);
            selected.set(id, !selected.get(id)); // toggle
            return { selected };
        });
    };

    _renderItem = ({ item, index }) => (
        <MatchItem
            id={index}
            onPressItem={this._onPressItem}
            selected={!!this.state.selected.get(item.id)}
            data={item}
        />
    );

    render() {
        return (
            <FlatList
                data={this.props.data}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
    }
});

export default MatchList