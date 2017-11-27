import { observable, computed, action, autorun, reaction } from 'mobx';
import { Actions, ActionConst } from 'react-native-router-flux';
import qs from 'qs';
import Fetch from '../../utils/fetch-json';
import InterestedFilterConst from '../../constants/interestedFilterConst';

export class AdvertStore {
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

  @action acceptQuote = (data) => {

  }
}

class InterestedListStore {
  @observable error = null;
  @observable isRefreshing = false;
  @observable tabs = [];
  @observable adverts = [];
  isLoading = false;
  isInitialized = false;
  pageCount = null;
  pageNumber = null;

  constructor(pageCount = 100) {
    autorun(() => this.showErrors());
    reaction(() => this.adverts.length, () => this.calculateCounts());
    this.pageCount = pageCount;
    this.pageNumber = 0;
    this.tabs = [
      {
        key: InterestedFilterConst.quoted,
        title: `${this.getTitleByKey(InterestedFilterConst.quoted)}(0)`,
        selected: true
      },
      {
        key: InterestedFilterConst.asked,
        title: `${this.getTitleByKey(InterestedFilterConst.asked)}(0)`,
        selected: false
      },
      {
        key: InterestedFilterConst.working,
        title: `${this.getTitleByKey(InterestedFilterConst.working)}(0)`,
        selected: false
      }
    ];
  }

  @action initialize = () => {
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

  calculateCounts() {
    this.tabs.map((item, index, array) => {
      array[index].title = `${this.getTitleByKey(array[index].key)}(${this.adverts.filter((item) => item.advert.status == array[index].key).length})`;
    });
  }

  getTitleByKey = (key) => {
    switch (key) {
      case InterestedFilterConst.quoted:
        return "QUOTED";
      case InterestedFilterConst.asked:
        return "ASKED";
      case InterestedFilterConst.working:
        return "WORKING";
    }
  }

  load = async (append = true, isRefrash = false) => {
    let that = this;

    let request = {
      skip: this.pageNumber * this.pageCount,
      take: this.pageCount,
      search: this.searchKeyword,
      forRequester: true
    };

    request.order = {
      by: 'createdDate',
      direction: 'asc'
    }

    request = qs.stringify(request);
    this.isLoading = true;

    try {
      const data = await Fetch('posts/all', { method: 'POST', body: request });

      if (append) {
        data.map((item) => {
          this.adverts.push(new AdvertStore(item))
        });
      } else {
        this.adverts.clear();
        data.map((item) => {
          this.adverts.push(new AdvertStore(item))
        });
      }
      this.isLoading = false;
      if (isRefrash) {
        this.isRefreshing = false;
      }
    } catch (error) {
      this.isLoading = false;
      if (isRefrash) {
        this.isRefreshing = false;
      }
      this.error = error.message;
    }
  }

  @action onRefresh = () => {
    this.isRefreshing = true;
    this.pageNumber = 0;

    this.load(false, true);
  }

  @action onScrolePositionChange = (event) => {
    if (!this.isLoading && event) {
      //Load next page logic hear
      let itemHeight = 150;
      let currentOffset = Math.floor(event.nativeEvent.contentOffset.y);
      let currentItemIndex = Math.ceil(currentOffset / itemHeight);

      let page = (currentItemIndex + this.pageCount * 1 / 3) / this.pageCount;
      if (page > this.pageNumber) {
        this.pageNumber++;
        this.load()
      }
    }
  }

  @action selectTab = (key) => {
    for (let i = 0; i < this.tabs.length; i++) {
      this.tabs[i].selected = (this.tabs[i].key === key);
    }
  }

  @computed get visibleAdverts() {
    let selectedTab = this.tabs.filter((tab) => tab.selected === true)[0];
    return this.adverts.filter((item) => item.advert.status === selectedTab.key);
  }
}

const interestedListStore = new InterestedListStore();
export default interestedListStore;