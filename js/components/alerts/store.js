import { observable, computed, action, autorun, reaction } from 'mobx';
import { Actions, ActionConst } from 'react-native-router-flux';
import qs from 'qs';
import Fetch from '../../utils/fetch-json';

class AlertsStore {
    @observable error = null;
    @observable isRefreshing = false;
    @observable alerts = null;
    isLoading = false;
    isInitialized = false;
    pageCount = null;
    pageNumber = null;
    searchKeyword = null;

    constructor(pageCount = 100) {
        autorun(() => this.showErrors());
        this.pageCount = pageCount;
        this.pageNumber = 0;
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

    load = (append = true, isRefrash = false) => {
        if(this.alerts==null)
            this.alerts = [];
        this.isLoading = true;
        this.alerts.push({title:'Ruth Pasek asked a question'});
        this.alerts.push({title:'Ruth Pasek asked a question'});
        this.alerts.push({title:'Ruth Pasek asked a question'});
        this.isLoading = false;
        this.isRefreshing = false;
        /* let that = this;

        let request = {
            skip: this.pageNumber * this.pageCount,
            take: this.pageCount,
            search: this.searchKeyword
        };

        var order = this.filterStore.selectedOrder.split(':');
        request.order = {
            by: order[0],
            direction: order[1]
        }

        request = qs.stringify(request);
        this.isLoading = true;

        Fetch('posts/my', { method: 'POST', body: request })
            .then(data => {
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
            })
            .catch(error => {
                that.isLoading = false;
                if (isRefrash) {
                    that.isRefreshing = false;
                }
                that.error = error.message;
            }); */
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
}

const alertsStore = new AlertsStore()
export default alertsStore