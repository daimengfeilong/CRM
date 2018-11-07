import fetch from 'dva/fetch';
import { Message } from 'antd';

function parseJSON(response) {
    return response.json();
}

function checkStatus(response) {
    const token = response.headers.get('authorization')

    //更新token
    if (token) localStorage.setItem('token', token);

    if (response.status == 200) {
        return response;
    }
    Message.error(`${response.status} (${response.statusText})`);
    return Promise.reject();
}

function checkData(data) {
    if(data.code === '9999'){
        Message.error(data.msg);
    }else if(data.code === '9997'){
        const { origin,pathname } = window.location

        Message.error(data.msg,2,() => {
            window.location.href = `${origin}${pathname}#/login`
        })
    }
    
    return data
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
export default async function request(options) {
    const { hash } = window.location
    const method = options.method.toLocaleLowerCase()

    options.headers = options.headers ? options.headers : {}

    if(hash !== '#/login' && hash !== '#/'){
        options.headers.Authorization = localStorage.getItem('token')
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

    const request = await fetch(options.url, options)
    const checked = await checkStatus(request)
    const json = await parseJSON(checked)
    const data = await checkData(json)

    return data

}