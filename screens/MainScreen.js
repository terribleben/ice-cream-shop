import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { connect } from 'react-redux';

import ActionMenu from '../components/ActionMenu';

class MainScreen extends React.Component {
  render() {
    return (
      <View style={[
              styles.container,
              { backgroundColor: (this.props.status === 'started') ? '#ff0000' : '#ffffff' },
            ]}>
        <ActionMenu style={styles.actionMenu} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default connect((state) => ({ status: state.status }))(MainScreen);
