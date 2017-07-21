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
    return (
      <View style={[styles.container, this.props.style]}>
        <Text style={styles.instructions}>
          Ernesto would like a chocolate eclair
        </Text>
        <TouchableHighlight style={styles.button}>
          <Text>Serve Order</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={this._onPressPunch}>
          <Text>Punch in Face</Text>
        </TouchableHighlight>
      </View>
    );
  }

  _onPressPunch = () => {
    Store.dispatch({ type: 'UPDATE_STATUS', status: 'finished' });
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
