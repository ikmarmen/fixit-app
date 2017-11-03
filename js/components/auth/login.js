import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { LoginStore, AuthStore } from './authStore';
import { Actions, ActionConst } from 'react-native-router-flux';
import FloatingLabelInput from '../../controls/floatingLabelInput';

@observer
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.store = new LoginStore();
  }

  onLogin = () => {
    let request = { email: this.store.email, password: this.store.password }
    AuthStore.login(request)
  }

  onSignUp = () => {
    Actions.signup({ type: ActionConst.PUSH });
  }

  onForgotPassword = () => {
    Actions.forgotPassword({ type: ActionConst.PUSH });
  }

  onGoogleLogin = () => {
  }

  onFacebookLogin = () => {
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logoImage}
          source={require('../../../img/logo.png')}
        />
        <KeyboardAvoidingView style={styles.inputContainer} behavior={'position'} keyboardVerticalOffset={5}>
          <FloatingLabelInput
            inputStyle={StyleSheet.flatten(styles.input)}
            label={"Email"}
            value={this.store.email}
            onChangeText={(text) => this.store.setProp(text, 'email')} />
          <FloatingLabelInput
            inputStyle={StyleSheet.flatten(styles.input)}
            label={"Password"}
            password
            value={this.store.password}
            onChangeText={(text) => this.store.setProp(text, 'password')} />
        </KeyboardAvoidingView>


        <TouchableOpacity style={styles.LoginButtoncContainer} activeOpacity={0.5} onPress={this.onLogin} >
          <View style={styles.btnContainer}>
            <Text style={styles.btnText}>LOG IN</Text>
          </View>
        </TouchableOpacity >
        <TouchableOpacity activeOpacity={0.5} onPress={this.onForgotPassword} >
          <View>
            <Text style={styles.linkText}>Forgot password?</Text>
          </View>
        </TouchableOpacity >

        <View style={styles.socialLoginsContainer}>
          <TouchableOpacity style={styles.btnSocContainer} activeOpacity={0.5} onPress={this.onFacebookLogin}>
            <View style={styles.btnContainerTransparent}>
              <Image
                style={styles.btnIconFb}
                source={require('../../../img/fb.png')}
              />
              <Text style={styles.socBtnText}>Log in with Facebook</Text>
            </View>
          </TouchableOpacity >
          <TouchableOpacity style={styles.btnSocContainer} activeOpacity={0.5} onPress={this.onGoogleLogin}>
            <View style={styles.btnContainerTransparent}>
              <Image
                style={styles.btnIconGoogle}
                source={require('../../../img/google.png')}
              />
              <Text style={styles.socBtnText}>Log in with Google</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomText} >
          <Text style={styles.linkText}>New to FIX IT?</Text>
          <TouchableOpacity activeOpacity={0.5} onPress={this.onSignUp} >
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
    marginTop: '14%',
  },
  LoginButtoncContainer: {
    width: '75%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: '#e5e642',
    justifyContent: 'center',
  },
  btnIconFb: {
    height: 12,
    width: 8,
    marginRight: 2,
  },
  btnIconGoogle: {
    height: 12,
    width: 11,
    marginRight: 3,
  },
  btnText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '800',
    backgroundColor: 'transparent',
  },
  socialLoginsContainer: {
    width: '75%',
    flexDirection: 'row',
    marginTop: '3%',
    justifyContent: 'space-between',
  },
  btnSocContainer: {
    width: '50%',
  },
  btnContainerTransparent: {
    width: '95%',
    height: 40,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  socBtnText: {
    fontSize: 12,
    color: 'white',
  },
  bottomText: {
    marginTop: '2%',
    flexDirection: 'row',
  },
  linkTextRight: {
    color: '#ffffff',
    marginLeft: 10,
    marginBottom: 50,
    marginRight: 10,
    marginTop: 10,
  },
});
