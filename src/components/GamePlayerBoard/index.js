import React from "react";
import GameCardReaction from "../GameCardReactions";
import "./styles.css";

export default class GameBoard extends React.Component {
  // callPlayerHandler(k){
  //   this.props.callPlayerHandler(k);
  // }
  chooseTopicHandle(k){
    this.props.chooseTopicHandle(k);
  }
  playCardHandler(k){
    this.props.playCardHandler(k);
  }
  clickPassPhase () {
    console.log('Pass');
    this.props.clickPassPhase();
  }

  setChallenge(){

  }
  render() {
    let cardsInRedBoard = this.props.player.board.red.map((card) => (
        <GameCardReaction card={card} key={card.id}/>
      ));  
    let cardsInYellowBoard = this.props.player.board.yellow.map((card) => (
      <GameCardReaction card={card} key={card.id}/>
    ));
    let cardsInGreenBoard = this.props.player.board.green.map((card) => (
      <GameCardReaction card={card} key={card.id}/>
    ));
      
    let cardsHand = this.props.player.hand.map((card, k) => (
       <GameCardReaction card={card} key={card.id} onClickPlayCard={()=>{this.playCardHandler(k)}}/>
    ));
    // let cardsDeck = this.props.player.deck.map((card) => (
    //   <GameCard card={card} key={card.id}/>
    // ));
    // let cardsAdm = this.props.player.admZone.map((card, k) => (
    //    <GameCard card={card} key={card.id} onClickDiscardCard={()=>{this.discardCardHandler(k)}} onClickPlayCard={()=>{this.playCardHandler(k)}}/>
    // ));


    return (
      <div className="player-board">
        
        <h1>{this.props.player.name} </h1>
    <h1>Likes: {this.props.player.likes} Reports: {this.props.player.reports}</h1>
        <div className="passButton" onClick={this.clickPassPhase.bind(this)}>Pass</div>
        
        <div className="player-score">
          <h1>In play</h1>
          <div className="redBoard">{cardsInRedBoard}</div>
          <div className="yellowBoard">{cardsInYellowBoard}</div>
          <div className="greenBoard">{cardsInGreenBoard}</div>
        </div>
        <div className="player-hand">
          <h1>Hand</h1>
          <div>{cardsHand}</div>
        </div>
        {/* <div className="player-deck">
          <h1>Deck:</h1>
          <div>{cardsDeck}</div>
        </div> */}
      </div>
    );
  }
}
