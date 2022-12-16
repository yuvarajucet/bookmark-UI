import {userEndPoint,requestMethod} from './utility.js';

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

function doServerRequest(endPonit,method,data){
    $.ajax({
        url:rootUrl.rootURL+endPonit,
        method:method,
        contentType:'application/json',
        accept: 'application/json',
        data: JSON.stringify(data),
        success:function(responseData){
           $.notify(responseData.register_status.message,'Info');
        },
        error:function(responseData){
           $.notify(responseData.message,'error');
        }
    });
}