import { observable, computed, action, asMap, autorun } from 'mobx';
import { AsyncStorage } from 'react-native';
import { Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
import RouterStore from '../routerStore';
import Fetch from '../../utils/fetch-json';
import qs from 'qs';

export class SignupStore {
  @observable error = 'ss,.ad';
  @observable email = null;
  @observable password = null;
  firstName = null;
  lastName = null;

  constructor() {
  }

  @action
  setProp = (value, name) => {
    this[name] = value;
  }

  @computed
  get isValid() {
    return !!(this.password && this.email);
  }

  @action
  signup = () => {
    let that = this;
    let request = qs.stringify({ email: that.email, password: that.password, firstName: that.firstName, lastName: that.lastName });

    Fetch('user', { method: 'POST', body: request })
      .then(data => {
        if (data.tokens && data.tokens[0]) {
          AsyncStorage.setItem('TOKEN', data.tokens[0])
            .then(() => {
              that.error = null;
              RouterStore.fetchUserInfo();
            })
            .catch((error) => {
              throw error;
            });
        }
      })
      .catch(error => {
        that.error = error.message;
      });
  }
}

export class LoginStore {
  @observable email = null;
  @observable password = null;
  @observable error = null;

  constructor() {
  }

  @action
  setProp = (value, name) => {
    this[name] = value;
  }

  @computed
  get isValid() {
    return !!(this.password && this.email);
  }

  @action
  login = () => {
    let that = this;
    let request = qs.stringify({ email: that.email, password: that.password });

    Fetch('user/login', { method: 'POST', body: request })
      .then(data => {
        if (data.token) {
          AsyncStorage.setItem('TOKEN', data.token)
            .then(() => {
              that.error = null;
              RouterStore.fetchUserInfo();
            })
            .catch((error) => {
              throw error;
            });
        } else {
          that.error = 'Wrong Username or Password';
        }
      })
      .catch(error => {
        that.error = 'Server connection error';
      });
  }
}