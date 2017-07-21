import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
} from 'react-native';

export default class Scenery extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {this._renderCustomers()}
        <Image
          source={require('../assets/foreground.png')}
          style={styles.foregroundImage} />
      </View>
    );
  }

  _renderCustomers = () => {
    const customerX = [0, 150, 300, 450, 600];
    return (
      <View>
        {customerX.map(x => {
          return this._renderCustomer(x, x);
        })}
      </View>
    );
  }

  _renderCustomer = (id, x) => {
    return (
      <Image
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  foregroundImage: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 512,
    height: 128,
    resizeMode: 'contain',
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
