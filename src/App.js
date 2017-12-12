import React, { Component } from 'react';
import './App.css';

import Header from './common/Header';
import Footer from './common/Footer';
import CardList from './common/CardList/CardList';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header />
                <CardList />
                <Footer />
            </div>
        );
    }
}

export default App;
