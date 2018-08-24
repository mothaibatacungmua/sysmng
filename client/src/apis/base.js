import AppConfigs from '../configs';

const window_ = typeof window !== 'undefined' && window

class APIBase {
  constructor(){
    this.host = AppConfigs.host
    if (!this.host){
      this.host = window_.location.protocol + '//' + window_.location.host
    }
  }
}

export default APIBase  