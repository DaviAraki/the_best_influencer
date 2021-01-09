import React from "react";
import GameCardReactions from "../GameCardReactions";
import GameCardTopics from "../GameCardTopics";
import GamePlayerBoard from "../GamePlayerBoard";
import "./styles.css";

export default function GameBoard({G, ctx, moves, events}) {
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
      key={`player${k}`}
      clickPassPhase={clickPassPhase.bind(this)}
      playCardHandler={playCardHandler.bind(this)}
    />
  ));
  return (
    <div className="game-board">
      <div className="card-offer">
        <h1>Offer:</h1>
        <div className="card-offer-cards">{cards}</div>
      </div>
      <div className="player-boards">
        <h1>Players:</h1>
        <div className="player-areas">{players}</div>
      </div>
    </div>
  );
}
