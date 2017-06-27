import { observable, computed, action } from 'mobx';
import Fetch from '../../utils/fetch-json';
import FetchBlob from '../../utils/fetch-blob';
import { Actions, ActionConst } from 'react-native-router-flux';

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

  constructor() {
    this.getAdverts();
  }

  @action
  async getAdverts() {
    Fetch('posts/all', { method: 'POST', body: {} })
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