import React from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import { connect } from 'react-redux';

import ActionMenu from '../components/ActionMenu';
import Store from '../redux/Store';

class MainScreen extends React.Component {
  render() {
    let content;
    switch (this.props.status) {
    case 'started':
      content = this.renderGameStarted();
      break;
    case 'over': default:
      content = this.renderGameOver();
      break;
    }

    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        {this._renderScenery()}
        {content}
      </View>
    );
  }

  renderGameStarted = () => {
    return (
      <View>
        <ActionMenu
          style={styles.actionMenu}
          order={this.props.order} />
        <Text style={styles.cash}>
          Cash: ${this._formatPrice(this.props.cash)}
        </Text>
      </View>
    );
  }

  renderGameOver = () => {
    return (
      <View style={styles.gameOverContainer}>
        <Text>
          You were immediately arrested for assulting a customer
        </Text>
        <TouchableHighlight onPress={this._onPressRestart} style={styles.restartButton}>
          <Text>Try Again</Text>
        </TouchableHighlight>
      </View>
    );
  }

  _renderScenery = () => {
    return (
      <Image
        source={require('../assets/foreground.png')}
        style={styles.foregroundImage} />
    );
  }

  _formatPrice = (price) => {
    return price.toFixed(2);
  }

  _onPressRestart = () => {
    Store.dispatch({ type: 'RESTART' });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7398f2',
  },
  cash: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  actionMenu: {
    position: 'absolute',
    left: 12,
    top: 12,
    width: 180,
    height: Dimensions.get('window').height - 24,
  },
  gameOverContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  restartButton: {
    borderWidth: 1,
    borderColor: '#000000',
    padding: 8,
    margin: 8,
  },
  foregroundImage: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 512,
    height: 128,
    resizeMode: 'contain',
  },
});

export default connect((state) => ({
  status: state.status,
  cash: state.cash,
  order: state.order,
}))(MainScreen);
