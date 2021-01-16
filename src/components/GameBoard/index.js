import React from "react";
import GameCardReactions from "../GameCardReactions";
import GameCardTopics from "../GameCardTopics";
import GamePlayerBoard from "../GamePlayerBoard";
import LikeScorer from '../Cards/Scorer/Likes'
import "./styles.css";

export default function GameBoard({G, ctx, moves, events, playerID}) {
  function chooseTopicHandler(k) {
    console.log(`chooseTopicHandler`, k);
    moves.chooseTopic(k);
  }
  function playCardHandler(k) {
    console.log(`playCardHandler`, k);
    moves.playCard(k);
  }
  function clickPassPhase() {
    console.log(`passPhase`);
    moves.pass();
  }
  console.log(playerID)

  let allTopics = G.offer.allTopicsCards.map((card, k)=> (
    <GameCardTopics 
      card={card}
      key={card.id}
      />
  ))
  let allReactions = G.offer.allReactionsCards.map((card, k)=> (
    <GameCardReactions 
      card={card}
      key={card.id}
      />
  ))
  let likeScorer = G.offer.likeScorer.map((card,k)=>(
    <LikeScorer
      card={card}
      key={card.id}
    />
  ))

  let cards = G.offer.topicsOffer.map((card, k) => (
    <GameCardTopics
      card={card}
      key={card.id}
      onClickChooseTopic={() => {
        chooseTopicHandler(k);
      }}
    />
  ));
  let players = G.players.map((player, k) => (
    <GamePlayerBoard
      player={player}
      oculto={playerID!==String(k)}
      key={`player${k}`}
      clickPassPhase={clickPassPhase.bind(this)}
      playCardHandler={playCardHandler.bind(this)}
    />
  ));
  return (
    <div className="game-board" style={{position:"relative"}}>
      {/* <div className="card-offer">
        <h1>Offer:</h1>
        <div className="card-offer-cards">{cards}</div>
      </div>
      <div className="player-boards">
        <h1>Players:</h1>
        <div className="player-areas">{players}</div>
      </div> */}
     <div className="allTopics">
        {allTopics}  
     </div> 
     <div className="allReactions">
        {allReactions}  
      </div>
      <div className="likeScorer">
        {likeScorer}
      </div>
   
    </div>
  );
}
