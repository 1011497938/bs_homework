import React, { Component } from 'react';
// import './css/App.css';
// import './css/WordCard.css';
// import $ from 'jquery';
import WordCard from './WordCard'
import Nav from './Nav'

class App extends Component {
  state = {users: []}

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {
    return (
      <main>
        <WordCard />
        <Nav />
      </main>
    );
  }
}

export default App;