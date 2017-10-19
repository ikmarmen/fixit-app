import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class SliderMarker extends React.Component {
  render() {
    return (<View style={styles.container}>
      <Text style={styles.value}>{this.props.currentValue}</Text>
      <View  style={styles.marker}>
        <View  style={styles.smallMarker}></View>
      </View>
      
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    top: -4, 
    height: 48,
    width: 48,
    flexDirection: 'column',
    alignItems: 'center',
  },
  value: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  marker: {
    height: 22,
    width: 22,
    borderRadius: 12,
    backgroundColor: 'rgba(70, 198, 233, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallMarker: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#46c6e9',
  }
});