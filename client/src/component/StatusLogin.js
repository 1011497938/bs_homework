import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

class StatusLogin extends Component {
  constructor(props){
    super(props)
    this.state = {
      "isLogin" : false,
      "name" : ""
    }
  }


	render() {
		return (
	      <li><a href="#none" className="my_qlinks"><i className="setting"></i></a>
	          <div className="ibar_login_box status_login" style={{"width":400}}>
	              <div className="avatar_box">
	                  <p className="avatar_imgbox"><img src="http://localhost:3001/images/no-img_mid_.jpg" alt=""/></p>
	                  <ul className="user_info">
	                      <li>用户名：</li>
	                      <li style={{"marginTop": "10px"}}>sl19931003</li>
	                  </ul>
	              </div>
	              <div className="login_btnbox">
	                <Button basic color='grey'>
	                  退出
	                </Button>
	                <Button basic color='grey'>
	                  登录
	                </Button>
	              </div>
	              <i className="icon_arrow_white"></i>
	          </div>
	      </li>
		)
	}

}


export default StatusLogin;