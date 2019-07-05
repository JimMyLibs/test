import { createAppContainer, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import HomeScreen from '../pages/Index'
import DetailsScreen from '../pages/Detail'

const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen,
    },
    Details: {
        screen: DetailsScreen,
    },
}, {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
        headerTintColor: '#212121',
        headerStyle: {
            backgroundColor: '#fff',
        },
		headerTitleStyle: {
		    fontWeight: 'bold',
		},
    },
});


export default createAppContainer(AppNavigator);