/**
 * @format
 */

import {AppRegistry} from 'react-native';
import AppNavigator from './app/router'
import {name as appName} from './app.json';
import './app/utils'

AppRegistry.registerComponent(appName, () => AppNavigator);
