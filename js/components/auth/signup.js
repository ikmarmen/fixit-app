import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity  } from 'react-native';
import FloatLabelTextInput from 'react-native-floating-label-text-input';
import { SignupStore } from './authStore';
import { Actions, ActionConst } from 'react-native-router-flux';

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
          <FloatLabelTextInput style={StyleSheet.flatten(styles.input)}
            placeholder={"Name"}
            value={this.store.name}
            onChangeTextValue={(text) => this.store.setProp(text, 'name')} />
          <FloatLabelTextInput style={StyleSheet.flatten(styles.input)}
            placeholder={"Email"}
            value={this.store.email}
            onChangeTextValue={(text) => this.store.setProp(text, 'email')} />
          <FloatLabelTextInput style={StyleSheet.flatten(styles.inputText)}
            placeholder={"Password"}
            value={this.store.email}
            secureTextEntry={true}
            onChangeTextValue={(text) => this.store.setProp(text, 'password')} />
        </View>
        <TouchableOpacity activeOpacity={0.5} onPress={this.store.signup} >
          <View style={styles.btnContainer}>
            <Text style={styles.btnText}>SIGN UP</Text>
          </View>
        </TouchableOpacity >
        <View  style={styles.bottomText} >
          <Text style={styles.linkText}>Already a member?</Text>
          <TouchableOpacity   activeOpacity={0.5} onPress={Actions.pop} >
            <View>
              <Text style={styles.linkTextRight}>LOGIN</Text>
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
  bottomText: {
    marginTop: 10,
    flexDirection: 'row',
    marginTop: '20%',
  },
  linkTextRight: {
    color: '#ffffff',
    marginLeft: 10,
    marginBottom: 50,
    marginRight: 10,
    marginTop: 10,
  },
  linkText: {
    color: '#ffffff',
    opacity: .5,
    marginTop: 10,
    marginBottom: 50,
  },
});
