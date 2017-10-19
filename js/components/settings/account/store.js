import { observable, computed, action, autorun } from 'mobx';
import { Actions, ActionConst } from 'react-native-router-flux';
import qs from 'qs';
import Fetch from '../../../utils/fetch-json';
import { AuthStore } from '../../auth/authStore';

class QuoteStore {
    @observable authStore = AuthStore;
    @observable error = null;
    @observable oldPassword = null;
    @observable newPassword = null;
    @observable confirmNewPassword = null;
    @observable isModalVisible = false;

    constructor() {
        autorun(() => this.showErrors());
    }

    showErrors() {
        if (this.error != null) {
            alert(this.error);
            this.error = null;
        }
    }

    //Begin account actions
    @action onValueChange = (value, name) => {
        this[name] = value;
    }

    @action open = () => {
        this.oldPassword = null;
        this.newPassword = null;
        this.confirmNewPassword = null;
        this.isModalVisible = true;
    }
    @action close = () => {
        this.isModalVisible = false;
    }
    @computed get Validate () {
        if(!this.oldPassword || !this.newPassword || !this.confirmNewPassword)
            return "Please fill all inputs";
        if(this.newPassword !== this.confirmNewPassword)
            return "Passwords do not match";
      return null;
    }
    @action changePassword = ()=>{
        let request = qs.stringify({ oldPassword: this.oldPassword, newPassword: this.newPassword  });
        Fetch('user/changePassword', { method: 'POST', body: request })
          .then(data => {
              this.close();
          })
          .catch(error => {
            this.error = error.message;
          });
    }
    //End account actions
}

const quoteStore = new QuoteStore()
export default quoteStore