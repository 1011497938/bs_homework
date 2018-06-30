import React, { Component } from 'react';
import myStateStore from '../store'
import { observer } from 'mobx-react';

// import $ from 'jquery';
// import './js/imagesloaded.pkgd.js';
// import './js/word_card.js';
// import './js/three.min.js';
// import './js/TweenMax.min.js';

@observer
class WordCard extends Component {
  state = {}

  componentDidMount() {
  }

  render() {
    var wordData = myStateStore.showWordData
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
          slide_title.push(<span data-slide-title={i} key={i+"-data-slide-title"}>{showWordData[i].word}<br/></span>)
          slide_status.push(<span data-slide-status={i} key={i+"-data-slide-status"}>{showWordData[i].meaning}</span>)
        }
        return (
          <div id="slider-content">
              <div className="meta">单词</div>
              <h2 id="slide-title">{showWordData[0].word}<br/></h2>
              {slide_title}
              <div className="meta">意思</div>
              <div id="slide-status">{showWordData[0].meaning}</div>
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
            <img src="" alt=""/>
            <img src="" alt=""/>
            <img src="" alt=""/>
            <img src="" alt=""/>     
          {renderCard_pagination()}
      </div>
    );
  }
}

export default WordCard;