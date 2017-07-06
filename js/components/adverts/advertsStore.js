import { observable, computed, action, autorun } from 'mobx';
import Fetch from '../../utils/fetch-json';
import FetchBlob from '../../utils/fetch-blob';
import { Actions, ActionConst } from 'react-native-router-flux';
import qs from 'qs';

class AdvertStore {
  @observable advert = null;
  @observable error = null;
  @observable mainPhoto = null;
  @observable photos = [];
  @observable comments = [];

  constructor(advert) {
    autorun(() => this.showErrors());

    this.advert = advert;
    this.loadMainPhoto();
    this.loadComments();
  }

  showErrors() {
    if (this.error != null) {
      alert(this.error);
      this.error = null;
    }
  }

  @action
  loadMainPhoto() {
    FetchBlob(`posts/photo/${this.advert.photos[0]._id}`, { method: 'GET' })
      .then(response => {
        this.mainPhoto = `data:image/jpeg;base64,${response.data}`;
      })
      .catch(error => {
        this.error = error.message;
      });
  }

  @action
  loadComments() {
    Fetch(`posts/${this.advert._id}/comments`, { method: 'GET' })
      .then(response => {
        this.comments = response;
      })
      .catch(error => {
        this.error = error.message;
      });
  }
}

class AdvertsListStore {
  @observable adverts = [];
  @observable error = null;
  position = null;

  constructor() {
    autorun(() => this.showErrors());
  }

  showErrors() {
    if (this.error != null) {
      alert(this.error);
      this.error = null;
    }
  }

  @action
  getAdverts(options) {
    let request = {
      maxDistance: 100
    };
    if (options.coords) {
      request.longitude = options.coords.longitude;
      request.latitude = options.coords.latitude;
    }
    if (options.zip) {
      request.zip = options.zip;
    }

    request = qs.stringify(request);
    Fetch('posts/all', { method: 'POST', body: request })
      .then(data => {

        data.map((item) => {
          this.adverts.push(new AdvertStore(item))
        })
      })
      .catch(error => {
        this.error = error.message;
      });
  }
  @action
  cleanAdverts() {
    this.adverts = [];
  }
}

const advertsListStore = new AdvertsListStore()
export default advertsListStore