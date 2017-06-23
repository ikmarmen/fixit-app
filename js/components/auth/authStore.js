import { observable, computed, action, asMap, autorun } from 'mobx';
import { AsyncStorage } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import Fetch from '../../utils/fetch-json';
import qs from 'qs';

class AuthenticationStore {
  @observable user = null;
  @observable error = null;

  constructor() {
    this.fetchUserInfo();
  }

  @computed
  get isAuthenticated() {
    return (this.user != null);
  }

  @computed
  get isValid() {
    return !!(this.user && this.user.password && this.user.email);
  }

  @action
  setProp = (value, name) => {
    this.user[name] = value;
  }

  @action
  fetchUserInfo() {
    Fetch('startup', { method: 'GET' })
      .then(data => {
        this.user = data.user;
      })
      .catch(error => {
        this.user = null
        AsyncStorage.removeItem('TOKEN');
      });
  }

  @action
  update = () => {
    let that = this;
    let request = qs.stringify(that.user);

    Fetch('user/save', { method: 'POST', body: request })
      .then(data => {
        that.user = data;
      })
      .catch(error => {
        that.error = error.message;
      });
  }

  @action
  logauth = () => {
    let that = this;
    AsyncStorage.getItem('TOKEN', (err, result) => {
      if (result) {
        let request = qs.stringify({ token: result });
        Fetch('user/logauth', { method: 'POST', body: request })
          .then(data => {
            this.user = null
            AsyncStorage.removeItem('TOKEN');
          })
          .catch(error => {
            that.error = error.message;
          });
      }else{
        this.user = null;
      }
    })
  }
}
export const AuthStore = new AuthenticationStore();

export class SignupStore {
  @observable error = null;
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
              AuthStore.fetchUserInfo();
              Actions.pop();
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
              AuthStore.fetchUserInfo();
              Actions.pop();
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