var express = require('express')
var cors = require('cors')
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const scraper = require('./scraper')

const SERVER_USERNAME = "Room BOT";

const { addUserToRoom, getUserByIdFromRoom, deleteUserFromRoom, getUsersFromRoom, setRoomHostById, getTotalUsersInRoom, getHostIdFromRoom, deleteUserRoom, rooms } = require('./users')
const { RegisterUser, UserLogin, LoginStatus, UserLogout} = require('./controllers/user')
const { getCurrentTime } = require('./time')

var app = express()
var http = require('http').createServer(app)
const io = require("socket.io")(http, {
    cors: {
        origin: '*', 
    }
});
var corsOptions = {
    origin: '*', 
    optionsSuccessStatus: 200, 
    Credential : false,
    methods: ["GET", "POST"]
}


app.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
      credentials: true,
    })
  );
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 7 * 24 * 60 * 60,
    },
  })
);
app.get('/', function (req, res) {
    res.send('We Watch Server')
});



//API route

app.post("/register", RegisterUser);
app.post("/login", UserLogin );
app.post("/logout", UserLogout );
app.get("/login", LoginStatus );
app.get('/rooms', (req,res) => {
    res.send(rooms)
});
app.get('/api/search', cors(corsOptions), (req, res) => {
    scraper.youtube(req.query.q, req.query.key, req.query.pageToken)
        .then(x => res.json(x))
        .catch(e => res.send(e));
});


http.listen(5000, function () {
    console.log('Server Alive on 5000')
});

io.on('connection', function (socket) {

    socket.on('join', ({ username, roomId}, callback) => {
        const user = addUserToRoom(socket.id, username, roomId)
        socket.join(roomId)
        
        if (user.host) {
            io.to(socket.id).emit('server:promote-to-host');
            
        }

        io.to(roomId).emit('server:new-joiner', { username: SERVER_USERNAME, content: `${username} just entered the room!`, time: getCurrentTime(), isServer: true }); // emit to all in room

        io.to(roomId).emit('server:total-users', { totalUsers: getTotalUsersInRoom(roomId) }); // emit to all in room

        // socket.on('kick', ({ username }) => {
        //     const userToKick = getUserByUsernameFromRoom(username, roomId);
          
        //     if (userToKick) {
        //       io.to(userToKick.id).emit('server:message', { username: SERVER_USERNAME, content: 'You have been kicked from the room!', time: getCurrentTime(), isServer: true });
              
        //       deleteUserFromRoom(userToKick.id, roomId);
        //     }
        //   });
       

        socket.on("disconnect", () => {
            const wasHost = getUserByIdFromRoom(socket.id, roomId).host

            deleteUserFromRoom(socket.id, roomId)

            io.to(roomId).emit('server:disconnected', { username: SERVER_USERNAME, content: `${username} has left the party`, time: getCurrentTime(), isServer: true }); // emit to all in room          

            if (getTotalUsersInRoom(roomId) > 0 && wasHost) {
                let randomUser = getUsersFromRoom(roomId)[0]
                setRoomHostById(randomUser.id, roomId, true)
                io.to(randomUser.id).emit('server:promote-to-host');
            }

            if (getTotalUsersInRoom(roomId) > 0) {
                io.to(roomId).emit('server:total-users', { totalUsers: getTotalUsersInRoom(roomId) }); // emit to all in room
            } else {
                deleteUserRoom(roomId)
            }
        });
    });

    

    

    socket.on('client:request-sync', ({ roomId }) => {
        io.to(getHostIdFromRoom(roomId)).emit('server:request-host-data');
    });

    socket.on('client:host-data', ({ playing, currentTime, playbackRate, roomId }) => {
        socket.to(roomId).emit('server:host-data', { playing, currentTime, playbackRate })
    });

    socket.on('client:video-change', ({ videoCode, roomId }) => {
        socket.to(roomId).emit('server:video-change', { videoCode })
    });

    socket.on('client:seekTo', ({ username, currentTime, roomId }) => {
        socket.to(roomId).emit('server:seekTo', { username, currentTime, isServer: true })
    });

    socket.on('client:message', ({ username, content, roomId, isServer }) => {
        socket.to(roomId).emit('server:message', { username, content, time: getCurrentTime(), isServer })
    });

    socket.on('client:play', ({ roomId, username }) => {
        socket.to(roomId).emit('server:play', {username: SERVER_USERNAME, content: `${username} has resumed the video`, time: getCurrentTime(), isServer: true })
    });

    socket.on('client:pause', ({ roomId, username }) => {
        socket.to(roomId).emit('server:pause', {username: SERVER_USERNAME, content: `${username} has paused the video`, time: getCurrentTime(), isServer: true })
        
    });

    socket.on('client:update-playbackRate', ({ roomId, playbackRate }) => {
        socket.to(roomId).emit('server:update-playbackRate', { playbackRate })
    });

    
})