import React, { Component } from 'react';
import myStateStore from '../store'
import { observer } from 'mobx-react';
// import $ from 'jquery';

// import './js/WordCard/imagesloaded.pkgd.js';
// import './js/WordCard/index.js';
// import './js/WordCard/three.min.js';
// import './js/WordCard/TweenMax.min.js';

@observer
class WordCard extends Component {
  state = {users: []}

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {
    console.log("WordCard")
    var renderCard_slider = () => {
      var showWordData = myStateStore.showWordData
      if (showWordData.length===0) {
        return (
          <div id="slider-content">
              <div className="meta">Species</div>
              <h2 id="slide-title">Amur <br/>Leopard</h2>
              <span data-slide-title="0">Amur <br/>Leopard</span>
              <span data-slide-title="1">Asiatic <br/>Lion</span>
              <span data-slide-title="2">Siberian <br/>Tiger</span>
              <span data-slide-title="3">Brown <br/>Bear</span>
              <div className="meta">Status</div>
              <div id="slide-status">Critically Endangered</div>
              <span data-slide-status="0">Critically Endangered</span>
              <span data-slide-status="1">Endangered</span>
              <span data-slide-status="2">Endangered</span>
              <span data-slide-status="3">Least Concern</span>
          </div>
        )
      }else{
        var slide_title = []
        var slide_status = []
        for (var i = 0; i < showWordData.length; i++) {
          slide_title.push(<span data-slide-title={i} key={i+"-data-slide-title"}>{showWordData[i].word}<br/>{showWordData[i].meaning}</span>)
          slide_status.push(<span data-slide-status={i} key={i+"-data-slide-status"}>{i}</span>)
        }
        return (
          <div id="slider-content">
              <div className="meta">单词</div>
              <h2 id="slide-title">{showWordData[0].word}<br/>{showWordData[0].meaning}</h2>
              {slide_title}
              <div className="meta">意思</div>
              <div id="slide-status">{i}</div>
              {slide_status}
          </div>
        )
      }
    }

    var renderCard_pagination = ()=>{
      var showWordData = myStateStore.showWordData
      if (showWordData.length===0) {
        return (
          <div id="pagination">
              <button className="active" data-slide="0"></button>
              <button data-slide="1"></button>
              <button data-slide="2"></button>
              <button data-slide="3"></button>
          </div>
        )
      }else{
        var button_list = []
        for (var i = 1; i < showWordData.length; i++) {
          button_list.push(<button data-slide={i} key={i}></button>)
        }
        return (
          <div id="pagination">
              <button className="active" data-slide="0"></button>
              {button_list}
          </div>
        )
      }
    }
    return (
      <div id="slider">
          <div className="slider-inner">
            {renderCard_slider()}
          </div>
            <img src="http://localhost:3001/images/a1.jpg" alt=""/>
            <img src="http://localhost:3001/images/a2.jpg" alt=""/>
            <img src="http://localhost:3001/images/a3.jpg" alt=""/>
            <img src="http://localhost:3001/images/a4.jpg" alt=""/>     
          {renderCard_pagination()}
      </div>
    );
  }
}

export default WordCard;