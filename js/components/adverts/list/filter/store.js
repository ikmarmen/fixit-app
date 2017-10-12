import { observable, computed, action, autorun } from 'mobx';

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

    constructor() {
    }
}

const filterStore = new FilterStore()
export default filterStore