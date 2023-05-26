// main file
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import multer from 'multer'
import dotenv from "dotenv"
import http from 'http'
import { Server } from "socket.io";


const app = express()
dotenv.config()
// error handler
import ErrorDeclare from './middleware/ErrorDeclare.js'
// import
import { Connect } from './connection/Connection.js'
import Routers from './model-controller/Routers.js'
import upload from './model-controller/file-upload/FileController.js'

//handle Uncaught Exception
process.on("uncaughtException", err => {
    console.log(`Error: ${err.message}`)
    process.exit(1)
})
// cors origin define
app.use(cors({ credentials: false }));
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true })) // parse application/x-www-form-urlencoded
app.use(express.json());
app.use(bodyParser.json()) // parse application/json

const httpServer = http.createServer(app);

// static folder
app.use("/public", express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!')
});
// app.use('/ecom', EcomRoutes);
app.use('/api', Routers)
app.use('/api', upload)

const io = new Server(
    httpServer,
    {
        cors: { origin: 'http://localhost:3000' }
    }
);
io.on("connection", (socket) => {
    // ...
    // console.log(socket.id);
    // socket.emit("hello", "world");
    // socket.on("hello1", (arg) => {
    //     console.log(arg); // world
    // });
});

// handle type : async Error
app.use(ErrorDeclare)
// Start server by listening to designated port and responding to all requests
const server = httpServer.listen(process.env.PORT || 6000, function () {
    Connect();
    console.log(`Server listening on port ${server.address().port}!`);
});
// handle type : unhandledRejection
process.on("unhandledRejection", err => {
    server.close(() => {
        process.exit(1)
    })
})
