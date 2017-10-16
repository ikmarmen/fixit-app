import { observable, computed, action, autorun } from 'mobx';
import { Actions, ActionConst } from 'react-native-router-flux';

class QuoteStore {
    @observable advert = null;
    @observable error = null;

    constructor() {
        autorun(() => this.showErrors());
    }

    showErrors() {
        if (this.error != null) {
            alert(this.error);
            this.error = null;
        }
    }

    @action
    open = (advert) => {
        this.advert = advert;
        Actions.quote({ type: ActionConst.PUSH });
    }

    @action
    close = () => {
        this.advert = null;
        Actions.pop();
    }
}

const quoteStore = new QuoteStore()
export default quoteStore