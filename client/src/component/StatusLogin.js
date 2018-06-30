import React, { Component } from 'react';
import {Button, Header, Modal,Form } from 'semantic-ui-react';
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
		// //找到用户所有的生词本  
		// var thisNode = this
		// fetch('/users?name=1&password=1',{  
		//   method: 'GET',  
		// })  
		// .then((res) => {  
		//   if(res.ok){
		// 	  res.text().then((data)=>{
		// 		  var data = JSON.parse(data);
		// 		  if (data.login=="success") {
		// 		  	data = JSON.parse(data.data) 
		// 		  	myStateStore.setLoginStatus(data.name, data.email)
		// 		  	myStateStore.setPlan(data.selectedVocabulary, data.days, data.completion)
		// 		  }
		// 	  })
		//   }
		// })  
		// .catch((error) => {  
		//   console.log(error)  
		// })  
	}
	render() {
		var exit = ()=>{
			myStateStore.setLoginStatus("", "")
		}
		// console.log("login")
		var isLogin = myStateStore.loginStatus.name!==""
		return (
		  <li>
		  		<a href="#none" className="my_qlinks"><i className="setting"></i></a>
				<div className="ibar_login_box status_login" style={{"width":400}}>
					<div className="avatar_box">
					  <p className="avatar_imgbox"><img src="http://192.168.1.100:3001/images/no-img_mid_.jpg" alt=""/></p>
					  <ul className="user_info">
						  <li>用户名：</li>
						  <li style={{"marginTop": "10px"}}>{isLogin?myStateStore.loginStatus.name:"未登录"}</li>
					  </ul>
					</div>
					<div className="login_btnbox">
						{isLogin?<Button basic color='grey' onClick={exit}>退出</Button>:<Login/>}
					</div>
					<i className="icon_arrow_white"></i>
				</div>

		  </li>
		)
	}

}


class Login extends Component {
	constructor(props){
		super(props)
		this.state = {
		}
	}

	render(){
		var submitLogin = () => {
			console.log("click")
			// console.log()
			let password = this.refs.password.value;
			let user = this.refs.user.value
			fetch('/users?name=' + user + '&password=' + password,{  
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
					  }else{
					  	alert("密码或用户名错误")
					  }
				  })
			  }
			})  
			.catch((error) => {  
			  console.log(error)  
			})  
		}
		return (
		  <Modal trigger={<Button>登陆</Button>}>
		    <Modal.Header>登陆</Modal.Header>
		    <Modal.Content image>
			  <Form>
			    <Form.Field>
			      <label>用户名</label>
			      <input placeholder='用户名' ref="user"/>
			    </Form.Field>
			    <Form.Field>
			      <label>密码</label>
			      <input placeholder='密码' ref="password"/>
			    </Form.Field>
			    <Button type='submit' onClick={submitLogin}>登陆</Button>
			    <SignUp/>
			  </Form>
		    </Modal.Content>
		  </Modal>
		)
	}
}

class SignUp extends Component{
	render(){
		var submit = () => {
			let password = this.refs.password.value;
			let name = this.refs.user.value
			let email = this.refs.email.value
			// 还要写判断合法性的
			var myReg=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;

			if (name.length<=6) {
				alert("姓名长度应大于6")
				return
			}

			if (password.length<=6) {
				alert("密码长度应大于6")
				return
			}

		　　if(!myReg.test(email)){
				alert("邮箱格式错误");
				return;
			}
		　　　　	
			fetch('/users/signUp?name='+name+'&email=' + email + '&password=' + password,{  
			  method: 'GET',  
			})  
			.then((res) => {  
			  if(res.ok){
				  res.text().then((data)=>{
					  if (data=="success") {
					  	myStateStore.setLoginStatus(name, email)
					  	console.log(myStateStore.loginStatus.name)
					  	alert("注册成功")
					  }else if(data==="exist"){
					  	alert("用户已存在")
					  }else 
					  	alert("失败")
				  })
			  }
			})  
			.catch((error) => {  
			  console.log(error)  
			})  
		}
		return (
		  <Modal trigger={<Button>注册</Button>}>
		    <Modal.Header>注册</Modal.Header>
		    <Modal.Content image>
			  <Form>
			    <Form.Field>
			      <label>用户名</label>
			      <input placeholder='用户名' ref="user"/>
			    </Form.Field>
			    <Form.Field>
			      <label>邮箱</label>
			      <input placeholder='用户名' ref="email"/>
			    </Form.Field>
			    <Form.Field>
			      <label>密码</label>
			      <input placeholder='密码' ref="password"/>
			    </Form.Field>
			    <Button type='submit' onClick={submit}>注册</Button>
			  </Form>
		    </Modal.Content>
		  </Modal>
		)
	}
}
export default StatusLogin;