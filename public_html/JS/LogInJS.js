/* 
 * Student Info: Name=Bansari, ID=19473
 * Subject: CS557A_HW3_Spring_2017
 * Author: Bansari
 * Filename: LogIn.js
 * Date and Time: Mar 6, 2017 11:59:37 AM
 * Project Name: BansariPatel_19473_CS557A_HW3
 */

function btn_Submit_LogInPage_Onclick() {

    var UserName = document.getElementById("txt_UserName_LogInPage");
    var Password = document.getElementById("txt_Password_LogInPage");

    if (localStorage.getItem("User") === null) {

    } else {
        var UserDetails = JSON.parse(localStorage.getItem("User"));
        var UserFlag = false;
        for (var i = 0; i < UserDetails.length; i++) {
            if (UserDetails[i].UserName === UserName.value) {
                UserFlag = true;
                if (UserDetails[i].Password === Password.value) {
                    var CurrentLoginUser = [{"UserName": UserDetails[i].UserName, "LogInTime": Date(), "LogOutTime": "N/A"}];
                    localStorage.setItem("CurrentLoginUser", JSON.stringify(CurrentLoginUser));
                    alert("Successful login");
                    window.open("Game.html", "_self", false);
                    return;
                } else {
                    alert("Username and password don't match");
                    return;
                }
            }
        }
        if (UserFlag === false) {
            alert("User does not exist");
        }
    }
}

function btn_Cancel_LogInPage_Onclick() {
    document.getElementById("txt_UserName_LogInPage").value = "";
    document.getElementById("txt_Password_LogInPage").value = "";
}

function test() {
    var Details1 = {"UserName": "User1", "FirstName": "First1"};
    localStorage.setItem("User1", JSON.stringify(Details1));
    Details1 = [{"UserName": "User2", "FirstName": "First2"}];
    var tempDetails = JSON.parse(localStorage.getItem("User1"));
    Details1.push(tempDetails);
    alert(JSON.stringify(Details1));
    localStorage.setItem("User1", JSON.stringify(Details1));

    var UserDetails1 = JSON.parse(localStorage.getItem("User1"));
    for (var i = 0; i < UserDetails1.length; i++) {
        alert((UserDetails1[i].UserName));
    }

}

function logoutLink_Onclick() {
    localStorage.setItem("CurrentLoginUser", "");
}