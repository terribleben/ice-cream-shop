import React from 'react';
import {
  View,
} from 'react-native';

import { connect } from 'react-redux';
import MainScreen from './screens/MainScreen';
import MenuScreen from './screens/MenuScreen';

class GameController extends React.Component {
  render() {
    let content;
    switch (this.props.status) {
    case 'intro':
      return (<MenuScreen />);
    case 'started': default:
      return (<MainScreen />);
    }
  }
}

export default connect((state) => ({
  status: state.status,
}))(GameController);
