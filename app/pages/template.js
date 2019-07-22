import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json


class Template extends React.Component {

    render() {
        return (
            <View style={styles.page}>
                <Text>Template Screen</Text>
                <Button title="Template" />
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

export default Template