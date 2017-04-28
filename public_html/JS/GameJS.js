/* 
 * Student Info: Name=Bansari, ID=19473
 * Subject: CS557A_HW3_Spring_2017
 * Author: Bansari
 * Filename: gameJavascript.js
 * Date and Time: Feb 21, 2017 1:40:55 PM
 * Project Name: BansariPatel_19473_CS557A_HW3
 */


var randomWords = new Array("APPLE", "KIWI", "PINEAPPLE", "AVOCADO", "BANANA", "ORANGE", "STRAWBERRY", "POMEGRANATE", "APRICOT", "COCONUT", "MUSKMELON");

var currentSelectedWord = [];
var AnswerWord;
var gameResult = "";
var minute_left = 3;
var seconds_left = 00;
var timerFlag = false;
var interval = "";

var seconds_left_Ad = 30;
var interval_Ad = "";

var imageArray = new Array("../Images/Advertisement01.png", "../Images/Advertisement02.png", "../Images/Advertisement03.png");

function setTimer() {
    interval = setInterval(function () {
        timerFlag = true;
        if (seconds_left == 0) {
            minute_left--;
            seconds_left = 60;
        }
        document.getElementById('lbl_Timer').innerHTML = minute_left + ":" + --seconds_left;

        if (seconds_left <= 0 && minute_left <= 0)
        {
            setEndDateTimeAndResult("Lost");
            window.alert("Time Over!!!");
            clearTimer();
            btn_NewGame_gamePage_Onclick();
        }
    }, 1000);
}

function clearTimer() {
    clearInterval(interval);
    timerFlag = false;
    var QueDiv = document.getElementById("outerQueDiv");
    var AnsDiv = document.getElementById("outerAnsDiv");
    QueDiv.parentElement.removeChild(QueDiv);
    AnsDiv.parentElement.removeChild(AnsDiv);
}

window.onload = function () {
    btn_NewGame_gamePage_Onclick();
    setAdvertisementTimer();
    setTimer();
}

function handleDragStart(e) {
    e.dataTransfer.setData("text", this.id);
}
function handleDragEnterLeave(e) {

    if (e.type == "dragenter") {
        //this.className += "drag-enter";
    } else {
        //this.className += "";
    }
}
function handleOverDrop(e) {
    if (this.childNodes.length != 0) {
        return;
    }
    e.preventDefault();
    if (e.type != "drop") {
        return;
    }

    var draggedId = e.dataTransfer.getData("text");
    var draggedEl = document.getElementById(draggedId);
    //if (draggedEl.parentNode.parentNode.id != this.parentNode.parentNode.id) { 
    if (draggedEl.parentNode == this) {
        return;
    }

    draggedEl.parentNode.removeChild(draggedEl);
    this.appendChild(draggedEl);
    //this.className = "";
    //}
    if (this.id.substring(0, 10) == "maindivAns") {
        var index = this.id.substring(10, 11);
        AnswerWord[index] = this.childNodes[0].innerHTML;
    }
    checkAnswer();
}

function checkAnswer() {
    var flag = true;
    var check = currentSelectedWord.map(function (element, index) {
        if (element != AnswerWord[index]) {
            flag = false;
            return;
        }
    });
    if (flag == true) {
        setEndDateTimeAndResult("Won");
        alert("win");
        clearTimer();
        btn_NewGame_gamePage_Onclick();
    }
}

