import path from 'path'
import serve from 'koa-static'
const { Server } = require('boardgame.io/server');
const { iTreta } = require('./src/Game');

const server = Server({ games: [iTreta] });
const PORT = process.env.PORT || 8000;

// server.run(PORT);

// Build path relative to the server.js file
const frontEndAppBuildPath = path.resolve(__dirname, "./build");
server.app.use(serve(frontEndAppBuildPath))

server.run(PORT, () => {
  server.app.use(
    async (ctx, next) => await serve(frontEndAppBuildPath)(
      Object.assign(ctx, { path: "index.html" }),
      next
    )
  )
})
