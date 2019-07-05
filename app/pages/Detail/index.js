import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json

class DetailsScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details Screen</Text>
            </View>
        );
    }
}
export default DetailsScreen