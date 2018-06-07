import React, { Component } from 'react';
// import './css/App.css';
// import './css/WordCard.css';
// import $ from 'jquery';
import WordCard from './WordCard'

class App extends Component {
  state = {users: []}

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {
        //     <h1>Users</h1>
        // {this.state.users.map(user =>
        //   <div key={user.id}>{user.username}</div>
        // )}
    return (
      <main>
        <WordCard />
      </main>
    );
  }
}

export default App;