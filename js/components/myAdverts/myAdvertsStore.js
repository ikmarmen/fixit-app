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

class MyAdvertsListStore {
  @observable adverts = [];
  @observable error = null;
  @observable isRefreshing = false;
  isLoading = false;
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
  initialize = () => {
    this.pageNumber = 0;
    this.load(false);
  }

  load = (append = true, isRefrash = false) => {
    let that = this;
    this.isLoading = true;

    let request = {
      skip: this.pageNumber * this.pageCount,
      take: this.pageCount
    };
    request = qs.stringify(request);
    
    Fetch('posts/my', { method: 'POST', body: request })
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
    this.load(false, true);
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
        this.load()
      }
    }
  }
}

const myAdvertsListStore = new MyAdvertsListStore()
export default myAdvertsListStore