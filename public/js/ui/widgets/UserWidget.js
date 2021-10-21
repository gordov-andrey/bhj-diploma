/**
 * Класс UserWidget отвечает за
 * отображение информации о имени пользователя
 * после авторизации или его выхода из системы
 * */

class UserWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element){
    if (!element) throw new Error( 'Element not found' );
    this.element = element;

  }

  /**
   * Получает информацию о текущем пользователе
   * с помощью User.current()
   * Если пользователь авторизован,
   * в элемент .user-name устанавливает имя
   * авторизованного пользователя
   * */
  update(){
    const userName = document.querySelector('.user-name');
    const userCurrent = User.current();
    if (userCurrent){
      userName.textContent = userCurrent.name;
    }else {
      console.log('Пользователь не обнаружен');
    }

  }
}
