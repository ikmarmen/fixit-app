import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity  } from 'react-native';
import {Item, Icon, Input, Label } from 'native-base';
import { SignupStore } from './authStore';

@observer
export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.store = new SignupStore();
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logoImage}
          source={require('../../../img/logo.png')}
        />


        <View style={styles.inputContainer}>
          <Item style={StyleSheet.flatten(styles.input)} floatingLabel>
            <Label style={StyleSheet.flatten(styles.inputLabel)}>Name</Label>
            <Icon name='person' style={{ color: 'white' }} />
            <Input onChangeText={(text) => this.store.setProp(text, 'email')} style={StyleSheet.flatten(styles.inputText)} />
          </Item>
          <Item style={StyleSheet.flatten(styles.input)} floatingLabel>
            <Label style={StyleSheet.flatten(styles.inputLabel)}>Email</Label>
            <Icon name='person' style={{ color: 'white' }} />
            <Input onChangeText={(text) => this.store.setProp(text, 'email')} style={StyleSheet.flatten(styles.inputText)} />
          </Item>
          <Item style={StyleSheet.flatten(styles.input)} floatingLabel>
            <Label style={StyleSheet.flatten(styles.inputLabel)}>Password</Label>
            <Icon name='lock' style={{ color: 'white' }} />
            <Input onChangeText={(text) => this.store.setProp(text, 'password')} style={StyleSheet.flatten(styles.inputText)} secureTextEntry={true}/>
          </Item>
        </View>


        <TouchableOpacity activeOpacity={0.5} onPress={this.onLogin} >
          <View style={styles.btnContainer}>
            <Text style={styles.btnText}>SIGN UP</Text>
          </View>
        </TouchableOpacity >
        

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#264559',
  },
  logoImage: {
    width: 80,
    height: 80,
    marginTop: 100,
  },
  inputContainer: {
    width: 300,
    height: 140,
    marginBottom: 20,
  },
  input: {
    height: 50,
    marginBottom: 10,
  },
  inputLabel: {
    color: 'white',
    fontSize: 12,
  },
  inputText: {
    color: 'white',
    fontSize: 18,
  }, 
  btnContainer: {
    width: 300,
    height: 50,
    borderRadius: 25,
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e5e642',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 18,
    padding: 20,
    color: 'white',
    fontWeight: '800'
  },
});
