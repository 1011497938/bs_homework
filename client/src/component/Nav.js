import React, { Component } from 'react';
import $ from 'jquery';
import "./css/Nav.css";
import MyVocabulary from './MyVocabulary'
import StatusLogin from './StatusLogin'
import MyPlan from './MyPlan'
import myStateStore from '../store'
import { observer } from 'mobx-react';

@observer
class Nav extends Component {

  constructor(props){
    super(props)
    this.state = {
      chooseBox : "",
      listNum : 0
    }
  }

  componentDidMount() {

    // 显示登录框
    var login_box = true;
    $(".my_qlinks").on("click", function(event){  
      
      event.preventDefault()
      if (login_box)
        $(".quick_links_panel li").children(".ibar_login_box").css("display", "block");
      else
        $(".quick_links_panel li").children(".ibar_login_box").css("display", "none");
      
      login_box = !login_box;
    })


    //显示提示
    $(".quick_links_panel li").mouseenter(function() {
        $(this).children(".mp_tooltip").animate({ left: -92, queue: true });
        $(this).children(".mp_tooltip").css("visibility", "visible");
    });

    $(".quick_links_panel li").mouseleave(function() {
        $(this).children(".mp_tooltip").css("visibility", "hidden");
        $(this).children(".mp_tooltip").animate({ left: -121, queue: true });

    });

    $(".quick_toggle li").mouseover(function() {
        $(this).children(".mp_qrcode").show();

    });

    $(".quick_toggle li").mouseleave(function() {
        $(this).children(".mp_qrcode").hide();
    });

  }


  render() {
    // console.log("nav")
    //更新单词表个数
    var thisNode = this

    fetch('/vocabularyList/count/?owner='+myStateStore.loginStatus.name,{  
        method: 'GET',  
    })  
    // .then((response) => response.json())  
    .then((res) => {  
        if(res.ok){
          res.text().then((data)=>{
            data = JSON.parse(data); 
            if (thisNode.state.listNum!=data["count"])
              thisNode.setState({"listNum":data["count"]})
          })
        }
    })  
    .catch((error) => {  
        console.log(error) 
    })  

    var showNavBlock = ()=>{
      switch (this.state.chooseBox){
        case "vocabulary_list": return <MyVocabulary/>;
        case "my_plain": return <MyPlan/>;
        default : return <div/>
      }
    }

    var clickV = (event) =>{
        event.preventDefault();
        if (this.state.chooseBox!=="vocabulary_list")
          this.setState({chooseBox:"vocabulary_list"})
        else
          this.setState({chooseBox:""})
    }
    var clickP = (event) =>{
        event.preventDefault();
        if (this.state.chooseBox!=="my_plain")
          this.setState({chooseBox:"my_plain"})
        else
          this.setState({chooseBox:""})
    }
    return (
      <div className="mui-mbar-tabs">
          <div  className="nav-block">
            {showNavBlock()}
          </div>    
          <div className="quick_link_mian">
              <div className="quick_links_panel">
                  <div id="quick_links" className="quick_links">

                      <StatusLogin />
                      {
                        myStateStore.loginStatus.name!==""?
                        (
                          <div>
                            <li id="vocabulary_list" onClick={clickV}>
                              <a href="#none" className="message_list">
                                <div className="span">单词本</div>
                                <span className="cart_num">{this.state.listNum}</span>
                              </a>
                            </li>

                            <li id="my_plain" onClick={clickP}>
                              <a href="#none" className="message_list">
                                <div className="span">我的计划</div>
                              </a>
                            </li>
                          </div>
                        ):
                        <div/>
                      }
                  </div>

                  <div className="quick_toggle">
                      <li>
                        <a href="#none"><i className="kfzx"></i></a>
                          <div className="mp_tooltip">客服中心<i className="icon_arrow_right_black"></i>
                          </div>
                      </li>
                      <li>
                        <a href="#none">
                          <i className="mpbtn_qrcode"></i>
                        </a>
                          <div className="mp_qrcode" style={{"display":"none"}}>
                            <img src="http://192.168.1.100:3001/images/weixin_code_145.png" width="148" height="175" alt=""/>
                            <i className="icon_arrow_white"></i>
                          </div>
                      </li>

                      <li>
                        <a href="#top" className="return_top">
                          <i className="top"></i>
                        </a>
                      </li>
                  </div>
              </div>
              <div id="quick_links_pop" className="quick_links_pop hide"></div>
          </div> 
      </div>
    );
  }
}

export default Nav;