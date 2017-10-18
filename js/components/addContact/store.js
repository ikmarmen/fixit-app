import { observable, computed, action, autorun } from 'mobx';

class AddContactStore {
    @observable isVisible=false;
    @observable contact = null;

    constructor() {
    }

    @action onValueChange = (value)=>{
        this.contact = value;
    }

    @action
    open = ()=>{
        this.contact = null;
        this.isVisible = true;
    }
    @action
    close = ()=>{
        this.isVisible = false;
    }
}

const addContactStore = new AddContactStore()
export default addContactStore