'use strict';
/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest  = (options = {}) => {
    let url = options.url;
    let data = options.data;

    if (options.method === 'GET') {
        url += '?';

        for (key in options.data) {
          url += `${key}=${options.data[key]}&`;
        }
    } else {
        //data = new FormData(options.data);
    }

    fetch(url, {
        method: options.method,
        body: data
    })
    .then(response => response.text())
    .then(data => options.callback(data))
    .catch(err => console.log(err))

};
