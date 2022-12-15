import {doServerRequest,userEndPoint,requestMethod} from './utility.js';

// send forget password link
$('#send').on('click',function(e) {
    var email = $('#email').val();
    var userData = {
        "email":email
    };
    doServerRequest(userEndPoint.sendForgetPasswordLink,requestMethod.post,userData);
});
