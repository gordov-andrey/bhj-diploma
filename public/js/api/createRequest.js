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
<<<<<<< HEAD
    } 
=======
    }
    //console.log(data);
>>>>>>> 17868bdd78651e89e8933d2856a192cc4f07bf49

    fetch(url, {
        method: options.method,
        body: data
    })
    .then(response => response.json())
    .then(data => options.callback(data))
    .catch((err) => console.log(err))

};
