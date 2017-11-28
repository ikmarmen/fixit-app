import { observable, computed, action, asMap, autorun, reaction } from 'mobx';
import { AsyncStorage } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import Fetch from '../../utils/fetch-json';
import qs from 'qs';
import LocationStore from '../../stores/locationStore';
import { Answers, Crashlytics } from 'react-native-fabric';

class AuthenticationStore {
  @observable user = null;
  @observable token = null;
  @observable error = null;
  @observable canStart = false;

  constructor() {
    debugger;
    reaction(() => this.error, () => this.showErrors(arguments));

    AsyncStorage.getItem('TOKEN', (err, result) => {
      if (result) {
        this.token = result;
        this.fetchUserInfo();
      } else {
        this.removeToken();
        Actions.login({ type: ActionConst.RESET });
      }
    });
  }

  showErrors() {
    if (this.error != null) {
      Crashlytics.logException(this.error);
      alert(this.error);
      this.error = null;
    }
  }

  fetchUserInfo() {
    Fetch('startup', { method: 'GET' })
      .then(data => {
        Answers.logLogin('Internal', true, data.user);
        this.user = data.user;
        Actions.tabbar({ type: ActionConst.RESET });
      })
      .catch(error => {
        this.removeToken();
        Actions.login({ type: ActionConst.RESET });
        this.error = error.message;
      });
  }

  @action removeToken(){
    this.token = null;
    this.user = null;
    AsyncStorage.removeItem('TOKEN');
  }

  @action addToken(token){
    this.token = token;
    AsyncStorage.setItem('TOKEN', this.token)
  }

  @computed get isValid() {
    return !!(this.user && this.user.password && this.user.email);
  }

  @action setProp = (value, name) => {
    this.user[name] = value;
  }

  @action update = () => {
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

  @action login = (request) => {
    let that = this;
    request = qs.stringify(request);

    Fetch('user/login', { method: 'POST', body: request })
      .then(data => {
        if (data.token) {
          this.addToken(data.token);
          this.fetchUserInfo();
        } else {
          that.error = 'Wrong Username or Password';
        }
      })
      .catch(error => {
        that.error = 'Server connection error';
      });
  }

  @action logout = () => {
    let that = this;
    if (this.token) {
      let request = qs.stringify({ token: this.token });
      Fetch('user/logout', { method: 'POST', body: request })
        .then(data => {
         this.removeToken();
         Actions.login({ type: ActionConst.RESET });
        })
        .catch(error => {
          that.error = error.message;
        });
    } else {
      this.removeToken();
      Actions.login({ type: ActionConst.RESET });
    }
  }

  @action changePassword = (request) => {
    return Fetch('user/changePassword', { method: 'POST', body: request })
  }
}
export const AuthStore = new AuthenticationStore();

export class SignupStore {
  @observable email = null;
  @observable password = null;
  @observable name = null;
  @observable phone = null;

  @observable error = null;

  constructor() {
    reaction(() => this.error, () => this.showErrors());
  }

  showErrors() {
    if (this.error != null) {
      alert(this.error);
      this.error = null;
    }
  }

  @action
  setProp = (value, name) => {
    this[name] = value;
  }

  @computed
  get isValid() {
    return !!(this.password && this.email && this.name);
  }

  @action
  signup = () => {
    let request = qs.stringify({ email: this.email, password: this.password, name: this.name });
    if (this.isValid) {
      Fetch('user', { method: 'POST', body: request })
        .then(data => {
          if (data.tokens && data.tokens[0]) {
            AuthStore.addToken(data.tokens[0]);
            AuthStore.fetchUserInfo();
          }
        })
        .catch(error => {
          this.error = error.message;
        });
    }
    else {
      this.error = 'All field can not empty.'
    }
  }
}

export class LoginStore {
  @observable email = null;
  @observable password = null;
  @observable error = null;

  constructor() {
    reaction(() => this.error, () => this.showErrors());
  }

  showErrors() {
    if (this.error != null) {
      alert(this.error);
      this.error = null;
    }
  }

  @action
  setProp = (value, name) => {
    this[name] = value;
  }

  @computed
  get isValid() {
    return !!(this.password && this.email);
  }
}