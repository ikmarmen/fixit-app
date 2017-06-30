import { observable, computed, action, asMap, autorun } from 'mobx';
import { AsyncStorage } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import Fetch from '../../utils/fetch-json';
import qs from 'qs';

class AuthenticationStore {
  @observable user = null;
  @observable token = null;
  @observable error = null;
  @observable canStart = false;


  constructor() {
    autorun(() => this.redirectloginOrHome());
    autorun(() => this.manageToken());
    autorun(() => this.showErrors());

    AsyncStorage.getItem('TOKEN', (err, result) => {
      this.canStart = true
      if (result) {
        this.token = result;
        this.fetchUserInfo();
      }
    });
  }

  showErrors(){
    if(this.error!=null){
      alert(this.error);
      this.error = null;
    }
  }

  redirectloginOrHome() {
    if (this.canStart) {
      if (this.user) {
        Actions.main({ type: ActionConst.REPLACE });
      } else {
        Actions.auth({ type: ActionConst.REPLACE });
      }
    }
  }

  manageToken() {
    if (this.canStart) {
      if (this.token) {
        AsyncStorage.setItem('TOKEN', this.token)
      } else {
        AsyncStorage.removeItem('TOKEN');
      }
    }
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
        this.user = null;
        this.error = error.message;
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
  login = (request) => {
    let that = this;
    request = qs.stringify(request);

    Fetch('user/login', { method: 'POST', body: request })
      .then(data => {
        if (data.token) {
          this.token = data.token;
          this.fetchUserInfo();
        } else {
          that.error = 'Wrong Username or Password';
        }
      })
      .catch(error => {
        that.error = 'Server connection error';
      });
  }

  @action
  logauth = () => {
    let that = this;
    if (this.token) {
      let request = qs.stringify({ token: this.token });
      Fetch('user/logauth', { method: 'POST', body: request })
        .then(data => {
          this.token = null;
          this.user = null;
        })
        .catch(error => {
          that.error = error.message;
        });
    } else {
      this.user = null;
    }
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
          AuthStore.token = data.tokens[0];
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
}