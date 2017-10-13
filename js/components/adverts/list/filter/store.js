import { observable, computed, action, autorun } from 'mobx';
import { Actions, ActionConst } from 'react-native-router-flux';
import AdvertsListStore from '../../store';

class FilterStore {
    orderList = [
        { label: 'Distanse: nearest first', value: 'distanse:asc' },
        { label: 'Distanse: faraway first', value: 'distanse:desc' },
        { label: 'Time: newest first', value: 'createdDate:desc' },
        { label: 'Time: olds first', value: 'createdDate:asc' }
    ];
    @observable selectedOrder = 'createdDate:desc';
    @observable maxDistance = '10';
    @observable isSearchByZip = false;
    @observable zip = null;
    oldValues = null

    constructor() {
    }

    @action
    open = () => {
        this.oldValues = {
            selectedOrder: this.selectedOrder,
            maxDistance: this.maxDistance,
            isSearchByZip: this.isSearchByZip,
            zip: this.zip,
        }
        Actions.advertsFilter({ type: ActionConst.PUSH });
    }

    @action
    close = () => {
        if (this.hasChanges()) {
            AdvertsListStore.onRefresh();
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

const filterStore = new FilterStore()
export default filterStore