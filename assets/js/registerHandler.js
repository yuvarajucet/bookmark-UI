import {doServerRequest,userEndPoint,requestMethod} from './utility.js';

$('#register').on('click',function(e){
    var username = $("#username").val();
    var email = $("#email").val();
    var password = $("#password").val();

    var userData = {
        "username":username,
        "email":email,
        "password":password
    };
    doServerRequest(userEndPoint.register,requestMethod.post,userData);
});