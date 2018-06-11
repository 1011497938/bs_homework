import React, { Component } from 'react';
import $ from 'jquery';
import "./css/Nav.css";
import MyVocabulary from './MyVocabulary'
import StatusLogin from './StatusLogin'
import MyPlan from './MyPlan'


class Nav extends Component {

  constructor(props){
    super(props)
    this.state = {
      chooseBox : ""
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

    // 点击展开
    var thisDom = this;
    $("#vocabulary_list").on('click', function(event) {
      event.preventDefault();
      if (thisDom.state.chooseBox!=="vocabulary_list")
        thisDom.setState({chooseBox:"vocabulary_list"})
      else
        thisDom.setState({chooseBox:""})
    });

    $("#my_plain").on('click', function(event) {
      event.preventDefault();
      if (thisDom.state.chooseBox!=="my_plain")
        thisDom.setState({chooseBox:"my_plain"})
      else
        thisDom.setState({chooseBox:""})
    });

  }

  componentDidUpdate(){

  }

  render() {
    
    var showNavBlock = ()=>{
      switch (this.state.chooseBox){
        case "vocabulary_list": return <MyVocabulary/>;
        case "my_plain": return <MyPlan/>;
        default : return <div/>
      }
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

                      <li id="vocabulary_list">
                        <a href="#none" className="message_list">
                          <div className="span">单词本</div>
                          <span className="cart_num">0</span>
                        </a>
                      </li>

                      <li id="my_plain">
                        <a href="#none" className="message_list">
                          <div className="span">我的计划</div>
                        </a>
                      </li>

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
                            <img src="http://localhost:3001/images/weixin_code_145.png" width="148" height="175" alt=""/>
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