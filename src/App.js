import React, { Component } from 'react';
import NumberButton from './button/button';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomVal: 1,
      adultVal: 1,
      childVal: 0
    };
    this.handleRoomClick = this.handleRoomClick.bind(this);
    this.handleAdultClick = this.handleAdultClick.bind(this);
    this.adjustValues = this.adjustValues.bind(this);
  } 

  adjustValues() {
    const { adultVal, childVal, roomVal } = this.state;
    console.log('ADJUST VALUE IS CALLED: ', roomVal);
    if(adultVal + childVal > 4*roomVal) {
      let diff = (adultVal + childVal) - 4*roomVal;
      if(diff <= childVal) {
        this.setState({ childVal: childVal - diff }, () => console.log('SETTING CHILD VALUE TO ZERO'));
        diff = adultVal - 4*roomVal;
      } else if(childVal < diff) {
        this.setState({ childVal: 0});
        diff = adultVal - 4*roomVal;
      }
      if(diff > 0) {
        this.setState({ adultVal: adultVal - diff });
      }
    }
  }

  handleRoomClick(incOrDec, max, min) {
    const { adultVal, roomVal } = this.state;
    if(incOrDec && this.state.roomVal < max) {
      this.setState({ roomVal: this.state.roomVal + 1});
      if(adultVal < roomVal + 1) {
        this.setState({ adultVal: roomVal + 1 });
      } 
    } else if(!incOrDec && this.state.roomVal > min) {
      this.setState({ roomVal: this.state.roomVal - 1}, () => this.adjustValues());
    }
  }

  handleAdultClick(incOrDec, max, min) {
    const { adultVal } = this.state;
    if(incOrDec && adultVal < max) {
      this.setState({ adultVal: adultVal + 1});
    } else if(!incOrDec && adultVal > min) {
      this.setState({ adultVal: adultVal - 1});
    }
  }

  handleChildClick(incOrDec, max, min) {
    const { childVal } = this.state;
    if(incOrDec && childVal < max) {
      this.setState({ childVal: childVal + 1});
    } else if(!incOrDec && childVal > min) {
      this.setState({ childVal: childVal - 1});
    }
  }

  render() {
    const { roomClick, roomVal, adultVal, childVal } = this.state;
    return (
      <div className="App col-12 col-md-6 offset-md-3">
          <h4 style={{textAlign: "left"}}>Choose Number of people</h4>
          <div className="descBlock">
            <div className="d-flex justify-content-between">
              <span>Rooms</span>
              <NumberButton 
                disabledPlus={roomVal > 4 ? true : false}
                disabledMinus={roomVal > 1 ? false : true} 
                triggerClick={roomClick} 
                handleClick={(incOrDec, max, min) => this.handleRoomClick(incOrDec, max, min)}
                value={roomVal}
                max={5}
                min={1}
              />
            </div>
            <hr/>
            <div className="d-flex justify-content-between">
              <span>ADULTS</span>
              <NumberButton 
                disabled={roomClick ? roomClick : !roomClick }
                value={adultVal}
                handleClick={(incOrDec, max, min) => this.handleAdultClick(incOrDec, max, min)}
                max={(4*roomVal-childVal)}
                min={roomVal}
              />
            </div>
            <hr/>
            <div className="d-flex justify-content-between">
              <span>CHILDREN</span>
              <NumberButton 
                disabled={roomClick ? roomClick : !roomClick }
                value={childVal}
                handleClick={(incOrDec, max, min) => this.handleChildClick(incOrDec, max, min)}
                max={(4*roomVal-adultVal)}
                min={0}
              />
            </div>
          </div>
      </div>
    );
  }
}

export default App;
