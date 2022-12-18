import { userEndPoint,requestMethod,rootUrl } from "../utility.js";

window.onload = validateToken()


function validateToken(){
    var searchParam = new URLSearchParams(window.location.search);
    var queryPrameters = {};
    for (const [key,value] of searchParam) {
        queryPrameters[key] = value;
    }
    if(queryPrameters.email != undefined && queryPrameters.Vkey != undefined) {
        var userEmail = queryPrameters.email;
        var vToken = queryPrameters.Vkey;
        var userData = {
            "email":userEmail,
            "VKey":vToken
        };
        doServerRequest(userEndPoint.verifyUser,requestMethod.get,userData);
    }
}


function addStatusArea(data){
    var textArea = $('.msg');
    if(data.status){
        textArea.css({
            'color':'green',
            'font-size':'30px'
        });
        textArea.html(data.message);
    } else{
        textArea.css({
            'color':'red',
            'font-size':'30px'
        });
        textArea.html(data.message);
    }
}



function doServerRequest(endPonit,method,data){
    $.ajax({
        url:rootUrl.rootURL+endPonit+"?email="+data.email+"&"+"Vkey="+data.VKey,
        method:method,
        success:function(responseData){
           addStatusArea(responseData)
        },
        error:function(responseData){
            addStatusArea(responseData.responseJSON)
        }
    });
}