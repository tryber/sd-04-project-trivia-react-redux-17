import React, { Component } from 'react';
import Login from '../components/Login';

class Home extends Component() {
  componentDidMount() {
    localStorage.removeItem('token');
    localStorage.removeItem('state');
  }

  render() {
    return (
      <div>
        <h1>HOME</h1>
        <Login />
      </div>
    );
  }
}

export default Home;
