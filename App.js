import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import ActionMenu from './components/ActionMenu';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ActionMenu style={styles.actionMenu} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionMenu: {
    position: 'absolute',
    left: 12,
    top: 12,
    width: 180,
    height: Dimensions.get('window').height - 24,
  },
});
