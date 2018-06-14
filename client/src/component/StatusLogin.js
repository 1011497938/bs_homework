import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import myStateStore from '../store'
import { observer } from 'mobx-react';

@observer
class StatusLogin extends Component {
	constructor(props){
		super(props)
		this.state = {
		  "isLogin" : false,
		  "name" : ""
		}
	}
	componentDidMount(){
		//找到用户所有的生词本  
		var thisNode = this
		fetch('/users?name=1&password=1',{  
		  method: 'GET',  
		})  
		.then((res) => {  
		  if(res.ok){
			  res.text().then((data)=>{
				  var data = JSON.parse(data);
				  if (data.login=="success") {
				  	data = JSON.parse(data.data) 
				  	myStateStore.setLoginStatus(data.name, data.email)
				  	console.log(myStateStore.loginStatus.name)
				  }
			  })
		  }
		})  
		.catch((error) => {  
		  console.log(error)  
		})  
	}
	render() {
		// console.log("login")
		var isLogin = myStateStore.loginStatus.name!=""
		return (
		  <li><a href="#none" className="my_qlinks"><i className="setting"></i></a>
			  <div className="ibar_login_box status_login" style={{"width":400}}>
				  <div className="avatar_box">
					  <p className="avatar_imgbox"><img src="http://localhost:3001/images/no-img_mid_.jpg" alt=""/></p>
					  <ul className="user_info">
						  <li>用户名：</li>
						  <li style={{"marginTop": "10px"}}>{isLogin?myStateStore.loginStatus.name:"未登录"}</li>
					  </ul>
				  </div>
				  {
					isLogin?
					  (<div className="login_btnbox">
						<Button basic color='grey'>
						  退出
						</Button>
					   </div>)
					  :
					  (<div className="login_btnbox">
						<Button basic color='grey'>
						  登录
						</Button>
					   </div>)
				  }
				  <i className="icon_arrow_white"></i>
			  </div>
		  </li>
		)
	}

}


export default StatusLogin;