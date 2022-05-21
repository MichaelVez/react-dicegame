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
      diceB: "dice1",
      inputMaxScore: 100,
      inputDisableStatus: false,
      gameState: "Playing",
      holdAndRollDisableStatus: false,
      newGame: true,
    };
  }
  btnRollDiceClick = () => {
    this.handleMaxScoreInput();

    let randomRollA = Math.floor(Math.random() * 6 + 1);
    let randomRollB = Math.floor(Math.random() * 6 + 1);
    //!66 handle
    if (
      randomRollA === 6 &&
      randomRollB === 6 &&
      this.state.activePlayer === "1"
    ) {
      //does not work for unknown reason???????
      this.setState({ player1_current: 0 });
      this.setState({ activePlayer: "2" });
      this.setState({ player1_current: 0 });
    } else if (
      randomRollA === 6 &&
      randomRollB === 6 &&
      this.state.activePlayer === "2"
    ) {
      //does not work for unknown reason???????
      this.setState({ player2_current: 0 });
      this.setState({ activePlayer: "1" });
      this.setState({ player2_current: 0 });
    }

    this.setState({ diceA: `dice${randomRollA}` });
    this.setState({ diceB: `dice${randomRollB}` });
    this.addToCurrent(randomRollA, randomRollB);
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
  componentDidMount() {
    this.handleBackGround();
  }
  componentDidUpdate() {
    if (this.state.gameState === "Playing") this.checkWin();
    this.handleBackGround();
  }
  handleMaxScoreInput = () => {
    if (this.state.inputMaxScore === "") this.setState({ inputMaxScore: 100 });
    this.setState({ inputDisableStatus: true });
    //min of 10
    if (parseInt(this.state.inputMaxScore) < 10)
      this.setState({ inputMaxScore: "10" });
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
    this.setState({ inputMaxScore: e.target.value });
  };
  handleBackGround = () => {
    let im1 = document.querySelectorAll(".playerName")[0].parentElement;
    let im2 = document.querySelectorAll(".playerName")[1].parentElement;
    if (this.state.activePlayer === "1") {
      im1.style.backgroundColor = "rgb(162, 255, 206)";
      im2.style.backgroundColor = "rgb(255,255,255)";
    }
    if (this.state.activePlayer === "2") {
      im1.style.backgroundColor = "rgb(255,255,255)";
      im2.style.backgroundColor = "rgb(162, 255, 206)";
    }
  };
  checkWin = () => {
    let totalScoreA = this.state.player1_current + this.state.player1_score;
    let totalScoreB = this.state.player2_current + this.state.player2_score;
    if (
      totalScoreA >= this.state.inputMaxScore ||
      totalScoreB >= this.state.inputMaxScore
    ) {
      if (totalScoreA == this.state.inputMaxScore) {
        //todo WIN
        this.setState({ activePlayer: "1" });
        this.setState({ gameState: "Winner" });

        this.disableButtonsOnWinToggle();
        return;
      }
      if (totalScoreB == this.state.inputMaxScore) {
        this.setState({ activePlayer: "2" });
        this.setState({ gameState: "Winner" });
        this.disableButtonsOnWinToggle();
        //todo WIN
        return;
      }
      if (totalScoreA > this.state.inputMaxScore) {
        this.setState({ activePlayer: "2" });
        this.setState({ gameState: "Winner" });
        this.disableButtonsOnWinToggle();
        //todo Player 1 lose
        return;
      }
      if (totalScoreB > this.state.inputMaxScore) {
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
    this.setState({ newGame: false });
    this.setState({
      holdAndRollDisableStatus: false,
    });
    this.setState({
      player1_score: 0,
      player1_current: 0,
      player2_score: 0,
      player2_current: 0,
      activePlayer: "1",
      diceA: "dice1",
      diceB: "dice1",
      inputDisableStatus: false,
      gameState: "Playing",
    });
  };
  funcSnoop66 = () => {
    // if (this.state.snoopDogg) {
    //   setTimeout(this.setState({ snoopDogg: false }), 3000);
    // }
    // return <div className='snoop'></div>;
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
        {/* {this.state.snoopDogg && this.funcSnoop66()} */}
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
