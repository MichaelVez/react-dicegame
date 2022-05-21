import React, { Component } from "react";
// import "./Buttons.css";
export default class Buttons extends Component {
  render() {
    return (
      <div className='buttons'>
        <button className='button'>NewGame</button>
        <div className={`diceA ${this.props.rand_diceA}`}></div>
        <div className={`diceB ${this.props.rand_diceB}`}></div>
        <button className='button'>Hold</button>
        <button className='button'>Roll dice</button>
        <button className='button'>Input</button>
      </div>
    );
  }
}
