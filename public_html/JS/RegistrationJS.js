/* 
 * Student Info: Name=Bansari, ID=19473
 * Subject: CS557A_HW2_Spring_2017
 * Author: Bansari
 * Filename: RegistrationJS.js
 * Date and Time: Feb 25, 2017 10:53:23 AM
 * Project Name: BansariPatel_19473_CS557A_HW2
 */


function btn_Submit_Register_Onclick() {
    var userName = document.getElementById("txt_UserName_Register");
    var firstName = document.getElementById("txt_FirstName_Register");
    var lastName = document.getElementById("txt_LastName_Register");
    var password = document.getElementById("txt_Password_Register");
    var repearPassword = document.getElementById("txt_RepeatPassword_Register");
    var emailAddress = document.getElementById("txt_EmailAddress_Register");
    var Gender = document.getElementsByName("radbtnName_Gender_Register");
    var GenderValue = "";
    if (/^\s*$/.test(userName.value)) {

    } else {

    }
    if (/^\s*$/.test(firstName.value)) {

    } else {

    }
    if (/^\s*$/.test(lastName.value)) {

    } else {

    }
    if (/^\s*$/.test(password.value)) {

    } else {

    }
    if (/^\s*$/.test(repearPassword.value)) {

    } else {

    }
    if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailAddress.value)) {

    } else {

    }

    if (/^\s*$/.test(password.value) && /^\s*$/.test(repearPassword.value)) {
        if (password.value == repearPassword.value) {

        } else {

        }
    } else {

    }

    if (Gender[0].checked) {
        GenderValue = "Male";
    } else if (Gender[1].checked) {
        GenderValue = "Female";
    } else {

    }

    var noOfUser = 0;
    if (localStorage.getItem("noOfUser") === null) {
        localStorage.setItem("noOfUser", 1);
        noOfUser = 1;
    } else {
        noOfUser = localStorage.getItem("noOfUser");
        localStorage.setItem("noOfUser", Number(noOfUser) + 1);
    }
    if (localStorage.getItem("User") === null) {
        var RegistrationDetails = [];
        var Details = {};
        Details.UserName = userName.value;
        Details.FirstName = firstName.value;
        Details.LastName = lastName.value;
        Details.Password = password.value;
        Details.EmailAddress = emailAddress.value;
        Details.Gender = GenderValue;
        RegistrationDetails.push(Details);
        //var Details = {"UserName": userName.value, "FirstName": firstName.value, "LastName": lastName.value, "Password": password.value, "EmailAddress": emailAddress.value, "Gender": GenderValue};
        localStorage.setItem("User", JSON.stringify(RegistrationDetails));
    } else {
        //var Details = [{"UserName": userName.value, "FirstName": firstName.value, "LastName": lastName.value, "Password": password.value, "EmailAddress": emailAddress.value, "Gender": GenderValue}];
        var Details = {};
        Details.UserName = userName.value;
        Details.FirstName = firstName.value;
        Details.LastName = lastName.value;
        Details.Password = password.value;
        Details.EmailAddress = emailAddress.value;
        Details.Gender = GenderValue;
        var RegistrationDetails = JSON.parse(localStorage.getItem("User"));
        RegistrationDetails.push(Details);
        localStorage.setItem("User", JSON.stringify(RegistrationDetails));
    }

    //var obj = JSON.parse(localStorage.getItem("User"));
    //alert(obj[0].UserName);

}

function txt_UserName_register_onChange(txtBxValue) {
    var noOfUser = localStorage.getItem("noOfUser");
    if (noOfUser != null) {
        var UserDetails = JSON.parse(localStorage.getItem("User"));
        var labelMsg = document.getElementById("lbl_UserNameAvailability_Msg_Register");
        labelMsg.innerHTML = "";

        for (var i = 0; i < UserDetails.length; i++) {
            if (txtBxValue.value === UserDetails[i].UserName) {
                labelMsg.innerHTML = "User name is taken";
            }
        }
    }
}

function btn_Cancel_Register_Onclick() {
    document.getElementById("txt_UserName_Register").value = "";
    document.getElementById("txt_FirstName_Register").value = "";
    document.getElementById("txt_LastName_Register").value = "";
    document.getElementById("txt_Password_Register").value = "";
    document.getElementById("txt_RepeatPassword_Register").value = "";
    document.getElementById("txt_EmailAddress_Register").value = "";
    document.getElementById("radbtn_Male_Register").checked = false;
    document.getElementById("radbtn_Female_Register").checked = false;
}