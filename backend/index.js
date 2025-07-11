const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const http = require("http");
const {Server} = require("socket.io");
const mainRouter = require("../backend/routes/main.router");
const userRouter = require("../backend/routes/user.router");
dotenv.config();

const yargs = require("yargs");
const {hideBin} = require("yargs/helpers");
const {initRepo} = require("./controllers/init");
const {addRepo} = require("./controllers/add");
const {commitRepo} = require("./controllers/commit");
const {pullRepo} = require("./controllers/pull");
const {pushRepo} = require("./controllers/push");
const {revertRepo} = require("./controllers/revert");

yargs(hideBin(process.argv))
    .command("start","Starts a new server",{},startServer)
    .command("init","Initialise a new repository",{},initRepo)
    .command("add <file>","Add a file to the repository",
        (yargs) => {
            yargs.positional("file",{
                describe: "File to add to the staging area",
                type: "string",
            })
        },
        (argv) => {
            addRepo(argv.file);
            console.log(argv.file);
        }
    )
    .command("commit <message>","Commit the staged files",
        (yargs) => {
            yargs.positional("message",{
                describe: "Commit message",
                type: "string",
            })
        },
        (argv) => {
            commitRepo(argv.message);
        }
    )
    .command("push", "Push commits to s3",{},pushRepo)
    .command("pull", "Pull commits to s3",{},pullRepo)
    .command(
        "revert <commitID>",
        "Revert to a specific commit",
        (yargs) => {
          yargs.positional("commitID", {
            describe: "Comit ID to revert to",
            type: "string",
          });
        },
        (argv) => {
          revertRepo(argv.commitID);
        }
      )
    .demandCommand(1,"You need at least one command")
    .help().argv;

function startServer(){
    const app = express();
    const PORT = process.env.PORT || 8080;

    app.use(bodyParser.json());
    app.use(express.json());
    app.use(cors({origin:'*'}));
    app.use("/",mainRouter);

    const MONGODB_URI = process.env.MONGODB_URI;

    const connectDB = async () => {
        try{
            const conn = await mongoose.connect(MONGODB_URI, {
                useNewUrlParser:true,
                useUnifiedTopology:true,
            });
            console.log(`MongoDB Connected: ${conn.connection.host}`);
        }catch(err){
            console.error(`MongoDB Connection Error: ${err.message}`);
            process.exit(1);
        }
    }

    connectDB();

    const httpServer = http.createServer(app);
    const io = new Server(httpServer,{
        cors: {
            origin: '*',
            methods: ['GET','POST'],
        }
    });

    //trial purpose - remove after
    user = "test";

    io.on("connection",(socket)=>{
        socket.on("joinRoom",(userId) => {
            user = userId;
            console.log("====");
            console.log(user);
            console.log("====");
            socket.join(userId);
        })
    })

    const db = mongoose.connection;

    db.once("open", async () => {
        console.log("CRUD Operations Called");
        //CRUD Opeartions
    })

    httpServer.listen(PORT,() => {
        console.log(`Server is running on ${PORT}`);
    })
}




