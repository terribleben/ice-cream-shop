import React from 'react';
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
} from 'react-native';

export default class Star extends React.Component {
  state = {
    transition: new Animated.Value(1),
  };
  _destination = { x: 0, y: 0 };

  componentWillReceiveProps(nextProps) {
    if (nextProps.orderNumber !== this.props.orderNumber) {
      this._animate();
    }
  }
  
  render() {
    const transform = [
      {
        translateX: this.state.transition.interpolate({
          inputRange: [0, 1],
          outputRange: [0, this._destination.x],
        }),
      },
      {
        translateY: this.state.transition.interpolate({
          inputRange: [0, 1],
          outputRange: [0, this._destination.y],
        }),
      },
    ];
    const opacity = this.state.transition.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0.8, 0],
    });
    return (
      <Animated.Image
        source={require('../assets/star.png')}
        style={[
          styles.star,
          { left: this.props.origin.x, top: this.props.origin.y },
          { transform, opacity },
        ]}
        {...this.props}
        />
    );
  }

  _animate = () => {
    // reset to origin
    this.state.transition.setValue(0);
    
    // randomly set destination
    const radius = 96 + Math.random() * 64,
          angle = Math.random() * 3.14 * 2.0;
    this._destination = {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle),
    };
    
    // animate
    Animated.timing(this.state.transition, {
      easing: Easing.out(Easing.quad),
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
}

const styles = StyleSheet.create({
  star: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    position: 'absolute',
  },
});
