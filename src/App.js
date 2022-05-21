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
      diceA: "dice1",
      diceB: "dice2",
      inputMaxScore: 100,
      inputDisableStatus: false,
      gameState: "Playing",
      holdAndRollDisableStatus: false,
    };
  }
  btnRollDiceClick = () => {
    this.handleMaxScoreInput();

    let randomRollA = Math.floor(Math.random() * 6 + 1);
    let randomRollB = Math.floor(Math.random() * 6 + 1);
    if (randomRollA === 6 && randomRollB === 6) {
      //todo next player turn
    }

    this.setState({ diceA: `dice${randomRollA}` });
    this.setState({ diceB: `dice${randomRollB}` });
    this.addToCurrent(randomRollA, randomRollB);
  };
  componentDidUpdate() {
    if (this.state.gameState === "Playing") this.checkWin();
  }
  handleMaxScoreInput = () => {
    console.log(typeof this.state.inputMaxScore);
    if (this.state.inputMaxScore === "") this.setState({ inputMaxScore: 100 });
    this.setState({ inputDisableStatus: true });
    //min of 10
    if (parseInt(this.state.inputMaxScore) < 10)
      this.setState({ inputMaxScore: "10" });
  };
  addToCurrent = (randomRollA, randomRollB) => {
    if (this.state.activePlayer === "1") {
      this.setState({
        player1_current: this.state.player1_current + randomRollA + randomRollB,
      });
    }
    if (this.state.activePlayer === "2") {
      this.setState({
        player2_current: this.state.player2_current + randomRollA + randomRollB,
      });
    }
  };
  btnHoldClick = () => {
    if (this.state.activePlayer === "1") {
      if (this.state.player1_current !== 0) {
        this.setState({ activePlayer: "2" });
        this.setState({
          player1_score: this.state.player1_score + this.state.player1_current,
        });
        this.setState({ player1_current: 0 });
      } else {
        //todo must roll atleast once
        //todo make the button blink
      }
    }
    if (this.state.activePlayer === "2") {
      if (this.state.player2_current !== 0) {
        this.setState({ activePlayer: "1" });
        this.setState({
          player2_score: this.state.player2_score + this.state.player2_current,
        });

        this.setState({ player2_current: 0 });
      } else {
        //todo must roll atleast once
        //
      }
    }
  };
  inputChange = (e) => {
    console.log(e);
    this.setState({ inputMaxScore: e.target.value });
    console.log(this.state.inputMaxScore);
  };
  checkWin = () => {
    let totalScoreA = this.state.player1_current + this.state.player1_score;
    let totalScoreB = this.state.player2_current + this.state.player2_score;
    if (
      totalScoreA >= this.state.inputMaxScore ||
      totalScoreB >= this.state.inputMaxScore
    ) {
      if (totalScoreA === this.state.inputMaxScore) {
        //todo WIN
        console.log("player1 win");
        this.setState({ activePlayer: "1" });
        this.setState({ gameState: "Winner" });
        this.disableButtonsOnWinToggle();
        return;
      }
      if (totalScoreB === this.state.inputMaxScore) {
        console.log("player 2 win");
        this.setState({ activePlayer: "2" });
        this.setState({ gameState: "Winner" });
        this.disableButtonsOnWinToggle();
        //todo WIN
        return;
      }
      console.log("in if");
      if (totalScoreA > this.state.inputMaxScore) {
        console.log("player1 lose");
        this.setState({ activePlayer: "2" });
        this.setState({ gameState: "Winner" });
        this.disableButtonsOnWinToggle();
        //todo Player 1 lose
        return;
      }
      if (totalScoreB > this.state.inputMaxScore) {
        console.log("player2 lose");
        this.setState({ activePlayer: "1" });
        this.setState({ gameState: "Winner" });
        this.disableButtonsOnWinToggle();
        //todo Player 2 lose
        return;
      }
    }
  };
  disableButtonsOnWinToggle = () => {
    this.setState({
      holdAndRollDisableStatus: !this.state.holdAndRollDisableStatus,
    });
  };
  newGameClicks = () => {
    this.disableButtonsOnWinToggle();
    this.setState({
      player1_score: 0,
      player1_current: 0,
      player2_score: 0,
      player2_current: 0,
      activePlayer: "1",
      diceA: "dice1",
      diceB: "dice2",
      inputDisableStatus: false,
      gameState: "Playing",
    });
  };
  render() {
    return (
      <div className='cont'>
        <Player
          player='1'
          score={this.state.player1_score}
          current={this.state.player1_current}
          activePlayer={this.state.activePlayer}
          gameState={this.state.gameState}
        />
        <Buttons
          rand_diceA={this.state.diceA}
          rand_diceB={this.state.diceB}
          holdFunction={this.btnHoldClick}
          diceFunction={this.btnRollDiceClick}
          inputMaxScore={this.state.inputMaxScore}
          inputChange={this.inputChange}
          inputDisableStatus={this.state.inputDisableStatus}
          holdAndRollDisableStatus={this.state.holdAndRollDisableStatus}
          newGame={this.newGameClicks}
        />
        <Player
          player='2'
          score={this.state.player2_score}
          current={this.state.player2_current}
          activePlayer={this.state.activePlayer}
          gameState={this.state.gameState}
        />
      </div>
    );
  }
}
export default App;
