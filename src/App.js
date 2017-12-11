import React, { Component } from 'react';
import './App.css';

import Header from './common/Header';
import Footer from './common/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Footer />
      </div>
    );
  }
}

export default App;
