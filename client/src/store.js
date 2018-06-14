// 这里管理的是状态
import {observable, action, boolean, configure} from 'mobx';

configure({ enforceActions: boolean })

class MyStateStore {
  // 选中的单词本
  @observable selectedV = {
    name: "",
    word: []
  };

  @action setSelectedV = (vName)=> {
  	this.selectedV.name = vName;
  }


  // 单词本中的单词
  @observable wordData = {}

  // 显示在大屏幕的单词
  @observable showWordData = []
  @action setShowWordData = (data)=> {
  	console.log("set")
  	this.showWordData = Object.assign(data);
  }

  @observable loginStatus = {
  	"name":"",
  	"email":""
  }
  @action setLoginStatus = (name, email) => {
  	this.loginStatus.name = name
  	this.loginStatus.email = email
  } 

  //计划
  @observable plan = {
  	// "startTime":"", //开始时间
	"selectedVocabulary":"", //选择单词本
	"days":"",   //限制时间
	"completion":""  //完成度
  }

}


const  myStateStore = new  MyStateStore();

export default myStateStore;