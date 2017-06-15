import { observable, computed } from 'mobx'

class MainStore {
  @observable numClicks = 0
  @computed get oddOrEven() {
    return this.numClicks % 2 === 0 ? 'even' : 'odd'
  }
}

const mainStore = new MainStore()

export default mainStore