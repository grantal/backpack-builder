import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, boop <code>src/App.js</code> and save to reload.
        </p>
        <BackpackItem name="PocketRocket 2" weight="2.6" desc="The next-generation MSR PocketRocket 2 backpacking stove takes everything good about the celebrated original and makes it even better. It's lighter weight and smaller, and fits a wider range of pots."></BackpackItem>
      </div>
    );
  }
}

class BackpackItem extends Component {
  render() {
    return (
      <div className="backpack-item">
        <h5>{this.props.name}</h5>
        <span><b>weight:</b> {this.props.weight} oz.</span><br/>
        <span className="backpack-desc">{this.props.desc}</span>
      </div>
    );
  }
}

export default App;
