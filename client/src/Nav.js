import React, { Component } from 'react';
import $ from 'jquery';
import "./css/Nav.css";
import { Button } from 'semantic-ui-react'
import VocabularyList from './VocabularyList'
import NavBlock from './NavBlock'
class Nav extends Component {
  state = {}

  componentDidMount() {

    //显示提示
    var login_box = true;
    $(".my_qlinks").on("click", function(event){  
      
      event.preventDefault()
      if (login_box)
        $(".quick_links_panel li").children(".ibar_login_box").css("display", "block");
      else
        $(".quick_links_panel li").children(".ibar_login_box").css("display", "none");
      
      login_box = !login_box;
    })

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
    return (
      <div className="mui-mbar-tabs">
          <div  className="nav-block">
            <NavBlock/>
          </div>    
          <div className="quick_link_mian">
              <div className="quick_links_panel">
                  <div id="quick_links" className="quick_links">
                      <li><a href="#none" className="my_qlinks"><i className="setting"></i></a>
                          <div className="ibar_login_box status_login">
                              <div className="avatar_box">
                                  <p className="avatar_imgbox"><img src="http://localhost:3001/images/no-img_mid_.jpg" /></p>
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
                            <img src="http://localhost:3001/images/weixin_code_145.png" width="148" height="175" />
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