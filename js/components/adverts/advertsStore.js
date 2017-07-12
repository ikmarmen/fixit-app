import { observable, computed, action, autorun } from 'mobx';
import { Actions, ActionConst } from 'react-native-router-flux';
import qs from 'qs';
import Fetch from '../../utils/fetch-json';

class AdvertStore {
  @observable advert = null;
  @observable error = null;

  constructor(advert) {
    autorun(() => this.showErrors());
    this.advert = advert;
  }

  showErrors() {
    if (this.error != null) {
      alert(this.error);
      this.error = null;
    }
  }

}

class AdvertsListStore {
  @observable adverts = [];
  @observable error = null;
  @observable isRefreshing = false;
  isLoading = false;
  options = null;
  pageCount = null;
  pageNumber = null;



  constructor(pageCount = 10) {
    autorun(() => this.showErrors());
    this.pageCount = pageCount;
    this.pageNumber = 0;
  }

  showErrors() {
    if (this.error != null) {
      alert(this.error);
      this.error = null;
    }
  }

  @action
  initialize = (options) => {
    this.options = options;
    this.load(this.options, false);
  }

  @action
  cleanAdverts = () => {
    this.adverts = [];
  }

  load = (options, append = true, isRefrash = false) => {
    let that = this;

    let request = {
      maxDistance: options.distance || 100,
      skip: this.pageNumber * this.pageCount,
      take: this.pageCount
    };

    if (options.coords) {
      request.longitude = options.coords.longitude;
      request.latitude = options.coords.latitude;
    }
    if (options.zip) {
      request.zip = options.zip;
    }

    request = qs.stringify(request);
    this.isLoading = true;

    Fetch('posts/all', { method: 'POST', body: request })
      .then(data => {
        if (append) {
          data.map((item) => {
            that.adverts.push(new AdvertStore(item))
          });
        } else {
          that.adverts.clear();
          data.map((item) => {
            that.adverts.push(new AdvertStore(item))
          });
        }
        that.isLoading = false;
        if (isRefrash) {
          that.isRefreshing = false;
        }
      })
      .catch(error => {
        that.isLoading = false;
        if (isRefrash) {
          that.isRefreshing = false;
        }
        that.error = error.message;
      });
  }

  @action
  onRefresh = () => {
    this.isRefreshing = true;
    this.pageNumber = 0;
    this.load(this.options, false, true);
  }

  @action
  onScrolePositionChange = (event) => {
    if (!this.isLoading) {
      //Load next page logic hear
      let itemHeight = 280;
      let currentOffset = Math.floor(event.nativeEvent.contentOffset.y);
      let currentItemIndex = Math.ceil(currentOffset / itemHeight);

      let page = (currentItemIndex + this.pageCount * 1 / 3) / this.pageCount;
      if (page > this.pageNumber) {
        this.pageNumber++;
        this.load(this.options)
      }
    }
  }
}

const advertsListStore = new AdvertsListStore()
export default advertsListStore