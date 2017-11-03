import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import FloatingLabelInput from '../../controls/floatingLabelInput';
import { Actions, ActionConst } from 'react-native-router-flux';

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
          source={require('../../../img/logo.png')}
        />
        <View style={styles.inputContainer}>
          <FloatingLabelInput
            style={StyleSheet.flatten(styles.input)}
            label={"Email"}
            onChangeText={(text) => this.store.setProp(text, 'email')} />
        </View>
        <TouchableOpacity style={styles.btnContainer} activeOpacity={0.5} onPress={this.onLogin} >
          <Text style={styles.btnText}>RESET PASSWORD</Text>
        </TouchableOpacity >
        <View style={styles.bottomText} >
          <Text style={styles.linkText}>Remembered?</Text>
          <TouchableOpacity activeOpacity={0.5} onPress={Actions.pop} >
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
  input: {
    color: 'white'
  },
  inputLabel: {
    color: 'white',
    fontSize: 12,
  },
  inputText: {
    color: 'white',
    fontSize: 18,
  },
  logoImage: {
    width: 75,
    height: 75,
    marginTop: '20%',
  },
  linkText: {
    color: '#ffffff',
    opacity: .5,
    marginTop: 10,
    marginBottom: 50,
  },
  inputContainer: {
    width: '75%',
    height: 140,
  },
  btnContainer: {
    width: '75%',
    height: 50,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e5e642',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 18,
    padding: 20,
    color: 'white',
    fontWeight: '800',
  },
  bottomText: {
    marginTop: 10,
    flexDirection: 'row',
    marginTop: '40%',
  },
  linkTextRight: {
    color: '#ffffff',
    marginLeft: 10,
    marginBottom: 50,
    marginRight: 10,
    marginTop: 10,
  },
});