// 这里管理的是状态
import {observable, action, enforceActions,  boolean, configure} from 'mobx';

configure({ enforceActions: boolean })
class Word {
	value = ""
	prounce = ""
	meaning = ""
}

class MyStateStore {
  // 被观察者
  @observable selectedV = {
    name: "",
    word: []
  };

  @action setSelectedV = (vName)=> {
  	this.selectedV.name = vName;
  }
}


const  myStateStore = new  MyStateStore();

export default myStateStore;