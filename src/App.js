import React from 'react';
import {SocketIO} from 'boardgame.io/multiplayer'
import { Client } from 'boardgame.io/react';
import { Local } from 'boardgame.io/multiplayer';
import { iTreta } from './Game';

const iTretaClient = Client({
  game: iTreta,
  board: TicTacToeBoard,
  numPlayers: 4,
  multiplayer: SocketIO({server: 'localhost:8000'}),
});

const App = () => (
  <div>
    <iTretaClient playerID="0" />
    <iTretaClient playerID="1" />
    <iTretaClient playerID="2" />
    <iTretaClient playerID="3" />   
  </div>
);
export default App;