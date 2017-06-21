import { observable, computed, action, asMap, autorun } from 'mobx';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import RouterStore from '../routerStore';
import Fetch from '../../utils/fetch-json';
import qs from 'qs';

class SignupStore {
  @observable error = null;

  firstName = null;
  lastName = null;
  email = null;
  password = null;

  constructor() {
  }

  @action
  setUserName = (text)=> {
    this.email = text;
  }

    @action
  setPassword = (text) => {
    this.password = text;
  }

  @action
  login=()=> {
    if(!this.password || !this.email){
      this.error = "UserName and Password cannot be empty."
      return;
    }

    let that=this;
    let request = qs.stringify({email:that.email, password:that.password});
    Fetch('user/login', { method: 'POST', body: request })
      .then(data => {
        if (data.token) {
          that.isAuthenticated = true;
          AsyncStorage.setItem('TOKEN', data.token)
          .then(()=>{
            that.error = null;
            RouterStore.fetchUserInfo();
          })
          .catch((error)=>{
            throw error;
          });
        } else {
          that.isAuthenticated = false;
          that.error = 'Wrong Username or Password';
        }
      })
      .catch(error => {
        that.isAuthenticated = false;
        that.error = 'Server connection error';
      });
  }
}
const loginStore = new LoginStore();
export default loginStore;