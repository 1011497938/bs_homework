import React, { Component } from 'react';

// import $ from 'jquery';

// import './js/WordCard/imagesloaded.pkgd.js';
// import './js/WordCard/index.js';
// import './js/WordCard/three.min.js';
// import './js/WordCard/TweenMax.min.js';

class WordCard extends Component {
  state = {users: []}

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {

    var img = (
          <div>
            <img src="http://localhost:3001/images/a1.jpg" alt=""/>
            <img src="http://localhost:3001/images/a2.jpg" alt=""/>
            <img src="http://localhost:3001/images/a3.jpg" alt=""/>
            <img src="http://localhost:3001/images/a4.jpg" alt=""/>          
          </div>

    )
    return (
      <div id="slider">
          <div className="slider-inner">
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
          </div>
            <img src="http://localhost:3001/images/a1.jpg" alt=""/>
            <img src="http://localhost:3001/images/a2.jpg" alt=""/>
            <img src="http://localhost:3001/images/a3.jpg" alt=""/>
            <img src="http://localhost:3001/images/a4.jpg" alt=""/>     
          <div id="pagination">
              <button className="active" data-slide="0"></button>
              <button data-slide="1"></button>
              <button data-slide="2"></button>
              <button data-slide="3"></button>
          </div>
      </div>
    );
  }
}

export default WordCard;