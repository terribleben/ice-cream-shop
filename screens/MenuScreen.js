import React from 'react';
import {
  Image,
  Text,
  TouchableHighlight,
  StyleSheet,
  View,
} from 'react-native';

import Store from '../redux/Store';

export default class MenuScreen extends React.Component {
  _mounted = false;
  
  componentDidMount() {
    _mounted = true;
  }

  componentWillUnmount() {
    _mounted = false;
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/menu.png')}
          style={styles.menuImage} />
        <TouchableHighlight
          style={styles.startButton}
          onPress={this._onPressStart}>
          <Text style={styles.startButtonText}>Clock In</Text>
        </TouchableHighlight>
      </View>
    );
  }

  _onPressStart = () => {
    Store.dispatch({ type: 'START' });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c2d4ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButton: {
    padding: 8,
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '700',
  },
  menuImage: {
    width: 512,
    height: 256,
    resizeMode: 'contain',
  },
});
