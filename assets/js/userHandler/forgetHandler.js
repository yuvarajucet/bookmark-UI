import {userEndPoint,requestMethod,rootUrl,showLoader,hideLoader} from '../utility.js';

var sendText = $('.registerText');
var loader = $('.loader');
// send forget password link
$('#register').on('click',function(e) {
    showLoader(sendText,loader);
    debugger;
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
           hideLoader(sendText,loader);
        },
        error:function(responseData){
            $.notify(responseData.responseJSON.message,'error');
        }
    });
}