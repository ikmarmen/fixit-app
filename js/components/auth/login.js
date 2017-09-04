import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity  } from 'react-native'
import { LoginStore, AuthStore } from './authStore';
import { Actions, ActionConst } from 'react-native-router-flux';

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

  onSignUp =()=>{
    Actions.signup({ type: ActionConst.PUSH });
  }

  onForgotPassword =()=>{
    Actions.forgotPassword({ type: ActionConst.PUSH });
  }

  onGoogleLogin =()=>{
    
  }

  onFacebookLogin =()=>{
    
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logoImage}
          source={require('../../../img/noymed-logo.png')}
        />
        <View style={styles.inputContainer}>
          <TextInput style={styles.textInput} onChangeText={(text) => this.store.setProp(text, 'email')}/>
          <Image
            style={styles.emailInputImage}
            source={require('../../../img/user.png')}
          />
          <TextInput style={styles.textInput} onChangeText={(text) => this.store.setProp(text, 'password')}/>
          <Image
            style={styles.passwordInputImage}
            source={require('../../../img/password.png')}
          />
        </View>
        <TouchableOpacity  activeOpacity={0.5} onPress={this.onLogin} >
            <View style={styles.btnContainer}>
              <Text style={styles.btnText}>LOG IN</Text>
            </View>
          </TouchableOpacity >
          <TouchableOpacity   activeOpacity={0.5} onPress={this.onForgotPassword} >
            <View>
              <Text style={styles.linkText}>Forgot password?</Text>
            </View>
          </TouchableOpacity >

        <View style={styles.socialLoginsContainer}>
          <TouchableOpacity   activeOpacity={0.5} onPress={this.onFacebookLogin}>
            <View style={styles.btnContainerTransparent}>
              <Image
                style={styles.btnIconFb}
                source={require('../../../img/fb.png')}
              />
              <Text style={styles.socBtnText}>Log in with Facebook</Text>
            </View>
          </TouchableOpacity >
          <TouchableOpacity activeOpacity={0.5} onPress={this.onGoogleLogin}>
            <View style={styles.btnContainerTransparent}>
              <Image
                style={styles.btnIconGoogle}
                source={require('../../../img/google.png')}
              />
              <Text style={styles.socBtnText}>Log in with Google</Text>
            </View>
          </TouchableOpacity>
        </View>

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
  emailInputImage: {
    width: 16,
    height: 19,
    marginRight: 5,
    position: 'absolute',
    top: -3,
    left: 1,
  },
  passwordInputImage: {
    width: 16,
    height: 20,
    marginRight: 5,
    position: 'absolute',
    bottom: 24,
    left: 1,
  },
  socialLoginsContainer: {
    marginBottom: 10,
    width: 270,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    height: 20,
    width: 270,
    fontSize: 10,
    color: 'white',
    paddingLeft: 22,
    borderBottomColor: 'white',
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    marginBottom: 20,
    borderWidth: 1,
  },
  logoImage: {
    width: 60,
    height: 30,
    marginTop: 120,
  },
  linkText: {
    color: '#ffffff',
    opacity: .5,
    marginTop: 10,
    marginBottom: 50,
  },
  inputContainer: {
    width: 270,
    height: 80,
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
    fontSize: 14,
    padding: 20,
    color: 'white',
    fontWeight: '800'
  },
  btnContainerTransparent: {
    width: 134,
    height: 36,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  socBtnText: {
    fontSize: 11,
    color: 'white',
  },
  bottomText: {
    marginTop: 40,
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
