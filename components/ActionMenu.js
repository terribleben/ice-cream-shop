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
          {order.customerName} would like {order.item}
        </Text>
        <Text style={styles.price}>
          ${order.price}
        </Text>
        {this._renderButton('Serve Order', this._onPressServe)}
        {this._renderButton('Punch in Face', this._onPressPunch)}
      </View>
    );
  }

  _renderButton = (text, onPress) => {
    return (
      <TouchableHighlight
        style={styles.button}
        onPress={onPress}
        underlayColor="#f96aeb">
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableHighlight>
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
    paddingTop: 12,
    paddingHorizontal: 8,
    backgroundColor: '#dddddd',
    borderRadius: 6,
  },
  instructions: {
    fontSize: 14,
    marginBottom: 16,
  },
  price: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: '700',
  },
  button: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 12,
    margin: 4,
  },
  buttonText: {
    fontSize: 12,
  },
});
