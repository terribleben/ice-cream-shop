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
    case 'started': case 'over':
      return (<MainScreen />);
    case 'intro': default:
      return (<MenuScreen />);
    }
  }
}

export default connect((state) => ({
  status: state.status,
}))(GameController);
