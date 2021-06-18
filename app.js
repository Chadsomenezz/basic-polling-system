const express = require("express");
const app = express();
const server = app.listen(3000,()=>console.log("listening at port 3000"))
const io = require("socket.io")(server);

//Assume this data came from the Database
global.pollingData = {
    title:"Default Title",
    a:{description:"Default Description",count:0},
    b:{description:"Default Description",count:0},
    c:{description:"Default Description",count:0},
    d:{description:"Default Description",count:0}
};

app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"));
app.set("views",__dirname + "/views")
app.set("view engine","ejs");


const homeRoute = require("./router/homeRoute")
app.use(homeRoute);

io.on("connection",(socket)=>{
    socket.emit("pollingData",pollingData)

    //create the form then post it to all user in real time
    socket.on("createPoll",createPoll=>{
        global.pollingData = createPoll;
        io.emit("newPoll",createPoll)
    })

    //update the score  and then send the newly updated data
    socket.on("updateScore",updateScore=>{
        switch (updateScore.letter){
            case "a":
                pollingData.a.count++;
                break;
            case "b":
                pollingData.b.count++;
                break;
            case "c":
                pollingData.c.count++;
                break;
            case "d":
                pollingData.d.count++;
                break;
        }
        io.emit("updatedScore",pollingData)
    })
})