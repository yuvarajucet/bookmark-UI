import {userEndPoint,requestMethod,rootUrl} from './utility.js';

// send forget password link
$('#send').on('click',function(e) {
    var email = $('#email').val();
    var userData = {
        "email":email
    };
    doServerRequest(userEndPoint.sendForgetPasswordLink,requestMethod.post,userData);
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
            $.notify(responseData.responseJSON.message,'error');
        }
    });
}