'use strict';
/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest  = (options = {}) => {

    if (options.method === "GET") {
        options.url += "?";
        for (key in options.data) {
          options.url += `${key}=${options.data[key]}&`;
    
        }
      } 

    fetch(options.url, {
        method: options.method,
        body: options.data
    })
    .then(response => response.json())
    .then(data => options.callback(data))
    .catch(error => console.log(JSON.parse(error)))

};
