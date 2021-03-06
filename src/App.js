import React, { Component } from 'react';
import './App.css';
import { ListGroup, ListGroupItem } from 'reactstrap';
import gear from './gear.json'
import backpackImg from './images/Backpack_icon.svg'

const WEIGHT_DECIMAL_PRECISION = 2;

// rounds off the ounces to prevent floating point errors
function ouncesToString(weight) {
  return Number(weight.toFixed(WEIGHT_DECIMAL_PRECISION)) + " oz."
}

// takes a weight in ounces and convers it to pounds, ounces
function poundsOunces(weight){
  if(weight > 16){
    return (Math.floor(weight / 16)) + " lbs. " + ouncesToString(weight % 16);
  }
  return ouncesToString(weight);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unselected: gear, //available gear
      selected: [], // gear the user has selected
    };
  }

  // put item in the selected list
  selectItem(id){
    let found = Object.assign({},this.state.unselected.find(item => item["id"] === id));
    const selected = this.state.selected.slice();
    // make each item in selected have a unique id
    found["id"] = selected.length.toString();
    this.setState({
      selected : selected.concat(found),
    });
  }
  // remove item from the selected list
  deselectItem(id){
    const selected = this.state.selected.slice();
    this.setState({
      selected : selected.filter(item => item["id"] !== id),
    });

  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <ItemPool 
            items={this.state.unselected}
            itemClick={id => this.selectItem(id)}
            className="col-sm p-0"
          ></ItemPool>
          <div className="col-sm p-0">
            <WeightCounter weight={
              this.state.selected.reduce((sum, item) => sum + item["weight"], 0)
            }></WeightCounter>
            <ItemPool 
              items={this.state.selected}
              itemClick={id => this.deselectItem(id)}
              className="selected-items"
            ></ItemPool>
          </div>
        </div>
      </div>
    );
  }
}

class ItemPool extends Component {
  render() {
    return (
      <div className={this.props.className}>
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
  render() {
    return (
      <ListGroupItem className="backpack-item" onClick={this.props.onClick}>
        <h5>{this.props.name}</h5>
        <span><b>weight:</b> {poundsOunces(this.props.weight)}</span><br/>
        <span className="backpack-desc">{this.props.desc}</span>
      </ListGroupItem>
    );
  }
}

class WeightCounter extends Component {


  render() {
    return (
      <div className="weight-counter">
        <h2>My Backpack</h2>
        <img src={backpackImg} className="backpack-img" alt="backpack" /><br/>
        <span><b>Total Weight:</b> {poundsOunces(this.props.weight)}</span>
      </div>
    );
  }
}

export default App;
