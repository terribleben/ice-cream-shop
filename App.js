import React from 'react';
import {
  View,
} from 'react-native';

import { AppLoading } from 'expo';
import cacheAssetsAsync from './assets/cacheAssetsAsync';
import { Provider } from 'react-redux';
import MainScreen from './screens/MainScreen';
import Store from './redux/Store';

export default class App extends React.Component {
  state = {
    isLoaded: false,
  };
  
  componentWillMount() {
    this._loadAssetsAsync();
  }

  _loadAssetsAsync = async () => {
    try {
    await cacheAssetsAsync({
      images: [
        require('./assets/customer.png'),
        require('./assets/foreground.png'),
        require('./assets/moreground.png'),
      ],
    });
    } catch (e) {
      console.log('error loading assets:', e.message);
    } finally {
      this.setState({ isLoaded: true });
    }
  }
  
  render() {
    if (!this.state.isLoaded) {
      return (<AppLoading />);
    }
    return (
      <Provider store={Store}>
        <MainScreen />
      </Provider>
    );
  }
}
