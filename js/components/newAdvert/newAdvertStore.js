import { observable, computed, action, autorun } from 'mobx';
import { Actions, ActionConst } from 'react-native-router-flux';
import qs from 'qs';
import Fetch from '../../utils/fetch-json';

export default class NewAdvertStore {
  @observable type = null;
  types = {
    camera: 'camera',
    galery: 'galery'
  }

  constructor(advert) {
    autorun(() => this.pushView(this.type));
  }

  pushView(type) {
    switch (type) {
      case this.types.camera:
        {

        }
        break;
        case this.types.galery:
        {

        }
        break;
        default:
        {
          return
        }
    }
  }

  @action
  openCamera() {
  }
  @action
  openGalery() {
  }
}