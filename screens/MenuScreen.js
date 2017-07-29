import React from 'react';
import {
  Image,
  Text,
  TouchableHighlight,
  StyleSheet,
  View,
} from 'react-native';

import Store from '../redux/Store';
import Constants from '../util/Constants';
import SoundManager from '../assets/SoundManager';

export default class MenuScreen extends React.Component {
  state = {
    isButtonLit: false,
  };
  
  _mounted = false;
  
  componentDidMount() {
    this._mounted = true;
    this._startAnimating();
    this._resetMusicAsync();
  }

  componentWillUnmount() {
    this._mounted = false;
  }
  
  render() {
    let buttonStyle;
    if (this.state.isButtonLit) {
      buttonStyle = [styles.startButtonText, { color: '#fee1fb' }];
    } else {
      buttonStyle = styles.startButtonText;
    }
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/menu.png')}
          style={styles.menuImage} />
        <TouchableHighlight
          style={styles.startButton}
          underlayColor="#f96aeb"
          onPress={this._onPressStart}>
          <Text style={buttonStyle}>clock in</Text>
        </TouchableHighlight>
      </View>
    );
  }

  _onPressStart = () => {
    Store.dispatch({ type: 'START' });
  }

  _startAnimating = () => {
    this._timer = setInterval(() => {
      if (this._mounted) {
        this.setState({ isButtonLit: !this.state.isButtonLit });
      } else {
        clearInterval(this._timer);
        this._timer = null;
      }
    }, 500);
  }

  _resetMusicAsync = async () => {
    const music = SoundManager.getSound('music');
    if (music) {
      await music.setRateAsync(1.0, false);
      SoundManager.loopSoundAsync('music', {
        volume: 0.8,
        restart: true,
      });
    }
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
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 48,
    fontWeight: '700',
    fontFamily: Constants.Font,
  },
  menuImage: {
    width: 512,
    height: 256,
    resizeMode: 'contain',
    marginBottom: -36,
  },
});
