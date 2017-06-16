import { observable, computed, action, asMap, autorun } from 'mobx';
import { AsyncStorage } from 'react-native';
import Fetch from '../utils/fetch-json';
import Expo from 'expo';
import { Actions, ActionConst } from 'react-native-router-flux';

class RouterStore {
  @observable isAuthenticated = false;
  @observable isFontsLoaded = false;
  @observable user = null;

  constructor() {
    this.loadfonts()
      .then(() => {
        this.fetchUserInfo();
      });
  }

  @action
  fetchUserInfo() {
    Fetch('startup', { method: 'GET' })
      .then(data => {
        this.isAuthenticated = true;
        this.user = data.user;
        Actions.home({type: ActionConst.REPLACE});
      })
      .catch(error => {
        this.isAuthenticated = false;
        AsyncStorage.removeItem('TOKEN');
      });
  }

  @action
  async loadfonts() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require('native-base/Fonts/Ionicons.ttf'),
    });
    this.isFontsLoaded = true;
  }
}

const routerStore = new RouterStore()
export default routerStore