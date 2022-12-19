import {userEndPoint,requestMethod,rootUrl,showLoader,hideLoader} from '../utility.js';

var btnText = $('.registerText');
var loader = $('.loader');
$('#register').on('click',function(e){
    showLoader(btnText,loader);
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

function redirectPage(responseData){
    hideLoader(btnText,loader);
    if(responseData.register_status.status){
        window.location.href = '../../views/successPage.html?page=register&status='+responseData.register_status.status;
    } else{
        $.notify(responseData.register_status.message,'error');
    }
}

function doServerRequest(endPonit,method,data){
    $.ajax({
        url:rootUrl.rootURL+endPonit,
        method:method,
        contentType:'application/json',
        accept: 'application/json',
        data: JSON.stringify(data),
        success:function(responseData){
            redirectPage(responseData);
        },
        error:function(responseData){
           $.notify(responseData.responseJSON.message,'error');
        }
    });
}