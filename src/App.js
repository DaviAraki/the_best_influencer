import React from 'react';
import { render } from "react-dom";
import {SocketIO} from 'boardgame.io/multiplayer'
import { Client } from 'boardgame.io/react';
import { Local } from 'boardgame.io/multiplayer';
import GameBoard from './components/GameBoard';
import { iTreta } from './Game';

const {protocol, hostname, port} = window.location;
const server = `${protocol}//${hostname}:${port}`

const ITretaClient = Client({
  game: iTreta,
  board: GameBoard,
  numPlayers: 4,
  multiplayer: SocketIO({server}),
});

// const ITretaClient = Client({
//   game: iTreta,
//   board: GameBoard,
//   numPlayers: 4,
//   multiplayer: SocketIO({server: 'https://thebestinfluencer.herokuapp.com'}),
// });

//const App = Client({ game: iTreta });


// const App = () => (
//   <div>
//     <ITretaClient playerID="0" />
//     {/* <ITretaClient playerID="1" />
//     <ITretaClient playerID="2" />
//     <ITretaClient playerID="3" />    */}
//   </div>
// );
// export default App;

class App extends React.Component {
  state = { playerID: null };

  render() {
    if (this.state.playerID === null) {
      return (
        <div>
          <p>Play as</p>
          <button onClick={() => this.setState({ playerID: "0" })}>
            Player 0
          </button>
          <button onClick={() => this.setState({ playerID: "1" })}>
            Player 1
          </button>
        </div>
      );
    }
    return (
      <div>
        <ITretaClient playerID={this.state.playerID} />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));