import React, { Component } from 'react';
import {StyleSheet, View, Image, TouchableWithoutFeedback, Text } from 'react-native';
import { observer } from 'mobx-react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

@observer
export default class FixItCard extends Component {
  constructor(props) {
    super(props);
  }

  _onClicked = () => {
  }
  render() {
    return (
        
      <TouchableWithoutFeedback onPress={this._onClicked}>
       <View style={styles.container}>

            <View style={styles.alert}>
                <View style={styles.alertIcon}>
                <MaterialCommunityIcons name='comment-processing-outline' style={styles.icon} />
                </View>
                <View  style={styles.alertText} >
                    <Text style={styles.alertTitle}>Ruth Pasek asked a question</Text>
                    <Text>Is the battery inserted properly?Is the battery inserted properly?</Text>
                </View>
            </View>

        </View>
      </TouchableWithoutFeedback>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
  },
  alert: {
    width: '95%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  alertIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e5e642',
    marginRight: 10,
    padding: 10,
  },
  alertText: {
    width: '75%',
    height: 60,
  },
  icon: {
    color: '#fff',
    fontSize: 20,
  },
  alertTitle: {
    fontSize: 20,
  },
  alertImage: {
    width: 20,
    height: 17,
  },
});
