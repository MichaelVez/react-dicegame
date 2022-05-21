import React, { Component } from "react";
// import "Player.css";

export default class Player extends Component {
  constructor(props) {
    super(props);
  }
  active = () => {
    return <div className='active'>*</div>;
  };
  checkActive = () => {
    if (this.props.activePlayer === this.props.player) return true;
    return false;
  };
  render() {
    return (
      <div className='player'>
        <h1 className='playerName'>
          Player {this.props.player}
          {this.checkActive() && this.active()}
        </h1>
        <h2 className='playerScore'>Score{this.props.score}</h2>
        <h2 className='playerCurrent'>Current{this.props.current}</h2>
      </div>
    );
  }
}
