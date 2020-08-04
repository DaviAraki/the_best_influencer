import { Client } from 'boardgame.io/react';
import { iTreta } from './Game';

const App = Client({ 
    game: iTreta,
    numPlayers: 4
 });

export default App;