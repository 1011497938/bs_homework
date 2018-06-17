// 这里管理的是状态
import {observable, action, boolean, configure} from 'mobx';

configure({ enforceActions: boolean })

class MyStateStore {
  // 选中的单词本
  @observable selectedV = {
    name: "",
    word: [],
    owner: ""
  };

  @action setSelectedV = (vName, owner)=> {
  	this.selectedV.name = vName;
    this.selectedV.owner = owner;
  }


  // 单词本中的单词
  @observable wordData = {}

  // 显示在大屏幕的单词
  @observable showWordData = []
  @action setShowWordData = (data)=> {
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
  	"V":"四级", //选择单词本
  	"days":"3",   //限制时间
  	"completion":"100"  //完成度
  }

  @action setPlan = (V,days,completion) => {
    this.plan.V = V
    this.plan.days = days
    this.plan.completion = completion
    console.log(this.plan.V)
    if (this.loginStatus.name!=="") {
      // update
    }
  } 

}


const  myStateStore = new  MyStateStore();

export default myStateStore;