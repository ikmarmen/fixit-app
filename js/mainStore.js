import { observable, computed, action, asMap, autorun } from 'mobx';
import { AsyncStorage } from 'react-native';
import Fetch from './utils/fetch-json';
import Expo from 'expo';

class MainStore {
  @observable isAuthenticated = false;
  @observable isFontsLoaded = false;

  constructor() {
    this.loadfonts();
    this.fetchUserInfo();
  }

  @action
  fetchUserInfo() {
    Fetch('startup', { method: 'GET' })
      .then(data => {
        this.isAuthenticated = true;
        debugger;
      })
      .catch(error => {
        this.isAuthenticated = false;
        debugger;
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

const mainStore = new MainStore()
export default mainStore