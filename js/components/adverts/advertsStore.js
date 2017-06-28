import { observable, computed, action } from 'mobx';
import Fetch from '../../utils/fetch-json';
import FetchBlob from '../../utils/fetch-blob';
import { Actions, ActionConst } from 'react-native-router-flux';
import qs from 'qs';

class AdvertStore {
  @observable advert = null;
  @observable error = null;
  @observable mainPhoto = null;
  @observable photos = [];

  constructor(advert) {
    this.advert = advert;
    this.loadMainPhoto();
  }

  @action
  loadMainPhoto() {
    FetchBlob(`posts/photo/${this.advert.photos[0]._id}`, { method: 'GET' })
      .then(response => {
        this.mainPhoto = `data:image/jpeg;base64,${response.data}`;
      })
      .catch(error => {
        console.warn(error.message);
        this.error = error.message;
      });
  }
}

class AdvertsListStore {
  @observable adverts = [];
  position = null;

  constructor() {
    this.getPosition();
  }

  @action
  async getPosition() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.position = position;
        this.getAdverts({ coords: this.position.coords });
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  @action
  async getAdverts(options) {
    let request = {
      maxDistance: 100
    };
    if (options.coords) {
      request.longitude = options.coords.longitude;
      request.latitude = options.coords.latitude;
    } 
    if (options.zip) {
      request.zip= options.zip;
    }

    request = qs.stringify(request);
    Fetch('posts/all', { method: 'POST', body: request })
      .then(data => {
        data.map((item) => {
          this.adverts.push(new AdvertStore(item))
        })
      })
      .catch(error => {

      });
  }
}

const advertsListStore = new AdvertsListStore()
export default advertsListStore