import { observable, computed, action, autorun } from 'mobx';
import { Actions, ActionConst } from 'react-native-router-flux';
import qs from 'qs';
import Fetch from '../../utils/fetch-json';
import { AuthStore } from '../auth/authStore';

class QuoteStore {
    @observable advert = null;
    @observable error = null;
    @observable amount = [1, 300];
    @observable duration = [1, 10];
    @observable contacts;
    @observable message;

    constructor() {
        autorun(() => this.showErrors());
    }

    showErrors() {
        if (this.error != null) {
            alert(this.error);
            this.error = null;
        }
    }

    @action onValueChange = (value, name) => {
        this[name] = value;
    }
    @action onContactSelectionChange = (value, index) => {
        this.contacts[index].isSelected = value;
    }
    @action onQuote = () => {
        let contacts = this.contacts.filter(item => item.isSelected);
        let request = qs.stringify({ amount: this.amount.toJS(), duration: this.duration.toJS(), message: this.message, contacts: contacts });

        Fetch(`posts/${this.advert._id}/quote`, { method: 'POST', body: request })
            .then(data => {
                this.close();
            })
            .catch(error => {
                this.error = error.message;
            });
    }
    @action addContact = (contact) => {
        this.contacts.push({
            contact: contact,
            type: contact.indexOf('@') == -1 ? 'phone' :'email'
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
}

const quoteStore = new QuoteStore()
export default quoteStore