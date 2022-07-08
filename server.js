require('dotenv').config();
const express = require('express')
const next = require('next')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const http = require('http');
const { Server } = require("socket.io");
const cookieParser = require('cookie-parser');
const {discord} = require('./bot')
const mongoose = require("mongoose");
const { BOT_TOKEN , MONGODB_URI  } = process.env;
discord.login(BOT_TOKEN)
function getUptime(){
  let days = Math.floor(discord.uptime / 86400000);
  let hours = Math.floor(discord.uptime / 3600000) % 24;
  let minutes = Math.floor(discord.uptime / 60000) % 60;
  let seconds = Math.floor(discord.uptime / 1000) % 60;
  return `${days}일 ${hours}시간 ${minutes< 10 ? '0'+minutes:minutes}분 ${seconds < 10 ? '0'+seconds: seconds}초`
}
app.prepare().then(() => {
  const server = express()
  const httpServer = http.createServer(server);
  const io = new Server(httpServer);
  server.use(cookieParser())
  server.set('socketio',io);

  server.all('*/*', (req, res) => {
    return handle(req, res)
  })


  io.on('connection', (sockets)=>{
    sockets.on('disconnect', () => {
        console.log('user disconnected')
    });
    sockets.emit('uptime',{uptime:getUptime()})
    setInterval(function(){
      sockets.emit('uptime',{uptime:getUptime()}); }, 1000);
  })
  mongoose
      .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log('Successfully connected to mongodb'))
      .catch(e => console.error(e));
  httpServer.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})
