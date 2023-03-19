import {userEndPoint,requestMethod,rootUrl,validateLoginStatus} from '../utility.js';

window.onload = validateExistingSession();

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
    window.location.href = './bookmark/dashboard.html';
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
    var searchParam = new URLSearchParams(window.location.search);
    var queryPrameters = {};
    for (const [key,value] of searchParam) {
        queryPrameters[key] = value;
    }
    switch(queryPrameters.redirect){
        case 'yes':
            if (queryPrameters.expire != undefined && queryPrameters.expire){
                $.notify(queryPrameters.msg,'error');
            } else if(queryPrameters.redirect !== 'yes'){
                validateLoginStatus();   
            }
            break;
    }
}