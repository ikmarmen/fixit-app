import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity  } from 'react-native';
import {Item, Icon, Input, Label } from 'native-base';

@observer
export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logoImage}
          source={require('../../../img/noymed-logo.png')}
        />


        <View style={styles.inputContainer}>
          <Item  style={StyleSheet.flatten(styles.input)} floatingLabel>
            <Label style={StyleSheet.flatten(styles.inputLabel)}>Email</Label>
            <Icon name='person' style={{color:'white'}}/>
            <Input onChangeText={(text) => this.store.setProp(text, 'email')}  style={StyleSheet.flatten(styles.inputText)}/>
          </Item>
          
        </View>


        <TouchableOpacity  activeOpacity={0.5} onPress={this.onLogin} >
            <View style={styles.btnContainer}>
              <Text style={styles.btnText}>RESET PASSWORD</Text>
            </View>
          </TouchableOpacity >
        

     

        <View  style={styles.bottomText} >
          <Text style={styles.linkText}>New to FIX IT?</Text>
          <TouchableOpacity   activeOpacity={0.5} onPress={this.onSignUp} >
            <View>
              <Text style={styles.linkTextRight}>SIGN UP</Text>
            </View>
          </TouchableOpacity >
        </View>
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
  input: {
    height: 50, 
    marginBottom: 10,
    marginTop: 70,
  }, 
  inputLabel: {
    color: 'white', 
    fontSize: 12,
  },
  inputText: {
    color: 'white', 
    fontSize: 14,
  },
  logoImage: {
    width: 60,
    height: 30,
    marginTop: 100,
  },
  linkText: {
    color: '#ffffff',
    opacity: .5,
    marginTop: 10,
    marginBottom: 50,
  },
  inputContainer: {
    width: 270,
    height: 140,
    marginTop: 20,
  },
  btnContainer: {
    width: 270,
    height: 36,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e5e642',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 14,
    padding: 20,
    color: 'white',
    fontWeight: '800',
  },
  bottomText: {
    marginTop: 10,
    flexDirection: 'row',
    marginTop: 125,
  },
  linkTextRight: {
    color: '#ffffff',
    marginLeft: 10,
    marginBottom: 50,
    marginRight: 10,
    marginTop: 10,
  },
});