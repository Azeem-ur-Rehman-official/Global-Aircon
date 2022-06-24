const app = require('./app');
const connectDatabase = require('./config/database');
const http = require('http');
const server = http.createServer(app);
const dotenv = require('dotenv');
dotenv.config({ path: 'backend/config/config.env' });
const cloudinary = require('cloudinary');
const { Server } = require('socket.io');
const io = new Server(server);
const Comments = require('./models/discusionForm');
// Handle Uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log('Shutting down due to uncaught exception');
  process.exit(1);
});

// Setting up config file
if (process.env.NODE_ENV === 'PRODUCTION')
  require('dotenv').config({ path: 'backend/config/config.env' });

// Connecting to database
connectDatabase();
// Sockets.io operations
// Soketio

io.on('connection', (socket) => {
  console.log(socket.id + ' connected.');

  socket.on('createComment', async (msg) => {
    const {
      username,
      avatar,
      content,
      replyName,
      replyContent,
      userId,
      createdAt,
      send,
      id,
    } = msg;

    // console.log(newComment);
    if (send === 'replyComment') {
      console.log('replyComment ');

      // const comment = await Comments.findById(id);
      // if (comment) {

      // }
      const replyComment = new Comments({
        username,
        avatar,
        content,
        replyName,
        replyContent,
        userId,
        createdAt,
      });
      await replyComment.save();
      io.emit('sendReplyCommentToClient', replyComment);
    } else {
      console.log('createComment ');
      const newComment = new Comments({
        username,
        avatar,
        content,
        userId,
        createdAt,
      });
      await newComment.save();
      io.emit('sendCommentToClient', newComment);
    }
  });

  socket.on('disconnect', () => {
    console.log(socket.id + ' disconnected.');
    // users = users.filter((user) => user.userId !== socket.id);
  });
});

// Setting up cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const myserver = server.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

// Handle Unhandled Promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log('Shutting down the server due to Unhandled Promise rejection');
  myserver.close(() => {
    process.exit(1);
  });
});
