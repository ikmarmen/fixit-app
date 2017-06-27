import { observable, computed, action } from 'mobx';
import Fetch from '../../utils/fetch-json';
import { Actions, ActionConst } from 'react-native-router-flux';

class AdvertStore {
  @observable advert = null;
  @observable error = null;

  constructor(advert) {
    this.advert = advert;
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