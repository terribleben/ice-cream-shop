import React from 'react';
import {
  Animated,
  Easing,
  Dimensions,
  Image,
  StyleSheet,
  View,
} from 'react-native';

const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

export default class Scenery extends React.Component {
  state = {
    customerXOffset: new Animated.Value(0),
    dimensions: Dimensions.get('window'),
  };
  _customerXOffsetVal = 0;

  componentDidMount() {
    this._dimensionsListener = RCTDeviceEventEmitter.addListener('didUpdateDimensions', () => {
      this.setState({ dimensions: Dimensions.get('window') });
    });
  }

  componentWillUnmount() {
    if (this._dimensionsListener) {
      this._dimensionsListener.remove();
      this._dimensionsListener = null;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.orderNumber !== this.props.orderNumber) {
      this._animateCustomers();
    }
  }
  
  render() {
    return (
      <View style={[styles.container, { width: this.state.dimensions.width, height: this.state.dimensions.height }]}>
        {this._renderCustomers()}
        <Image
          source={require('../assets/foreground.png')}
          style={styles.foregroundImage} />
        <Image
          source={require('../assets/moreground.png')}
          style={[styles.moregroundImage, { width: this.state.dimensions.width - 480 }]} />
      </View>
    );
  }

  _animateCustomers() {
    const { CUSTOMER_SPACING } = this._getLayoutConstants();
    this._customerXOffsetVal += CUSTOMER_SPACING;
    Animated.timing(this.state.customerXOffset, {
      easing: Easing.out(Easing.exp),
      toValue: this._customerXOffsetVal,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }

  _getLayoutConstants = () => {
        const SCREEN_WIDTH = this.state.dimensions.width,
              CUSTOMER_SPACING = SCREEN_WIDTH / 6;
    return {
      SCREEN_WIDTH,
      CUSTOMER_SPACING,
    };
  }

  _renderCustomers = () => {
    const { SCREEN_WIDTH, CUSTOMER_SPACING } = this._getLayoutConstants();
    let initialCustomerX = [];
    for (let xx = -CUSTOMER_SPACING; xx < SCREEN_WIDTH; xx += CUSTOMER_SPACING) {
      initialCustomerX.push(xx);
    }
    
    return (
      <View>
        {initialCustomerX.map(x => {
          let xCompensate = x;
          while (xCompensate + this._customerXOffsetVal > SCREEN_WIDTH) {
            xCompensate -= SCREEN_WIDTH + CUSTOMER_SPACING;
          }
          return this._renderCustomer(x, Animated.add(xCompensate, this.state.customerXOffset));
        })}
      </View>
    );
  }

  _renderCustomer = (id, x) => {
    return (
      <Animated.Image
        key={id}
        source={require('../assets/customer.png')}
        style={[
          styles.customer,
          { transform: [{ translateX: x }] },
        ]} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  foregroundImage: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 480,
    height: 128,
    resizeMode: 'contain',
  },
  moregroundImage: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: 128,
    resizeMode: 'stretch',
  },
  customer: {
    position: 'absolute',
    left: 0,
    top: 200,
    width: 64,
    height: 128,
    resizeMode: 'contain',
  },
});
