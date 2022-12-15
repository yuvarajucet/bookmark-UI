
import {doServerRequest,userEndPoint,requestMethod} from './utility.js';

$('#loginbtn').on('click',function(e) {
    var userEmail = $('#email').val();
    var password = $('#password').val();
    var userData = {
        "email":decodeURI(userEmail),
        "password":password
    };
    doServerRequest(userEndPoint.login,requestMethod.post, userData);
});