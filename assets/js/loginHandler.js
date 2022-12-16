
import {userEndPoint,requestMethod,rootUrl} from './utility.js';

$('#loginbtn').on('click',function(e) {
    var userEmail = $('#email').val();
    var password = $('#password').val();
    var userData = {
        "email":decodeURI(userEmail),
        "password":password
    };
    doServerRequest(userEndPoint.login,requestMethod.post, userData);
});



function doServerRequest(endPonit,method,data){
    $.ajax({
        url:rootUrl.rootURL+endPonit,
        method:method,
        contentType:'application/json',
        accept: 'application/json',
        data: JSON.stringify(data),
        success:function(responseData){
           $.notify(responseData.message,'Info');
        },
        error:function(responseData){
           $.notify(responseData.message,'error');
        }
    });
}