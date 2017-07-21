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
import Scenery from '../components/Scenery';
import Store from '../redux/Store';

class MainScreen extends React.Component {
  state = {
    cashForDisplay: 0,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.cash !== this.props.cash) {
      requestAnimationFrame(this._animateCash);
    }
  }
  
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
        <Scenery orderNumber={this.props.orderNumber} />
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
          Cash: ${this._formatPrice(this.state.cashForDisplay)}
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

  _formatPrice = (price) => {
    return price.toFixed(2);
  }

  _onPressRestart = () => {
    Store.dispatch({ type: 'RESTART' });
  }

  _animateCash = () => {
    if (this.props.cash === 0) {
      this.setState({ cashForDisplay: 0 });
    } else if (Math.abs(this.props.cash - this.state.cashForDisplay) < 0.1) {
      this.setState({ cashForDisplay: this.props.cash });
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
    fontSize: 16,
    color: '#ffffff',
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
});

export default connect((state) => ({
  status: state.status,
  cash: state.cash,
  orderNumber: state.orderNumber,
  order: state.order,
}))(MainScreen);
