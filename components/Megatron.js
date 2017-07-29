import React from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
} from 'react-native';

import Constants from '../util/Constants';

const messages = [
  'BONUS DOLLAR',
  'CIGARETTE BREAK',
  'EXTRA LIFE',
  'LEVEL FOUR',
  'WHISKEY SHOT',
  'DANGER ZONE',
  'RAGE STAGE',
  'BOSS MODE',
  'SECRET POWER',
  'MAKE IT RAIN',
  'GRAPE FLAVOR',
  'WHY?',
  'GO HOME',
];

// i really meant jumbotron
export default class Megatron extends React.Component {
  state = {
    transition: new Animated.Value(1),
    isLit: false,
  };

  _mounted = false;
  
  componentDidMount() {
    this._mounted = true;
    this._startFlashing();
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.level !== this.props.level) {
      this._animate();
    }
  }
  
  render() {
    const { dimensions, level } = this.props;
    const transform = [
      {
        translateY: this.state.transition.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -dimensions.height * 3.0],
        }),
      },
    ];
    const message = (level > 0 && level - 1 < messages.length)
          ? messages[level - 1]
          : 'REALLY?';
    const litColor = (this.state.isLit)
          ? { color: Constants.Colors.pink }
          : null;
    return (
      <Animated.Text
        style={[
          styles.text,
          { top: dimensions.height, width: dimensions.width - 200 },
          { transform },
          litColor,
        ]}>
        {message}
      </Animated.Text>
    );
  }

  _animate = () => {
    this.state.transition.setValue(0);
    Animated.timing(this.state.transition, {
      easing: Easing.inOut(Easing.linear),
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  }

  _startFlashing = () => {
    this._timer = setInterval(() => {
      if (this._mounted) {
        this.setState({ isLit: !this.state.isLit });
      } else {
        clearInterval(this._timer);
        this._timer = null;
      }
    }, 500);
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 128,
    fontFamily: 'Inconsolata',
    position: 'absolute',
    left: 200,
  },
});
