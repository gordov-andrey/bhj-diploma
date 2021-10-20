/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {

  static URL = '/user';
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    //console.log(localStorage.getItem('user'));
    return localStorage.getItem('user');
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch() {
    createRequest({
      url: this.URL + '/current',
      method: 'GET',
      callback: (response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        } else {
          console.log(response.error);
        }
        
      }
    });
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      data: data,
      callback: (response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
          callback(response);
          console.log('Login Sucess');
        }else {
          console.log(response.error);
        }
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
    createRequest({
      url: this.URL + '/register',
      method: 'POST',
      data: data,
      callback: (response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
          callback(response);
          console.log('Register Sucess');
        }else {
          console.log(response.error);
        }
      }
    });

  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
   static logout() {
    return createRequest({
      url: '/user/logout',
      method: 'POST',
      callback: (response) => {
        if (response){
          User.unsetCurrent();
          console.log('Logout Sucess');
        }else {
          console.log('Что-то пошло не так.');
        }
      }
    })
  }
}
