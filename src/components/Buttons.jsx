import React, { Component } from "react";
// import "./Buttons.css";
export default class Buttons extends Component {
  render = () => {
    return (
      <div className='buttons'>
        <button className='button' onClick={this.props.newGame}>
          NewGame
        </button>
        <div className={`diceA ${this.props.rand_diceA}`}></div>
        <div className={`diceB ${this.props.rand_diceB}`}></div>
        <button
          disabled={this.props.holdAndRollDisableStatus}
          className='button'
          onClick={this.props.holdFunction}
        >
          Hold
        </button>
        <button
          disabled={this.props.holdAndRollDisableStatus}
          className='button'
          onClick={this.props.diceFunction}
        >
          Roll dice
        </button>
        <input
          disabled={this.props.inputDisableStatus}
          type='number'
          placeholder={100}
          onChange={this.props.inputChange}
          value={this.props.inputMaxScore}
        />
      </div>
    );
  };
}
