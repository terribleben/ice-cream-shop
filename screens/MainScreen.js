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
import Constants from '../util/Constants';
import Scenery from '../components/Scenery';
import Store from '../redux/Store';
const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

function getHackDimensions() {
  const dimensions = Dimensions.get('window');
  if (dimensions.width > dimensions.height) {
    return { width: dimensions.width, height: dimensions.height };
  } else {
    return { width: dimensions.height, height: dimensions.width };
  }
}

class MainScreen extends React.Component {
  state = {
    cashForDisplay: 0,
    dimensions: getHackDimensions(),
  };

  componentDidMount() {
    this._dimensionsListener = RCTDeviceEventEmitter.addListener('didUpdateDimensions', () => {
      this.setState({ dimensions: getHackDimensions() });
    });
  }

  componentWillUnmount() {
    if (this._dimensionsListener) {
      this._dimensionsListener.remove();
      this._dimensionsListener = null;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cash !== this.props.cash) {
      requestAnimationFrame(this._animateCash);
    }
  }
  
  render() {
    let content;
    switch (this.props.status) {
    case 'started': case 'serving':
      content = this.renderGameStarted();
      break;
    case 'over': default:
      content = this.renderGameOver();
      break;
    }

    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Scenery orderNumber={this.props.orderNumber} />
        {content}
      </View>
    );
  }

  renderGameStarted = () => {
    return (
      <View>
        <ActionMenu
          style={[ styles.actionMenu, { height: this.state.dimensions.height - 24 }]}
          order={this.props.order}
          status={this.props.status} />
        <Text style={styles.cash}>
          ${this._formatPrice(this.state.cashForDisplay)}
        </Text>
      </View>
    );
  }

  renderGameOver = () => {
    const winnings = (this.props.cash > 0)
          ? `\$${this._formatPrice(this.props.cash)}!`
          : 'no money';
    return (
      <View style={styles.gameOverContainer}>
        <Text style={styles.gameOverText}>
          You were arrested
        </Text>
        <Text style={styles.gameOverScore}>
          You made {winnings}
        </Text>
        <TouchableHighlight
          onPress={this._onPressRestart}
          underlayColor="#f96aeb"
          style={styles.restartButton}>
          <Text>Post Bail</Text>
        </TouchableHighlight>
      </View>
    );
  }

  _formatPrice = (price) => {
    return price.toFixed(2);
  }

  _onPressRestart = () => {
    Store.dispatch({ type: 'RESTART' });
  }

  _animateCash = () => {
    if (this.props.cash === 0) {
      this.setState({ cashForDisplay: 0 });
    } else if (Math.abs(this.props.cash - this.state.cashForDisplay) < 0.02) {
      this.setState({ cashForDisplay: this.props.cash });
      if (this.props.status === 'serving') {
        Store.dispatch({ type: 'FINISH_ORDER' });
      }
    } else {
      this.setState({
        cashForDisplay: this.state.cashForDisplay + 0.1 * (this.props.cash - this.state.cashForDisplay),
      }, () => {
        requestAnimationFrame(this._animateCash);
      });
    }
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
    fontWeight: '700',
    fontSize: 24,
    color: '#ffffff',
  },
  actionMenu: {
    position: 'absolute',
    left: 12,
    top: 12,
    width: 180,
  },
  gameOverContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameOverText: {
    fontSize: 24,
    marginBottom: 12,
    color: '#ffffff',
    fontFamily: Constants.Font,
  },
  gameOverScore: {
    fontSize: 16,
    marginBottom: 16,
    color: '#ffffff',
    fontFamily: Constants.Font,
  },
  restartButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 8,
    marginBottom: 32,
  },
});

export default connect((state) => ({
  status: state.status,
  cash: state.cash,
  orderNumber: state.orderNumber,
  order: state.order,
}))(MainScreen);
