import React from 'react';
import { Image } from 'react-native';

export default class ImageWrapper extends React.Component {
  render() {
    const wrappedProps = {
      fadeDuration: 0, // android has non-zero default
      ...this.props,
    };
    return (
      <Image {...wrappedProps} />
    );
  }
}
