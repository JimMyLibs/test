import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json

import HeaderRight from '../../components/HeaderRight'

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home',
        headerRight: (<HeaderRight />),
    };

    goToPage = (name) => () => {
        this.props.navigation.navigate(name)
    }
    render() {
        return (
            <View style={styles.page_home}>
                <Text>Home Screen</Text>
                <Button title="Details" onPress={ this.goToPage('Details') } />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page_home: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default HomeScreen