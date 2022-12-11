

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

// request methods:
export const requestMethod = Object.freeze({
    get: 'GET',
    post: 'POST',
    put: 'PUT',
    delete: 'DELETE'
});

