import { observable, computed, action, autorun } from 'mobx';
import { Actions, ActionConst } from 'react-native-router-flux';
import qs from 'qs';
import Fetch from '../../../utils/fetch-json';
import LocationStore from '../../../stores/locationStore';
import {AdvertStore} from '../../myAdverts/myAdvertsStore'

export default class NewAdvertStore {
  @observable photos = [];
  @observable error = null;
  @observable title = null;
  @observable description = null;

  constructor(type) {
    autorun(() => this.showErrors());
  }

  showErrors() {
    if (this.error != null) {
      alert(this.error);
      this.error = null;
    }
  }

  @action
  addPhotos = (photos) => {
    this.photos= photos;
    Actions.newAdvert({ type: ActionConst.PUSH, store: this })
  }

  @action
  setProp = (value, name) => {
    this[name] = value;
  }

  @action
  postAdvert = () => {
    let request = new FormData();
    this.photos.forEach((item) => {
      request.append('photos', { uri: item.path, name: 'photo', type: item.mime });
    })
    request.append('title', this.title);
    request.append('description', this.description);
    request.append('loc', LocationStore.location.longitude);
    request.append('loc', LocationStore.location.latitude);

    Fetch('posts/', { method: 'POST', body: request, headers: { 'Content-Type': 'multipart/form-data' } })
      .then(data => {
        let store = new AdvertStore(data);
        Actions.myAdvert({ type: ActionConst.REPLACE, store:store })
      })
      .catch(error => {
        this.error = error.message;
      });
  }

  @computed
  get isValid() {
    return !!this.title;
  }
}