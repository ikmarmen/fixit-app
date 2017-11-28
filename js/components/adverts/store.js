import { observable, computed, action, autorun } from 'mobx';
import { Actions, ActionConst } from 'react-native-router-flux';
import qs from 'qs';
import Fetch from '../../utils/fetch-json';
import LocationStore from '../../stores/locationStore';
import MyadvertsListStore from '../my/store';
import { AuthStore } from '../auth/store';
import {MyAdvertStore} from '../my/store';

class FilterStore {
  orderList = [
    { label: 'Time: newest first', value: 'createdDate:asc' },
    { label: 'Time: olds first', value: 'createdDate:desc' },
    { label: 'Distance: nearest first', value: 'distance:desc' },
    { label: 'Distance: faraway first', value: 'distance:asc' }
  ];
  @observable selectedOrder = 'createdDate:asc';
  @observable maxDistance = '10';
  @observable isSearchByZip = false;
  @observable zip = null;
  oldValues = null
  listStore = null;

  constructor(listStore) {
    this.listStore = listStore;
  }

  @action
  open = () => {
    this.oldValues = {
      selectedOrder: this.selectedOrder,
      maxDistance: this.maxDistance,
      isSearchByZip: this.isSearchByZip,
      zip: this.zip,
    }
    Actions.advertsFilter({ type: ActionConst.PUSH, store: this });
  }

  @action
  close = () => {
    if (this.hasChanges()) {
      this.listStore.onRefresh();
    }
    this.oldValues = null;
    Actions.pop();
  }

  hasChanges = () => {
    return this.oldValues.selectedOrder != this.selectedOrder ||
      this.oldValues.maxDistance != this.maxDistance ||
      this.oldValues.isSearchByZip != this.isSearchByZip ||
      this.oldValues.zip != this.zip;
  }
}

class AdvertsListStore {
  @observable adverts = [];
  @observable error = null;
  @observable isRefreshing = false;
  @observable filterStore = null;
  isLoading = false;
  isInitialized = false;
  pageCount = null;
  pageNumber = null;
  searchKeyword = null;
  distance = null;
  zip = null;

  constructor(pageCount = 5) {
    autorun(() => this.showErrors());
    this.pageCount = pageCount;
    this.pageNumber = 0;
    this.distance = 0;
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

  load = async (append = true, isRefrash = false) => {
    let that = this;

    let request = {
      maxDistance: this.filterStore.maxDistance,
      skip: this.pageNumber * this.pageCount,
      take: this.pageCount,
      search: this.searchKeyword,
      exceptRequester: true
    };

    var order = this.filterStore.selectedOrder.split(':');
    request.order = {
      by: order[0],
      direction: order[1]
    }

    if (this.filterStore.zip && this.filterStore.isSearchByZip) {
      request.zip = this.filterStore.zip;
    } else {
      request.longitude = LocationStore.location.longitude;
      request.latitude = LocationStore.location.latitude;
    }

    request = qs.stringify(request);
    this.isLoading = true;

    try {
      let data = await Fetch('posts/allNew', { method: 'POST', body: request });

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
    }
    catch (error) {
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

  @action onSearch = (searckKeyword) => {
    this.pageNumber = 0;
    this.searchKeyword = searckKeyword;
    this.isRefreshing = true;

    this.load(false, true);
  }

  @action openFilters = () => {
    this.filterStore.open();
  }

  @action addNew = (advert) => {
    this.adverts.unshift(advert);
  }
}
const advertsListStore = new AdvertsListStore();
export default advertsListStore;

class QuoteStore {
  @observable advert = null;
  @observable error = null;
  @observable amount = [1, 300];
  @observable duration = [1, 10];
  @observable contacts;
  @observable message;

  @observable isModalVisible = false;
  @observable newContact = null;

  constructor() {
      autorun(() => this.showErrors());
  }

  showErrors() {
      if (this.error != null) {
          alert(this.error);
          this.error = null;
      }
  }

  //Begin quote actions
  @action onValueChange = (value, name) => {
      this[name] = value;
  }
  @action onContactSelectionChange = (value, index) => {
      this.contacts[index].isSelected = value;
  }
  @action onQuote = () => {
      let contacts = this.contacts.filter(item => item.isSelected);
      let request = qs.stringify({ amount: this.amount.toJS(), duration: this.duration.toJS(), message: this.message, contacts: contacts });

      Fetch(`posts/${this.advert._id}/quotes`, { method: 'POST', body: request })
          .then(data => {
              this.close();
          })
          .catch(error => {
              this.error = error.message;
          });
  }
  @action open = (advert) => {
      this.advert = advert;

      let contacts = []
      contacts.push({ isSelected: false, contact: AuthStore.user.email, type: 'email' });
      if (AuthStore.user.phone) {
          contacts.push({ isSelected: false, contact: AuthStore.user.phone, type: 'phone' });
      }
      this.contacts = contacts;

      Actions.quote({ type: ActionConst.PUSH });
  }
  @action close = () => {
      this.advert = null;
      Actions.pop();
  }
  //End quote actions

  //Begin add new contact modal actions
  @action openAddContact = () => {
      this.isModalVisible = true;
      this.newContact = null;
  }
  @action closeAddContact = () => {
      this.isModalVisible = false;
  }
  @action onNewContactValueChange = (value)=>{
      this.newContact = value;
  }
  @action addContact = (contact) => {
      this.contacts.push({
          contact:  this.newContact,
          type: this.newContact.indexOf('@') == -1 ? 'phone' :'email'
      });
      this.closeAddContact();
  }
  //End add new contact modal actions
}
export const quoteStore = new QuoteStore();

export class AdvertStore {
  @observable advert = null;
  @observable error = null;
  @observable newQuestion = null;
  @observable questions = null;

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

  @action addQuestion = async () => {
    let request = qs.stringify({ body: this.newQuestion });
    try
    {
      this.questions = await Fetch(`posts/${this.advert._id}/questions`, { method: 'POST', body: request });
      this.newQuestion = null;
    }
    catch(error)
    {
      this.error = error.message;
    }
  }

  @action loadQuestions = async()=>{
    try
    {
      this.questions = await Fetch(`posts/${this.advert._id}/questions/all`, { method: 'POST' });
    }
    catch(error)
    {
      this.error = error.message;
    }
  }

  @action addQuestionText = (text) => {
    this.newQuestion = text;
  }

  @action openQuote = () => {
    quoteStore.open(this.advert);
  }
}

export class NewAdvertStore {
  @observable photos = [];
  @observable error = null;
  @observable title = null;
  @observable description = null;
  @observable isUploading = false;

  constructor(type) {
    autorun(() => this.showErrors());
  }

  showErrors() {
    if (this.error != null) {
      alert(this.error);
      this.error = null;
    }
  }

  @action addPhotos = (photos) => {
    this.photos = photos;
    Actions.newAdvert({ type: ActionConst.PUSH, store: this })
  }

  @action setProp = (value, name) => {
    this[name] = value;
  }

  @action postAdvert = () => {
    this.isUploading = true;

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
        this.isUploading = false;
        advertsListStore.addNew(new AdvertStore(data));
        let myAdvertStore = new MyAdvertStore(data);
        MyadvertsListStore.addNew(myAdvertStore);
        Actions.myAdvert({ type: ActionConst.REPLACE, store: myAdvertStore });
      })
      .catch(error => {
        this.isUploading = false;
        this.error = error.message;
      })
  }

  @computed get isValid() {
    return !!this.title;
  }
}