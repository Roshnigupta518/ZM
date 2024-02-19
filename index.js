/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
// import messaging from '@react-native-firebase/messaging';
// Register background handler
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//     console.log('Message handled in the background!', remoteMessage);
//   });
LogBox.ignoreAllLogs(true);
AppRegistry.registerComponent(appName, () => App);


