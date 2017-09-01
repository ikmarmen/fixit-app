import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity  } from 'react-native'
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { LoginStore, AuthStore } from './authStore';

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

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logoImage}
          source={{
            uri: 'http://cdn.shopify.com/s/files/1/1234/8298/t/2/assets/logo.png?6150512196315954616',
          }}
        />
        <View style={styles.inputContainer}>
          <TextInput style={styles.textInput} onChangeText={(text) => this.store.setProp(text, 'email')}/>
          <Image
            style={styles.emailInputImage}
            source={{
              uri: 'http://www.iconsdb.com/icons/preview/white/user-xxl.png',
            }}
          />
          <TextInput style={styles.textInput} onChangeText={(text) => this.store.setProp(text, 'password')}/>
          <Image
            style={styles.passwordInputImage}
            source={{
              uri: 'https://static1.squarespace.com/static/55818dfde4b04f1579628cdb/5582ff65e4b0cfb22aff8025/5583f3a9e4b09ac77310dc24/1434710954011/lock+white.png',
            }}
          />
        </View>
        <TouchableOpacity  underlayColor="#042417" activeOpacity={0.5} onPress={this.onLogin} >
            <View style={styles.btnContainer}>
              <Text style={styles.btnText}>LOG IN</Text>
            </View>
          </TouchableOpacity >
          <TouchableOpacity  underlayColor="#042417" activeOpacity={0.5} onPress={()=>{return;}} >
            <View>
              <Text style={styles.btnText}>Forgot password?</Text>
            </View>
          </TouchableOpacity >
        <View style={styles.socialLoginsContainer}>
          <TouchableOpacity  underlayColor="#042417" activeOpacity={0.5}>
            <View style={styles.btnContainer}>
              <Image
                style={styles.btnIcon}
                source={{
                  uri: 'https://www.users.miamioh.edu/trowbrlc/IMS222/HireMe/img/Facebook.png',
                }}
              />
              <Text style={styles.btnText}>Log in with Facebook</Text>
            </View>
          </TouchableOpacity >
          <TouchableOpacity underlayColor="#042417" activeOpacity={0.5}>
            <View style={styles.btnContainer}>
              <Image
                style={styles.btnIcon}
                source={{
                  uri: 'http://2.bp.blogspot.com/-k4UX8rSagsM/UcGd3sGQSbI/AAAAAAAAAa0/kDbogGEMc0U/s1600/google-plus.png',
                }}
              />
              <Text style={styles.btnText}>Log in with Google</Text>
            </View>
          </TouchableOpacity>
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
    backgroundColor: '#f25d59',
  },
  emailInputImage: {
    width: 15,
    height: 20,
    marginRight: 5,
    position: 'absolute',
    top: -1,
    left: 1,
  },
  passwordInputImage: {
    width: 15,
    height: 20,
    marginRight: 5,
    position: 'absolute',
    bottom: 22,
    left: 1,
  },
  socialLoginsContainer: {
    marginBottom: 10,
    width: 165,
  },
  loginButton: {
    margin: 3,
    borderRadius: 20,
    padding: 4
  },
  forgotPasswordButton: {
    color: 'white',
    opacity: 0.6,
    fontSize: 12,
    marginBottom: 50,
    marginTop: 5,
  },
  textInput: {
    height: 20,
    width: 150,
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
    marginTop: 50,
  },
  inputContainer: {
    width: 150,
    height: 80,
    marginTop: 20,
  },
  btnContainer: {
    flexDirection: 'row',
    marginBottom: 1,
    alignItems: 'center',
    backgroundColor: '#2196F3',
  },
  btnIcon: {
    height: 25,
    width: 25,
  },
  btnText: {
    fontSize: 12,
    padding: 20,
    color: 'white',
  },
});
