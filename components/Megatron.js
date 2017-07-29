import React from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
} from 'react-native';

const messages = [
  'BONUS TIP',
  'EXTRA LIFE',
  'LEVEL THREE',
];

// i really meant jumbotron
export default class Megatron extends React.Component {
  state = {
    transition: new Animated.Value(1),
  };

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
          outputRange: [0, -dimensions.height * 2.0],
        }),
      },
    ];
    const message = (level > 0 && level - 1 < messages.length)
          ? messages[level - 1]
          : 'GRAPE';
    return (
      <Animated.Text
        style={[
          styles.text,
          { top: dimensions.height, width: dimensions.width - 200 },
          { transform },
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
      duration: 3000,
      useNativeDrive: true,
    }).start();
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
