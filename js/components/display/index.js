import React, { Component } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';

const screen = Dimensions.get('window');
const WIDTH = screen.width;
const HEIGHT = screen.height;

export default class Display extends Component {
  constructor(props) {
    super(props);
    
    this.state = { enable: this.props.enable };
  }

  componentWillUpdate(nextProps, nextState) {
    this.setState({enable: nextProps.enable});
  }

  enableStyle() {
    if (this.state.enable)
      return {};

    return {
      position: 'absolute',
      top: HEIGHT,
      left: WIDTH,
      height: 0,
      width: 0,
    };
  }

  render() {
    return (
      <View style={[this.props.style, this.enableStyle.bind(this)()]}>
        {this.props.children}
      </View>
    );
  }
}