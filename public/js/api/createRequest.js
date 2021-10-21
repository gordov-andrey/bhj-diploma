'use strict';
/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest  = (options = {}) => {
    let url = options.url;
    let obj = options.data;

    if (options.method === 'GET') {
        url += '?';

        for (let key in obj) {
          url += `${key}=${obj[key]}&`;
        }
        delete options.data; //Это не правильно, но по другому не придумал.
    } 
    fetch(url, {
        method: options.method,
        body: options.data
    })
    .then(response => response.json())
    .then(data => options.callback(data))
    .catch(error => console.log(error))

};
