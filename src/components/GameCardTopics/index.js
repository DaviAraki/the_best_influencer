import React from "react";
import "./styles.css";

export default class GameCardTopics extends React.Component {
  clickCardHandler() {
    if(this.props.onClickChooseTopic){
      this.props.onClickChooseTopic()
    }
  }

  render() {
    let dificulty = [];

    for(let i = 0; i<this.props.card.green ;i++){
      dificulty.push((
        <span role="img" aria-label="GreenCard">
            <div className="greenCard"></div>
        </span>
      ));
    }
    for(let i = 0; i<this.props.card.yellow; i++){
      dificulty.push((
        <span role="img" aria-label="YellowCard">
            <div className="yellowCard"></div>
        </span>
      ));
    }
    for(let i = 0; i<this.props.card.red; i++){
        dificulty.push((
          <span role="img" aria-label="RedCard">
              <div className="redCard"></div>
          </span>
        ));
      }
    
    
    return (
      <div className="game-card-topics" onClick={this.clickCardHandler.bind(this)}>
        <div className="name">{this.props.card.name}</div>
        <div className="dificulty">
          {dificulty}
        </div>

        {/* <div>
          {this.props.textBox}
        </div> */}
      </div>
    );
  }
}