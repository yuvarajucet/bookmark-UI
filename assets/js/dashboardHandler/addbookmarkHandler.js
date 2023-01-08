import { dashboardEndPoint, requestMethod, rootUrl} from '../utility.js';
import { createContainerAndAppend,doServerRequestForCategory } from './addbookmarklistHandler.js';

const userToken = $.cookie('userAuthToken');
const userId = $.cookie('userid');


$('#addBookmark').click(function(){
    var label = $('#label').val();
    var url = $('#url').val();
    var category = $('#catlist').val();
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


// create category section handler
$('#chkbox').change(function(){
    var inputBox = $('#catWrapper');
    if(this.checked){
        inputBox.css('display','block');
    } else{
        inputBox.css('display','none');
    }
});

//create category with input
$('#create').click(async function(){
    var categoryName = $('#createcat').val();
    var inputBox = $('#catWrapper');
    
    var catData = {
        "userId":userId,
        "categoryName":categoryName
    };
   var test = await doServerRequestForCreateCategory(catData);
    inputBox.css('display','none');
    var optionElement = $('option');
    if(optionElement.length > 0){
        optionElement.remove();
    }
    createAddPopUpContainer();
});



// create category section close


$('#add').click(function(){
    var element = $('.drop-down');
    var selectElement = $('.form-group').find('.catlist');
    if(selectElement.length > 0){
        selectElement.remove();
    }
    var optionElement = $('option');
    if(optionElement.length > 0){
        optionElement.remove();
    }
    //create category dropdown list
    var select = $("<select class='catlist' id='catlist'></select>");
    // select.append($("<option value='null'>Uncategorized</option>"));
    element.append(select);
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
    var element = $('.drop-down');
    var select = $('.catlist');
    var responseData = await makeServerRequestForCategory();
    var categoryList = responseData.data.userData;
    select.append($("<option value='null'>Uncategorized</option>"));
    for(let i=0;i< categoryList.length ;i++){
        var option = $("<option value="+categoryList[i].categoryId+">"+categoryList[i].categoryName+"</option>");
        select.append(option);
    }
    element.append(select);
};

function makeServerRequestForCategory(){
    return doServerRequestForCategory(userToken);
}

//after click add button in bookmark add pop up
function loadBookmarkList(data){
    createContainerAndAppend($('.products-area-wrapper'),data,'add');
    $('.popup-close').click();
}

// do server request for add bookmark

function doServerRequestForAddBookmark(bookmarkData){
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
            loadBookmarkList(responseData);
        },
        error:function(responseData){
          
        }
    });
}

function doServerRequestForCreateCategory(data){
    
    $.ajax({
        url: rootUrl.rootURL + dashboardEndPoint.createCategory,
        method: requestMethod.post,
        contentType:'application/json',
        headers:{
            'authorization':'Bearer '+userToken
        },
        data: JSON.stringify(data),
        success:function(responseData){
            //
        },
        error: function(responseData){
            //
        }
    });
}