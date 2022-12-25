import { dashboardEndPoint, requestMethod, rootUrl} from '../utility.js';
import { doServerRequestForCategory } from './addbookmarklistHandler.js';

const userToken = $.cookie('userAuthToken');
const userId = $.cookie('userid');



$('#add').click(function(){
    createAddPopUpContainer();
    $('.wrapper').fadeIn(500);
    $('.popup-box').removeClass('transform-out').addClass('transform-in');
    //createAddPopUpContainer();
    //showAddPopupContainer();
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
    select.append($("<option>Uncategorized</option>"));
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

function showAddPopupContainer(isEnable){
    if(isEnable){

    } else{

    }
}