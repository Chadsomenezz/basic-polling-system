const socket = io();

//for button
btn_create = document.querySelector("#btn-create");
modal = document.querySelector("#modal")
btn_create.addEventListener("click",()=>{
    modal.style.display = "block";
})
modal.addEventListener("click",(e)=>{
    if (e.target.className === "modal") {
        modal.style.display = "none";
    }
})
//end for button


//polling container
const poll = {
    title:document.querySelector(".poll__container__title"),
    a:document.querySelector(".poll__container__letter__description__a"),
    b:document.querySelector(".poll__container__letter__description__b"),
    c:document.querySelector(".poll__container__letter__description__c"),
    d:document.querySelector(".poll__container__letter__description__d"),
    //score
    a_score:document.querySelector(".poll__container__letter__vote__a"),
    b_score:document.querySelector(".poll__container__letter__vote__b"),
    c_score:document.querySelector(".poll__container__letter__vote__c"),
    d_score:document.querySelector(".poll__container__letter__vote__d"),

}

//socket io
//get the value of the first time we visit the page
socket.on("pollingData",(pollingData)=>{
    poll.title.innerText = pollingData.title;
    poll.a.innerText = pollingData.a.description;
    poll.b.innerText = pollingData.b.description;
    poll.c.innerText = pollingData.c.description;
    poll.d.innerText = pollingData.d.description;

    poll.a_score.innerText = pollingData.a.count;
    poll.b_score.innerText = pollingData.b.count;
    poll.c_score.innerText = pollingData.c.count;
    poll.d_score.innerText = pollingData.d.count;
    //put the data into the poll

})


//create a poll and send it
const form = document.querySelector(".modal__question");

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const pollingData = {
        title:e.target[0].value,
        a:{description:e.target[1].value,count:0},
        b:{description:e.target[2].value,count:0},
        c:{description:e.target[3].value,count:0},
        d:{description:e.target[4].value,count:0},
    };
    socket.emit("createPoll",pollingData)
    form.reset();

})

//parse the newly created poll into the dom to all user
socket.on("newPoll",(pollingData)=>{
    poll.title.innerText = pollingData.title;
    poll.a.innerText = pollingData.a.description;
    poll.b.innerText = pollingData.b.description;
    poll.c.innerText = pollingData.c.description;
    poll.d.innerText = pollingData.d.description;

    poll.a_score.innerText = pollingData.a.count;
    poll.b_score.innerText = pollingData.b.count;
    poll.c_score.innerText = pollingData.c.count;
    poll.d_score.innerText = pollingData.d.count;
    //put the data into the poll
})

//Vote into the Poll
poll__container = document.querySelector(".poll__container");
poll__container.addEventListener("click",(e)=>{
    switch (e.target.id){
        case "a":
            socket.emit("updateScore",{letter:"a"});
            break;
        case "b":
            socket.emit("updateScore",{letter:"b"});
            break;
        case "c":
            socket.emit("updateScore",{letter:"c"});
            break;
        case "d":
            socket.emit("updateScore",{letter:"d"});
            break;
    }
})

//put the newly updated score into the dom
socket.on("updatedScore",pollingData=>{
    poll.title.innerText = pollingData.title;
    poll.a.innerText = pollingData.a.description;
    poll.b.innerText = pollingData.b.description;
    poll.c.innerText = pollingData.c.description;
    poll.d.innerText = pollingData.d.description;

    poll.a_score.innerText = pollingData.a.count;
    poll.b_score.innerText = pollingData.b.count;
    poll.c_score.innerText = pollingData.c.count;
    poll.d_score.innerText = pollingData.d.count;
    //put the data into the poll
})