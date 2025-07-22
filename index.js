import 'react-native-gesture-handler'; // 🧤 MUST be first for gesture support
import 'react-native-reanimated';      // 🔥 MUST be second if using Reanimated

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
