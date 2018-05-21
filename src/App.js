import React, { Component } from 'react';
import logo from './images/logo.svg';
import './App.css';
import { ListGroup, ListGroupItem } from 'reactstrap';
import gear from './gear.json'

class App extends Component {
  render() {
    return (
      <div className="App">
        <ItemPool></ItemPool>
        <MyBackpack></MyBackpack>
      </div>
    );
  }
}

class ItemPool extends Component {
  render() {
    return (
      <div className="item-pool">
        <ListGroup>
          {
            gear.map(function(item){
              return <BackpackItem name={item.name} weight={item.weight} desc={item.desc}></BackpackItem>
            })
          }
        </ListGroup>
      </div>
    );
  }
}

class MyBackpack extends Component {
  render() {
    return (
      <div className="item-pool">
        <ListGroup>
          <BackpackItem name="PocketRocket 2" weight="2.6" desc="Ultralight, fast-boiling canister stove."></BackpackItem>
        </ListGroup>
      </div>
    );
  }
}

class BackpackItem extends Component {
  constructor(props) {
    super(props);
    this.state = {hidden: false};
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState(prevState => ({
      hidden: !prevState.hidden
    }));
  }

  render() {
    if (this.state.hidden) {
      return (<div hidden></div>);
    }
    return (
      <ListGroupItem className="backpack-item" onClick={this.handleClick}>
        <h5>{this.props.name}</h5>
        <span><b>weight:</b> {this.props.weight} oz.</span><br/>
        <span className="backpack-desc">{this.props.desc}</span>
      </ListGroupItem>
    );
  }
}

export default App;
