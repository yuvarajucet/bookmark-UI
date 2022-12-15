import {doServerRequest,userEndPoint,requestMethod} from './utility.js';

window.onload = validateToken();

function validateToken(){
    var searchParam = new URLSearchParams(window.location.search);
    var queryPrameters = {};
    for (const [key,value] of searchParam) {
        queryPrameters[key] = value;
    }
    if(queryPrameters.email != undefined && queryPrameters.vToken != undefined) {
        addForgetPasswordArea();
    } else {
        addForgetExpireArea();
    }
}

function addForgetPasswordArea(){
    var rootElement = $('#limiter');
    var forgetContainer = $("<div class='container-register'></div>");
    var forgetWrapper = $("<div class='wrap-register'></div>");
    var imgWrapper = $("<div class='register-pic js-tilt'></div>");
    var img = $("<img src='../assets/img/rocket.png' alt='IMG'>");
    
    //forget password form
    var form = $("<div class='register-from validate-form'></div>");
    
    var title = $("<span class='register-form-title'>Reset password</span>");
    // new password field:
    var passwordField = createInputBoxWithInput('password','New password','password','fa fa-key');
    var confirmPasswordField = createInputBoxWithInput('confirmpassword','confirm password','confirmpassword','fa fa-key');

    //button
    var btnWrapper = $("<div class='container-register-from-btn'></div>");
    var button = $("<button class='register-form-btn' id='send'>Reset password</button>");
    btnWrapper.append(button);
    // go to login link
    var wrapper = $("<div class='text-center p-t-136'></div>");
    var link = $("<a class='txt2' href='./login.html'>Go to Login</a>");
    var icon = $("<i class='fa fa-long-arrow-right m-1-5' aria-hidden='true'></i>");

    link.append(icon);
    wrapper.append(link);
    
    //push all the elements into the form:
    form.append(title);
    form.append(passwordField);
    form.append(confirmPasswordField);
    form.append(btnWrapper);

    imgWrapper.append(img);
    forgetWrapper.append(form);
    forgetWrapper.append(imgWrapper);
    forgetContainer.append(forgetWrapper);
    rootElement.append(forgetContainer);
}

function addForgetExpireArea(){
    var rootElement = $('#limiter');
    var forgetContainer = $("<div class='container-register'></div>");
    var forgetWrapper = $("<div class='wrap-register'></div>");
    var imgWrapper = $("<div class='register-pic js-tilt'></div>");
    var img = $("<img src='../assets/img/rocket.png' alt='IMG'>");

    //forget password form
    var form = $("<div class='register-from validate-form'></div>");
    var title = $("<span class='register-form-title'>Reset password</span>");
    var errorMessage = $("<div  class='text-center' style='color:red'>Please provied token and email address</div>");

    form.append(title);
    form.append(errorMessage);
    imgWrapper.append(img);
    forgetWrapper.append(form);
    forgetWrapper.append(imgWrapper);
    forgetContainer.append(forgetWrapper);
    rootElement.append(forgetContainer);
}

function createInputBoxWithInput(name,placeholder,id,iconclass){
    var wrapper = $("<div class='wrap-input validate-input'></div>");
    var inputBox = $("<input class='input' type='password' name='"+name+"' placeholder='"+placeholder+"' id='"+id+"' autocomplete=off>");
    var boxfocus = $("<span class='focus-input'></span>");
    var symble = $("<span class='symbol-input'><span>");
    var icon = $("<i class='"+iconclass+"' aria-hidden='true'></i>");
    symble.append(icon);
    wrapper.append(inputBox);
    wrapper.append(boxfocus);
    wrapper.append(symble);
    return wrapper;
}