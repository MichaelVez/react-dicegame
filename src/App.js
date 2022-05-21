import "./App.css";
import React from "react";
import Player from "./components/Player";
import Buttons from "./components/Buttons";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player1_score: 0,
      player1_current: 0,
      player2_score: 0,
      player2_current: 0,
      activePlayer: "1",
    };
  }

  render() {
    return (
      <div className='cont'>
        <Player
          player='1'
          score={this.state.player1_score}
          current={this.state.player1_current}
          activePlayer={this.state.activePlayer}
        />
        <Buttons rand_diceA={"dice1"} rand_diceB={"dice2"} />
        <Player
          player='2'
          score={this.state.player2_score}
          current={this.state.player2_current}
          activePlayer={this.state.activePlayer}
        />
      </div>
    );
  }
}
export default App;
