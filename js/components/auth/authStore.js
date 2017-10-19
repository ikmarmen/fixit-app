import { observable, computed, action, asMap, autorun, reaction } from 'mobx';
import { AsyncStorage } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import Fetch from '../../utils/fetch-json';
import qs from 'qs';
import LocationStore from '../../stores/locationStore';

class AuthenticationStore {
  @observable user = null;
  @observable token = null;
  @observable error = null;
  @observable canStart = false;


  constructor() {
    reaction(() => [this.user, this.canStart, LocationStore.location], () => this.redirectloginOrHome(arguments));
    reaction(() => [this.token, this.canStart], () => this.manageToken(arguments));
    reaction(() => this.error, () => this.showErrors(arguments));

    AsyncStorage.getItem('TOKEN', (err, result) => {
      if (result) {
        this.token = result;
        this.fetchUserInfo();
      } else {
        this.canStart = true
      }
    });
  }

  showErrors() {
    if (this.error != null) {
      alert(this.error);
      this.error = null;
    }
  }

  redirectloginOrHome() {
    if (this.canStart) {
      if (this.user && LocationStore.location) {
        Actions.tabbar({ type: ActionConst.RESET });
      } else if (!this.user) {
        Actions.login({ type: ActionConst.RESET });
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
        let id = setTimeout(()=>{
          this.user = data.user;
          this.canStart = true;
          clearTimeout(id);
        }, 1500);
      })
      .catch(error => {
        this.user = null;
        this.canStart = true
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
            AuthStore.token = data.tokens[0];
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