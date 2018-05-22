import React, { Component } from 'react';
import logo from './images/logo.svg';
import './App.css';
import { ListGroup, ListGroupItem } from 'reactstrap';
import gear from './gear.json'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unselected: gear,
      selected: [],
    };
  }

  // put item in the selected list
  selectItem(id){
    const found = this.state.unselected.find(item => item["id"] === id);
    const selected = this.state.selected.slice();
    this.setState({
      selected : selected.concat(found),
    });
  }
  // remove item from the selected list
  deselectItem(id){
  }

  render() {
    return (
      <div className="App">
        <ItemPool 
          items={this.state.unselected}
          itemClick={id => this.selectItem(id)}
        ></ItemPool>
        <ItemPool 
          items={this.state.selected}
          itemClick={id => this.deselectItem(id)}
        ></ItemPool>
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
            this.props.items.map(item => {
              return <BackpackItem 
                name={item.name} 
                weight={item.weight} 
                desc={item.desc} 
                onClick={() => this.props.itemClick(item.id)}
              ></BackpackItem>
            })
          }
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
      <ListGroupItem className="backpack-item" onClick={this.props.onClick}>
        <h5>{this.props.name}</h5>
        <span><b>weight:</b> {this.props.weight} oz.</span><br/>
        <span className="backpack-desc">{this.props.desc}</span>
      </ListGroupItem>
    );
  }
}

export default App;
