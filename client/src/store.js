// 这里管理的是状态
import {observable, action, useStrict} from 'mobx';
useStrict(true);

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