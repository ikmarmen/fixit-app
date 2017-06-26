import { observable, computed, action } from 'mobx';
import Fetch from '../../utils/fetch-json';
import { Actions, ActionConst } from 'react-native-router-flux';

class AdvertStore {
  @observable advert = null;

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

    /*  setTimeout(() => {
        this.adverts.push(new AdvertStore({
          title: 'Advert 1',
          description: 'Description for advert 1',
          photos: ['http://static5.businessinsider.com/image/582de470e02ba72e008b4e76-1200/lamborghini-huracan-rwd-spyder.jpg', ''],
          bids: [{}, {}, {}],
          userName: 'Bill Clinton',
          createdAt: new Date(),
          distance: 5.2
        }));
        this.adverts.push(new AdvertStore({
          title: 'Advert 2',
          description: 'Description for advert 2',
          photos: ['https://cdn.gearpatrol.com/wp-content/uploads/2016/12/German-Car-Guide-Gear-Patrol-LEad-Featured.jpg', ''],
          bids: [{}, {}, {}, {}, {}, {}, {}],
          userName: 'George Bush',
          createdAt: new Date(),
          distance: 0.8
        }));
        this.adverts.push(new AdvertStore({
          title: 'Advert 3',
          description: 'Description for advert 3',
          photos: ['http://media.caranddriver.com/images/15q4/662479/dinan-s1-bmw-m4-instrumented-test-review-car-and-driver-photo-662862-s-450x274.jpg', ''],
          bids: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
          userName: 'Barack Obama',
          createdAt: new Date(),
          distance: 7.8
        }));
        this.adverts.push(new AdvertStore({
          title: 'Advert 4',
          description: 'Description for advert 4',
          photos: ['http://carrrsmag.com/data_images/models/bmw-m6/bmw-m6-07.jpg', ''],
          bids: [{}, {}, {}, {}],
          userName: 'Donald Trump',
          createdAt: new Date(),
          distance: 3.4
        }));
      }, 250);*/
  }
}

const advertsListStore = new AdvertsListStore()
export default advertsListStore