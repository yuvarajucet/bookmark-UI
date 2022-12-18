
import {userEndPoint,requestMethod,rootUrl} from '../utility.js';

window.onloadstart = validateExistingSession();

$('#loginbtn').on('click',function(e) {
    var userEmail = $('#email').val();
    var password = $('#password').val();
    var userData = {
        "email":decodeURI(userEmail),
        "password":password
    };
    doServerRequest(userEndPoint.login,requestMethod.post, userData);
});


function redirectToDashboard(responseData){
    debugger;
    console.log(responseData);
    $.cookie('userid',responseData.data.userid,{
        expires: 15,
        path : '/',
        secure: true
    });
    $.cookie('userAuthToken',responseData.data.userData.authorization_token,{
        expires:15,
        path : '/',
        secure : true
    });
    window.location.href = './bookmark/home.html';
}

function doServerRequest(endPonit,method,data){
    $.ajax({
        url:rootUrl.rootURL+endPonit,
        method:method,
        contentType:'application/json',
        accept: 'application/json',
        data: JSON.stringify(data),
        success:function(responseData){
            if(responseData.status){
                redirectToDashboard(responseData);
            } else{
                $.notify(responseData.message,'Info');
            }
        },
        error:function(responseData){
            $.notify(responseData.responseJSON.message,'error');
        }
    });
}


function validateExistingSession(){
    var userId = $.cookie('userid');
    var userAuthToken = $.cookie('userAuthToken');
    console.log(userId,userAuthToken);
    if (userId != undefined && userAuthToken != undefined){
        window.location.href = './bookmark/home.html';
    }
}