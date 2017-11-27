import { observable, computed, action, autorun, reaction } from 'mobx';
import { Actions, ActionConst } from 'react-native-router-flux';
import qs from 'qs';
import Fetch from '../../utils/fetch-json';
import MyAdvertFilterConst from '../../constants/myAdvertFilterConst';

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
  @action answer = (data) => {
    this.advert.questions.map((current, index, array) => {
      if (array[index]._id === data.question._id) {
        array[index].answer = {
          _id: 0,
          body: data.answer,
          isPublic: data.isPublic
        }
      }
    });
    let request = {
      questionId: data.question._id,
      answer: data.answer
    }
    this.saveAnsver(request);
  }
  saveAnsver = async (data) => {
    let request = qs.stringify({ body: data.answer });
    try {
      await Fetch(`posts/${this.advert._id}/questions/${data.questionId}/answer`, { method: 'POST', body: request });
    }
    catch (error) {
      this.error = error.message;
    }
  }
}

class FilterStore {
  orderList = [
    { label: 'Time: newest first', value: 'createdDate:asc' },
    { label: 'Time: olds first', value: 'createdDate:desc' }
  ];
  @observable selectedOrder = 'createdDate:asc';
  oldValues = null;
  listStore = null;

  constructor(listStore) {
    this.listStore = listStore;
    this.selectedOrder = 'createdDate:asc';
  }

  @action open = () => {
    this.oldValues = {
      selectedOrder: this.selectedOrder,
    }
    Actions.myAdvertsFilter({ type: ActionConst.PUSH, store: this });
  }

  @action close = (callback) => {
    if (this.hasChanges()) {
      this.listStore.onRefresh();
    }
    this.oldValues = null;
    Actions.pop();
  }

  hasChanges = () => {
    return this.oldValues.selectedOrder != this.selectedOrder;
  }
}

class MyAdvertsListStore {
  @observable error = null;
  @observable isRefreshing = false;
  @observable tabs = [];
  @observable adverts = [];
  @observable filterStore = null;
  isLoading = false;
  isInitialized = false;
  pageCount = null;
  pageNumber = null;
  searchKeyword = null;

  constructor(pageCount = 100) {
    autorun(() => this.showErrors());
    reaction(() => this.adverts.length, () => this.calculateCounts());
    this.pageCount = pageCount;
    this.pageNumber = 0;
    this.tabs = [
      {
        key: MyAdvertFilterConst.new,
        title: `${this.getTitleByKey(MyAdvertFilterConst.new)}(0)`,
        selected: true
      },
      {
        key: MyAdvertFilterConst.inprogress,
        title: `${this.getTitleByKey(MyAdvertFilterConst.inprogress)}(0)`,
        selected: false
      },
      {
        key: MyAdvertFilterConst.completed,
        title: `${this.getTitleByKey(MyAdvertFilterConst.completed)}(0)`,
        selected: false
      }
    ];
    this.filterStore = new FilterStore(this);
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
      case MyAdvertFilterConst.new:
        return "NEW";
      case MyAdvertFilterConst.inprogress:
        return "IN PROGRESS";
      case MyAdvertFilterConst.completed:
        return "COMPLETED";
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

    var order = this.filterStore.selectedOrder.split(':');
    request.order = {
      by: order[0],
      direction: order[1]
    }

    request = qs.stringify(request);
    this.isLoading = true;

    try {
      const data = await Fetch('posts/all', { method: 'POST', body: request })
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
    }
    catch (error) {
      this.isLoading = false;
      if (isRefrash) {
        this.isRefreshing = false;
      }
      this.error = error.message;
    }
  }

  @action openFilters = () => {
    this.filterStore.open();
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

  @action onSearch = (searckKeyword) => {
    this.pageNumber = 0;
    this.searchKeyword = searckKeyword;
    this.isRefreshing = true;

    this.load(false, true);
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

  @action addNew = (advert) => {
    this.adverts.unshift(advert);
  }
}

const myAdvertsListStore = new MyAdvertsListStore()
export default myAdvertsListStore