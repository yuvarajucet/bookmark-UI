import {rootUrl,userEndPoint,requestMethod} from './utility.js';

$('#loginbtn').on('click',function(e) {
    var userEmail = $('#email').val();
    var password = $('#password').val();
    var userData = {
        email:decodeURI(userEmail),
        password:password
    };
    doServerRequest(userEndPoint.login,requestMethod.post, userData);
});


// common method to handle all the request for API
function doServerRequest(endPonit,method,data){
    $.ajax({
        url:rootUrl.rootURL+endPonit,
        method:method,
        contentType:'application/json',
        accept: 'application/json',
        data: JSON.stringify(data),
        success:function(responseData){
            // do the process for redirect into dashboard page
            alert(responseData.message);
        },
        error:function(responseData){
            alert(responseData.message);
        }
    });
}