import { dashboardEndPoint, requestMethod, rootUrl} from '../utility.js';
import { doServerRequestForCategory } from './addbookmarklistHandler.js';

const userToken = $.cookie('userAuthToken');
const userId = $.cookie('userid');


$('#addBookmark').click(function(){
    var label = $('#label').val();
    var url = $('#url').val();
    var category = $('#list').val();
    var userData = {};
    if(category != 'null'){
        userData = {
            'userId':userId,
            'categoryId':category,
            'label':label,
            'url':url
        }
    }
    else{
        userData = {
            'userId':userId,
            'label':label,
            'url':url
        }
    }
    doServerRequestForAddBookmark(userData);
});

$('#add').click(function(){
    createAddPopUpContainer();
    $('.wrapper').fadeIn(500);
    $('.popup-box').removeClass('transform-out').addClass('transform-in');
});

$('.close-button').click(function(){
    $('.input').val('');
});

$('.popup-close').click(function() {
    $('.wrapper').fadeOut(500);
    $('.popup-box').removeClass('transform-in').addClass('transform-out');
});

async function createAddPopUpContainer(){
    var selectElement = $('.form-group').find('.list');
    if(selectElement.length > 0){
        selectElement.remove();
    }
    var element = $('.drop-down');
    //create category dropdown list
    var select = $("<select class='list' id='list'></select>");
    select.append($("<option value='null'>Uncategorized</option>"));
    var responseData = await makeServerRequestForCategory();
    var categoryList = responseData.data.userData;
    for(let i=0;i< categoryList.length ;i++){
        var option = $("<option value="+categoryList[i].categoryId+">"+categoryList[i].categoryName+"</option>");
        select.append(option);
    }
    element.append(select);
};

function makeServerRequestForCategory(){
    return doServerRequestForCategory(userToken);
}


// do server request for add bookmark

function doServerRequestForAddBookmark(bookmarkData){
    debugger;
    $.ajax({
        url : rootUrl.rootURL+ dashboardEndPoint.addBookmark,
        method: requestMethod.post,
        contentType:'application/json',
        accept: 'application/json',
        headers:{
            'authorization':'Bearer '+userToken
        },
        data :JSON.stringify(bookmarkData),
        success:function(responseData){
            
        },
        error:function(responseData){
          
        }
    });
}