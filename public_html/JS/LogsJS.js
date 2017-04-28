/* 
 * Student Info: Name=Bansari, ID=19473
 * Subject: CS557A_HW3_Spring_2017
 * Author: Bansari
 * Filename: LogsJS.js
 * Date and Time: Mar 6, 2017 3:56:07 PM
 * Project Name: BansariPatel_19473_CS557A_HW3
 */

window.onload = function () {
    userLogDetails();
}

function userLogDetails() {
    var userLog = JSON.parse(localStorage.getItem("userLog"));
    if (userLog != null) {
        var table = document.createElement('table');
        var tr = document.createElement('tr');

        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var td4 = document.createElement('td');
        var td5 = document.createElement('td');

        var text1 = document.createTextNode('Player Name');
        var text2 = document.createTextNode('Start Date and Time');
        var text3 = document.createTextNode('End Date and Time');
        var text4 = document.createTextNode('Game Word');
        var text5 = document.createTextNode('Result');


        td1.appendChild(text1);
        td2.appendChild(text2);
        td3.appendChild(text3);
        td4.appendChild(text4);
        td5.appendChild(text5);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);


        table.appendChild(tr);
        for (var i in userLog) {
            var tr = document.createElement('tr');

            td1 = document.createElement('td');
            td2 = document.createElement('td');
            td3 = document.createElement('td');
            td4 = document.createElement('td');
            td5 = document.createElement('td');

            text1 = document.createTextNode(userLog[i].UserName);
            text2 = document.createTextNode(userLog[i].StartDateTime);
            text3 = document.createTextNode(userLog[i].EndDateTime);
            text4 = document.createTextNode(userLog[i].SelectedWord);
            text5 = document.createTextNode(userLog[i].Result);


            td1.appendChild(text1);
            td2.appendChild(text2);
            td3.appendChild(text3);
            td4.appendChild(text4);
            td5.appendChild(text5);

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            
            table.appendChild(tr);
        }
        document.body.appendChild(table);
    }
}

