// master root url
export const rootUrl = Object.freeze({
    rootURL: 'http://127.0.0.1:8000'
});

// User API endpoints
export const userEndPoint = Object.freeze({
    login: '/api/v1/user/login',
    register: '/api/v1/user/register',
    verifyUser: '/api/v1/user/verifyuser',
    sendForgetPasswordLink: '/api/v1/user/sendforgetpasswordlink',
    updatePassword: '/api/v1/user/forgetpassword',
});

// Dashboard API endpoints

export const dashboardEndPoint = Object.freeze({
    getAllBookmark : '/api/v1/bookmark/getallbookmark',
    addBookmark : '/api/v1/bookmark/addnewbookmark',
    editBookmark : '/api/v1/bookmark/editbookmark',
    deleteBookmark : '/api/v1/bookmark/deletebookmark',
    getAllCategory :'/api/v1/bookmark/getallcategory',
    createCategory : '/api/v1/bookmark/createcategory',
    deleteCategory : '/api/v1/bookmark/deletecategory'
});

// request methods:
export const requestMethod = Object.freeze({
    get: 'GET',
    post: 'POST',
    put: 'PUT',
    delete: 'DELETE'
});

export function showLoader(element,loader){
    element.css('display','none');
    loader.html("<img src='../../assets/img/book.gif' height=60px width=80px alt='loading...'/>");
}

export function hideLoader(element,loader){
    element.css('display','block');
    loader.css('display','none');
}


export function validateLoginStatus(){
    var userid = $.cookie('userid');
    var auth = $.cookie('userAuthToken');
    if(userid != undefined && userid != "null" && auth != undefined && auth != "null"){
        window.location.href = '../../../views/bookmark/dashboard.html';
    } else{
        window.location.href = '../../../views/login.html?redirect=yes';
    }
}