/* 
 * Student Info: Name=Bansari, ID=19473
 * Subject: CS557A_HW3_Spring_2017
 * Author: Bansari
 * Filename: commonJS.js
 * Date and Time: Mar 7, 2017 12:30:34 PM
 * Project Name: BansariPatel_19473_CS557A_HW3
 */

var seconds_left = 30;
var interval = "";

var imageArray = new Array("../Images/Advertisement01.png", "../Images/Advertisement02.png", "../Images/Advertisement03.png");

window.onload = function () {

    setTimer();
}

function setTimer() {
    var randomImage = Math.floor(Math.random() * imageArray.length);
    var prevImage = randomImage;
    var image = document.createElement('img');
    image.src = imageArray[randomImage];
    var aside = document.getElementById("div_aside");
    aside.appendChild(image);

    interval = setInterval(function () {
        if (seconds_left == 0) {
            while (prevImage == randomImage) {
                randomImage = Math.floor(Math.random() * imageArray.length);
            }
            prevImage = randomImage;
            aside.removeChild(image);
            image = document.createElement('img');
            image.src = imageArray[randomImage];
            aside.appendChild(image);

            seconds_left = 30;
        } else {
            seconds_left--;
        }


    }, 1000);
}