function btn_NewGame_gamePage_Onclick() {

    if (timerFlag == true) {
        var userDecision = confirm("Do you want to quit the game?");
        if (userDecision == true) {
            btn_QuitGame_gamePage_Onclick();
        }
        return;
    }

    setTimer();
    var currentUser = "";
    if (localStorage.getItem("CurrentLoginUser") != null) {
        currentUser = JSON.parse(localStorage.getItem("CurrentLoginUser"));
    }
    if (currentUser === null || currentUser === "") {
        alert("You must login to play.");
        return;
        //window.open("Login.html", "_self", false);
    }

    currentSelectedWord = randomWords[Math.floor(Math.random() * randomWords.length)].split("");
    var startDateTime = currentDateTime();

    var userLog = {};
    userLog.UserName = currentUser[0].UserName;
    userLog.StartDateTime = startDateTime;
    userLog.EndDateTime = "";
    userLog.SelectedWord = currentSelectedWord.join("");
    userLog.Result = "";

    if (localStorage.getItem("userLog") === null) {
        //var userLog = {"UserName": currentUser[0].UserName, "StartDateTime": startDateTime, "EndDateTime": "", "SelectedWord": currentSelectedWord.join(""), "Result": ""};
        var userLogArray = [];
        userLogArray.push(userLog);
        localStorage.setItem("userLog", JSON.stringify(userLogArray));
    } else {
        //var userLog = [{"UserName": currentUser[0].UserName, "StartDateTime": startDateTime, "EndDateTime": "", "SelectedWord": currentSelectedWord.join(""), "Result": ""}];
        var userLogArray = JSON.parse(localStorage.getItem("userLog"));
        userLogArray.push(userLog);
        localStorage.setItem("userLog", JSON.stringify(userLogArray));
    }

    var selectedWord = [];
    for (var i = 0; i < currentSelectedWord.length; i++) {
        selectedWord.push(currentSelectedWord[i]);
    }
    AnswerWord = new Array(selectedWord.length);
    selectedWordShuffled = shuffle(selectedWord);
    var div_Question_gamePage = document.getElementById("div_Question_gamePage");
    var div_Answer_gamePage = document.getElementById("div_Answer_gamePage");
    var outerQueDiv = document.createElement("DIV");
    outerQueDiv.id = "outerQueDiv";
    div_Question_gamePage.appendChild(outerQueDiv);
    var outerAnsDiv = document.createElement("DIV");
    outerAnsDiv.id = "outerAnsDiv";
    div_Answer_gamePage.appendChild(outerAnsDiv);

    for (var i = 0; i < selectedWord.length; i++) {
        var maindivQue = document.createElement("DIV");
        var divQue = document.createElement("DIV");
        var text = document.createTextNode(selectedWordShuffled[i]);
        //text.setAttribute('class', 'puzzleText');
        maindivQue.id = "maindivQue" + i.toString();
        divQue.id = "div" + i.toString();
        divQue.appendChild(text);
        divQue.draggable = true;
        maindivQue.setAttribute('data-drop-target', 'true');
        //div.data-drop-target = "true";
        maindivQue.style.width = (80 / selectedWord.length) + "%";
        //maindivQue.style.height = (100 - (selectedWord.length * 2)) + "%";
        //alert(maindivQue.offsetWidth);

        maindivQue.className = "mainQueDiv";
        divQue.style.height = "100%";
        divQue.style.width = "100%";
        divQue.style.display = 'inline-block';
        maindivQue.appendChild(divQue);
        outerQueDiv.appendChild(maindivQue);
        if (maindivQue.offsetHeight < maindivQue.offsetWidth) {
            maindivQue.style.fontSize = (maindivQue.offsetHeight - 10) + "px";
        } else {
            maindivQue.style.fontSize = (maindivQue.offsetWidth - 10) + "px";
        }
        //alert(maindivQue.offsetWidth);
        //div.addEventListener("dragstart", handleDragStart);
    }
    //document.body.appendChild(outerQueDiv);
    for (var i = 0; i < selectedWord.length; i++) {
        //var maindiv = document.createElement("DIV");
        var maindivAns = document.createElement("DIV");
        maindivAns.id = "maindivAns" + i.toString();
        //var divAns = document.createElement("DIV");
        //var text = document.createTextNode("");
        //divAns.id = "div1" + i.toString();
        //divAns.appendChild(text);
        //divAns.draggable = true;
        maindivAns.setAttribute('data-drop-target', 'true');
        maindivAns.className = "mainAnsDiv";
        maindivAns.style.width = (80 / selectedWord.length) + "%";
        //maindivAns.style.height = (100 - (selectedWord.length * 2)) + "%";
        // divAns.style.height = "50px";
        //divAns.style.width = "50px";
        //maindivAns.appendChild(divAns);
        outerAnsDiv.appendChild(maindivAns);
        if (maindivAns.offsetHeight < maindivAns.offsetWidth) {
            maindivAns.style.fontSize = (maindivAns.offsetHeight - 10) + "px";
        } else {
            maindivAns.style.fontSize = (maindivAns.offsetWidth - 10) + "px";
        }
        //div.addEventListener("dragstart", handleDragStart);
        //div.addEventListener("dragover", handleOverDrop);
        //div.addEventListener("drop", handleOverDrop);
    }
    //document.body.appendChild(outerAnsDiv);

    var draggable = document.querySelectorAll("[draggable]");
    var targets = document.querySelectorAll("[data-drop-target]");
    for (var i = 0; i < draggable.length; i++) {
        draggable[i].addEventListener("dragstart", handleDragStart);
    }
    for (i = 0; i < targets.length; i++) {
        targets[i].addEventListener("dragover", handleOverDrop);
        targets[i].addEventListener("drop", handleOverDrop);
        targets[i].addEventListener("dragenter", handleDragEnterLeave);
        targets[i].addEventListener("dragleave", handleDragEnterLeave);
    }
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

// Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function btn_QuitGame_gamePage_Onclick() {
    setEndDateTimeAndResult("Cancelled");
    clearTimer();
    btn_NewGame_gamePage_Onclick();

}

function setEndDateTimeAndResult(Result) {
    if (localStorage.getItem("userLog") != null) {
        var endDateTime = currentDateTime();
        var userLogDetails = JSON.parse(localStorage["userLog"]);
        var userLogLength = JSON.parse(localStorage["userLog"]).length - 1;
        userLogDetails[userLogLength].EndDateTime = endDateTime;
        userLogDetails[userLogLength].Result = Result;
        localStorage["userLog"] = JSON.stringify(userLogDetails);
    }
}

function currentDateTime() {
    var DateTime = new Date();
    var hours = DateTime.getHours();
    var minutes = DateTime.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return ((DateTime.getMonth() + 1) + "/"
            + DateTime.getDate() + "/"
            + DateTime.getFullYear() + " "
            + strTime);
}

function setAdvertisementTimer() {
    var randomImage = Math.floor(Math.random() * imageArray.length);
    var prevImage = randomImage;
    var image = document.createElement('img');
    image.src = imageArray[randomImage];
    var aside = document.getElementById("div_aside");
    aside.appendChild(image);

    interval_Ad = setInterval(function () {
        if (seconds_left_Ad == 0) {
            while (prevImage == randomImage) {
                randomImage = Math.floor(Math.random() * imageArray.length);
            }
            prevImage = randomImage;
            aside.removeChild(image);
            image = document.createElement('img');
            image.src = imageArray[randomImage];
            aside.appendChild(image);

            seconds_left_Ad = 30;
        } else {
            seconds_left_Ad--;
        }


    }, 1000);
}
