import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

export default class SliderMarker extends React.Component {
  render() {
    return (<View style={{flex:0, flexDirection: 'row'}}>
      <EvilIcons name='location' style={{ color: '#46c6e9', fontSize: 25, marginBottom: 15 }} />
      <Text>{this.props.currentValue}</Text>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    height: 40,
    width: 40
  }
});