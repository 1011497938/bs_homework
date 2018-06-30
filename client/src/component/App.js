import React, { Component } from 'react';
// import './css/App.css';
// import './css/WordCard.css';
// import $ from 'jquery';
import WordCard from './WordCard'
import Nav from './Nav'


class App extends Component {
  state = {users: []}

  componentDidMount() {
  }

  render() {
    return (
      <main style={{"backgroundColor": "#23272b"}}>
        <WordCard />
        <Nav />
      </main>
    );
  }
}

export default App;