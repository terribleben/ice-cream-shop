import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import Store from '../redux/Store';

export default class ActionMenu extends React.Component {
  render() {
    let { order } = this.props;
    return (
      <View style={[styles.container, this.props.style]}>
        <Text style={styles.instructions}>
          {order.customerName} would like a {order.item}
        </Text>
        <TouchableHighlight style={styles.button} onPress={this._onPressServe}>
          <Text>Serve Order</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={this._onPressPunch}>
          <Text>Punch in Face</Text>
        </TouchableHighlight>
      </View>
    );
  }

  _onPressServe = () => {
    Store.dispatch({ type: 'SERVE_ORDER', price: this.props.order.price });
  }

  _onPressPunch = () => {
    Store.dispatch({ type: 'PUNCH_IN_FACE' });
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: '#dddddd',
  },
  instructions: {
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    padding: 4,
    margin: 4,
  },
});
