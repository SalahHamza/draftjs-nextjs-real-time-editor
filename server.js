const express = require('express')
const next = require('next')
const  socketio =require( 'socket.io');
const http =require('http')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
  // const server = express()

  // server.all('*', (req, res) => {
  //   return handle(req, res)
  // })

  // server.listen(port, (err) => {
  //   if (err) throw err
  //   console.log(`> Ready on http://localhost:${port}`)
  // })
   const app =express();
   const server= http.createServer(app);
   const io = new socketio.Server();
   io.attach(server);

   app.get('/hello', async (_, res) => {
    res.send('Hello World');
   });

   io.on('connection', (socket) => {
    console.log('connection');
    socket.emit('status', 'Hello from Socket.io');

    socket.on('join', (room) => {
     console.log(`Socket ${socket.id} joining ${room}`);
     socket.join(room);
    });
    socket.on('chat', (data) => {
     const { message, room } = data;
    // console.log(`msg: ${message}, room: ${room}`);
     io.to(room).emit('chat', message);
    });
    
    socket.on('disconnect', () => {
     console.log('client disconnected');
    });

   });

   app.all('*', (req, res) => nextHandler(req, res));

   server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
   });
})

