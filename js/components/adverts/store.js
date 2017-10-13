import { observable, computed, action, autorun } from 'mobx';
import { Actions, ActionConst } from 'react-native-router-flux';
import qs from 'qs';
import Fetch from '../../utils/fetch-json';
import LocationStore from '../../stores/locationStore';
import FilterStore from './list/filter/store';

class AdvertStore {
  @observable advert = null;
  @observable error = null;
  @observable newQuestion = null;

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

  @action addQuestion = () => {
    var that = this;

    let request = qs.stringify({ body: this.newQuestion });
    Fetch(`posts/${this.advert._id}/questions`, { method: 'POST', body: request })
      .then(data => {
        that.advert.questions = data;
        that.newQuestion = null;
      })
      .catch(error => {
        that.error = error.message;
      });
  }

  @action addQuestionText = (text) => {
    this.newQuestion = text;
  }
}

class AdvertsListStore {
  @observable adverts = [];
  @observable error = null;
  @observable isRefreshing = false;
  isLoading = false;
  isInitialized = false;
  pageCount = null;
  pageNumber = null;
  searchKeyword = null;
  distance = null;
  zip = null;

  constructor(pageCount = 10) {
    autorun(() => this.showErrors());
    this.pageCount = pageCount;
    this.pageNumber = 0;
    this.distance = 0;
  }

  @action
  initialize = () => {
    if (!this.isInitialized) {
      this.load(false);
      this.isInitialized = true;
    }
  }

  showErrors() {
    if (this.error != null) {
      alert(this.error);
      this.error = null;
    }
  }

  load = (append = true, isRefrash = false) => {
    let that = this;

    let request = {
      maxDistance: FilterStore.maxDistance,
      skip: this.pageNumber * this.pageCount,
      take: this.pageCount,
      search: this.searchKeyword
    };

    var order = FilterStore.selectedOrder.split(':');
    request.order = {
      by: order[0],
      direction: order[1]
    }

    if (FilterStore.zip && FilterStore.isSearchByZip) {
      request.zip = FilterStore.zip;
    } else {
      request.longitude = LocationStore.location.longitude;
      request.latitude = LocationStore.location.latitude
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
        this.load();
      }
    }
  }

  @action
  onSearch = (searckKeyword) => {
    this.pageNumber = 0;
    this.searchKeyword = searckKeyword;
    this.isRefreshing = true;

    this.load(false, true);
  }
}

const advertsListStore = new AdvertsListStore()
export default advertsListStore