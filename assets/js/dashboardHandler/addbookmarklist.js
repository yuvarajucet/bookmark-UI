import { dashboardEndPoint, requestMethod, rootUrl,validateLoginStatus} from '../utility.js';

var userAuthenToken = null;

window.onload = validateUserLogin();


$('.account-info-more').click(function() {
    $.cookie("userid", null, { path: '/' });
    $.cookie("userAuthToken", null, { path: '/' });
    window.location.href = '../../../views/login.html?redirect=yes';
});

function validateUserLogin() {
    var userid = $.cookie('userid');
    var auth = $.cookie('userAuthToken');
    if ((userid === undefined || userid === "null") || (auth === undefined || auth === "null")) {
        window.location.href = '../../../views/login.html?redirect=yes';
    } else {
        userAuthenToken = $.cookie('userAuthToken');
        doServerRequest(userAuthenToken);
    }
}

function handleResponseData(respData){
    var app_container = $('.products-area-wrapper');
    if(respData.status){
        createContainerAndAppend(app_container,respData.data);
    }
}


function createContainerAndAppend(app_container,serverData){
    var userData = serverData.userData;
    for(let i=0;i<userData.length;i++){
        var categoryValue = userData[i].categoryName !== null ? userData[i].categoryName : 'un-categorized';
        var bookmarks = userData[i].bookmarks;
        var randomColor = '#'+ ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6);
        if(bookmarks.length > 0){
            for(let j=0;j<bookmarks.length;j++){
                var category = $("<div style='color:"+randomColor+"' class='product-cell category' categoryid="+userData[i].categoryId+">"+categoryValue+"</div>");
                var product_row = $("<div class='products-row'></div>");
                var imageWrapper = $("<div class='product-cell image'></div>");
                var logo = $("<img src='data:image/png;base64,"+bookmarks[j].icon+"' alt='Site logo'>");
                var label = $("<div class='product-cell status-cell' bookmarkid="+bookmarks[j].bookmarkId+">"+bookmarks[j].label+"</div>");
                var URL = $("<div class='product-cell sales'>"+bookmarks[j].url+"</div>");
                var Navigate = $("<div class='product-cell stock'><a href='"+bookmarks[j].url+"' target='_blank'>"+bookmarks[j].label+"</a> </div>");
                imageWrapper.append(logo);
                product_row.append(imageWrapper);
                product_row.append(category);
                product_row.append(label);
                product_row.append(URL);
                product_row.append(Navigate);
                app_container.append(product_row);
            }
        }
    }
}


export async function loadCategoryList(status){
    if(status){
        var responseData = await doServerRequestForCategory(userAuthenToken);
        if(responseData.status){
            var rootContainer = $('.filter-button-wrapper');
            $('.filter-menu').remove();
            var container = $("<div class='filter-menu active'></div>");
            var label = $("<label>Category</label>");
            var select = $("<select></select>");
            select.append($("<option value='default'>--select--</option>"));
            var categoryList = responseData.data.userData;
            for(let i=0;i< categoryList.length ;i++){
                var option = $("<option value="+categoryList[i].categoryId+">"+categoryList[i].categoryName+"</option>");
                select.append(option);
            }
            var buttonsWrapper = $("<div class='filter-menu-buttons'></div>");
            var resetBtn = $("<button class='filter-button reset'>reset</button>");
            var applyBtn = $("<button class='filter-button apply'>apply</button>");
            container.append(label);
            container.append(select);
            container.append(buttonsWrapper);
            buttonsWrapper.append(resetBtn);
            buttonsWrapper.append(applyBtn);
            rootContainer.append(container);
        }
    }
}



function doServerRequest(userAuthenToken) {
    $.ajax({
        url: rootUrl.rootURL + dashboardEndPoint.getAllBookmark,
        method: requestMethod.get,
        contentType: 'application/json',
        headers: {
            'authorization': 'Bearer '+ userAuthenToken
        },
        success: function (responseData) {
           handleResponseData(responseData);
        },
        error: function (responseData) {
            console.log(responseData);
            debugger;
        }
    });
}

function doServerRequestForCategory(userAuthenToken){
    return $.ajax({
        url:rootUrl.rootURL+dashboardEndPoint.getAllCategory,
        method:requestMethod.get,
        contentType:'application/json',
        headers:{
            'authorization':'Bearer '+userAuthenToken
        }
    });
}