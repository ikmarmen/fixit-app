import { observable, computed, action, autorun } from 'mobx';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';

class LocationStore {
  @observable location = null;
  @observable error = null;

  constructor() {
    autorun(() => this.showErrors());
    
    BackgroundGeolocation.configure({
      startForeground: false,
      debug: false,
      locationProvider: BackgroundGeolocation.provider.ANDROID_ACTIVITY_PROVIDER,
      interval: 60000,
      fastestInterval: 5000,
      activitiesInterval: 10000,
      mode:0
    });
    BackgroundGeolocation.start();

    BackgroundGeolocation.on('location', (location) => {
      this.location = location
    });

    BackgroundGeolocation.on('error', (error) => {
      this.error = error;
    });
  }

  showErrors() {
    if (this.error != null) {
      alert(this.error);
      this.error = null;
    }
  }
}

const locationStore = new LocationStore();
export default locationStore;