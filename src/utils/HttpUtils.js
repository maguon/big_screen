/* eslint-disable eqeqeq */
import { getLocalItem } from './LocalUtils';
const httpHeaders = require('./HttpHeaders');


export const httpAsyncFormPost = (url, formData, success, fail) => {
    //$("#preload").show();
    return fetch('http://' + url, {
        method :"POST",
        headers: httpHeaders.getFormHeaders(),
        body: formData
    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            return response.json();
        }
    }).then(error => {
        return error;
    }).catch((error) => {
        return error;
    })
};

const simpleFetchFile = (method, url,filename, params) => {
    let options = {
        method: method,
        headers: httpHeaders.getHeaders()
    };
    if ('GET' != method) {
        options.body = JSON.stringify(params)
    }
    return fetch('http://' + url, options).then((response) => {
        response.blob().then(blob=>{
            const blobUrl =  window.URL.createObjectURL(blob);
            const hrefEle = document.createElement("a");
            
            hrefEle.href = blobUrl;
            hrefEle.download = filename;
            hrefEle.click();
            window.URL.revokeObjectURL(blobUrl);
        })
    }).catch( (error) =>{return error;});
}
const simpleFetch = (method, url, params) => {
    //$("#preload").show();
    //console.log(getLocalItem('auth-token'));
    const headers = {
        "Content-Type": "application/json;charset=UTF-8",
        "auth-token": getLocalItem('auth-token')
    };
    let options = {
        method: method,
        headers: headers
    };
    if ('GET' != method) {
        options.body = JSON.stringify(params)
    }
    //console.log(options)
    return fetch('http://' + url, options).then((response) => {
        //$("#preload").hide();

        // http 正常处理，则返回response，否则进入catch 处理
        if (response.ok) {
            return response.json();
        } else {
            return response.json();
        }
    }).catch(function (error) {
        //$("#preload").hide();
        //swal('服务器内部错误!', '', 'error');
        return error;
    });
};

export const httpGet = (url) => {
    return simpleFetch('GET', url, {});
};
export const httpPost = (url, params) => {
    return simpleFetch('POST', url, params)
};
export const httpPut = (url, params) => {
    return simpleFetch('PUT', url, params)
};
export const httpDelete = (url, params) => {
    return simpleFetch('DELETE', url, params)
};
export const httpDownload = (url,filename) => {
    return simpleFetchFile('GET', url, filename,{});
};
export const httpAsyncGet = (url) => {
    return fetch('http://' + url, {
        method: 'GET',
        headers: httpHeaders.getHeaders()
    }).then((response) => {
        return response.json();
    }).then((result) => {
        return result
    }).catch((error) => {
        return error
    })
};

export const httpAsyncPost = (url, params,callback) => {
    return fetch('http://'+url, {
        method: 'POST',
        headers: httpHeaders.getHeaders(),
        body: JSON.stringify(params)
    }).then((response) => {
        return response.json();
    }).then((result) => {
        return result
    }).catch((error) => {
        return error
    })
};

export const httpAsyncPut = (url, params) => {
    return fetch('http://'+url, {
        method: 'PUT',
        headers: httpHeaders.getHeaders(),
        body: JSON.stringify(params)
    }).then((response) => {
        return response.json();
    }).then((result) => {
        return result
    }).catch((error) => {
        return error
    })
};

/**
 * 将 Obj 转化为 Url 格式的String
 */
export const objToUrl = (obj) => {
    let str = "";
    for (let i in obj) {
        if (obj[i] !== undefined && obj[i] != null && obj[i] !== "") {
            str = str + i + "=" + obj[i] + "&";
        }
    }
    return str.substr(0, str.length - 1);
};