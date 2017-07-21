import React from 'react';
import {
  View,
} from 'react-native';

import { Provider } from 'react-redux';
import MainScreen from './screens/MainScreen';
import Store from './redux/Store';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
        <MainScreen />
      </Provider>
    );
  }
}
