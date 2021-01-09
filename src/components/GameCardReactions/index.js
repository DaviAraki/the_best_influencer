import React from "react";
import "./styles.css";

export default class GameCardReaction extends React.Component {
  clickCardHandler() {
    if(this.props.onClickPlayCard){
      this.props.onClickPlayCard()
    }
  }

  render() {
    let greens = [];
    let yellows = [];
    let reds = [];
    for(let i = 0; i<this.props.card.green.likes; i++){
      greens.push((
        <span role="img" aria-label="Like">
        👍
        </span>
      ));
    }
    for(let i = 0; i<this.props.card.green.reports; i++){
      greens.push((
        <span role="img" aria-label="Report">
          🚫
        </span>
      ));
    }
    for(let i = 0; i<this.props.card.yellow.likes; i++){
      yellows.push((
        <span role="img" aria-label="Like">
        👍
        </span>
      ));
    }
    for(let i = 0; i<this.props.card.yellow.reports; i++){
      yellows.push((
        <span role="img" aria-label="Report">
        🚫
        </span>
      ));
    }
    for(let i = 0; i<this.props.card.red.likes; i++){
      reds.push((
        <span role="img" aria-label="Like">
        👍
        </span>
      ));
    }
    for(let i = 0; i<this.props.card.red.reports; i++){
      reds.push((
        <span role="img" aria-label="Report">
        🚫
        </span>
      ));
    }
    
    
    return (
      <div className="game-card-reactions" onClick={this.clickCardHandler.bind(this)}>
        <div className="name">{this.props.card.name}</div>
        <div className="green">
          {greens}
        </div>
        <div className="yellow">
          {yellows}
        </div>
        <div className="red">
          {reds}
        </div>
        <div className="textBox">
          {this.props.card.textBox}
        </div>
      </div>
    );
  }
}