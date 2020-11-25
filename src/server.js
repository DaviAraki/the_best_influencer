const { Server } = require('boardgame.io/server');
const { iTreta } = require('./Game');

const server = Server({ games: [iTreta] });

server.run(8000);