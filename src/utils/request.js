import fetch from 'dva/fetch';
import { message } from 'antd';

function parseJSON(response) {
    return response.json();
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

function checkData(data) {
    
    if(data.code === 911){
        const { origin,pathname } = window.location

        message.error(data.msg);
        setTimeout(() => {
            window.location.href = `${origin}${pathname}#/login`
        },2000)
    }else{
        return { data }
    }
}

function queryParams(params) {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(options) {
    const method = options.method.toLocaleLowerCase()

    options.headers = options.headers ? options.headers : {}

    if(!options.url.includes('login')){
        options.headers.token = localStorage.getItem('token')
    }

    if(method == 'get'){
        if(options.data){
            const query = queryParams(options.data)
    
            options.url = `${options.url}?${query}`
        }
    }else if(method == 'post'){
        options.body = JSON.stringify(options.data)
        options.headers['Content-Type'] = 'application/json'
    }

    return fetch(options.url, options)
        .then(checkStatus)
        .then(parseJSON)
        .then(checkData)
        .catch(err => ({ err }));
}