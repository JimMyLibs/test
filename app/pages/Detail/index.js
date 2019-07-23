import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json


class MatchDetail extends React.Component {

    render() {
        const matchItem = this.props.navigation.getParam('matchItem',{});

        return (
            <View style={styles.page}>
                <Text>{JSON.stringify(matchItem)}</Text>
                <Button title="MatchDetail" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default MatchDetail