/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if (!element) throw new Error('Element not found');
    this.element = element;
    this.registerEvents();

  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render(this.lastOptions);
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {

    this.element.addEventListener('click', (e) => {

      if (e.target.classList.contains('remove-account')) {
        this.removeAccount()
      }

      if (e.target.closest('.transaction__remove')) {
        // console.log(e.target.dataset.id);
        // console.log(e.target.closest('.transaction__remove').dataset.id)
        // this.removeTransaction(e.target.dataset.id);
        this.removeTransaction(e.target.closest('.transaction__remove').dataset.id)
      }
    })

  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets(),
   * либо обновляйте только виджет со счетами
   * для обновления приложения
   * */
  removeAccount() {
    if (this.lastOptions) {
      if (confirm('Вы действительно хотите удалить счёт?')) {

        const accountId = new FormData();
        accountId.append('id', this.lastOptions.account_id)
        Account.remove(accountId, (response) => {
          if (response.success){
            this.clear()
            App.update()
          }
        })
      }
    }
  }
  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction( id ) {
    if (this.lastOptions) {
      if (confirm('Вы действительно хотите удалить эту транзакцию?')) {
        const ID = new FormData();
        ID.append('id', id);
        Transaction.remove(ID, (response) => {
          if (response.success){
            App.update();
          }
        })
      }
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options){
    if(!options) return;
    this.lastOptions = options;

    //console.log('опшнс', this.lastOptions);

    Account.get(options.account_id, User.current(), (response) => {
      if (response.success) {
        this.renderTitle(response.data.name);
      }
    })

    Transaction.list(options, (response) => {
      if (response.success) {
        this.renderTransactions(response.data);
      }
    })

  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {

    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    this.lastOptions = null;

  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name){

    this.element.querySelector('.content-title').textContent = name;

  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date){

    const data = new Date(date);
    const ddmmyyyy = data.toLocaleString( 'ru', { year: 'numeric', month: 'long', day: 'numeric' });
    const hhmm = data.toLocaleString( 'ru', { hour: 'numeric', minute: 'numeric' });
    return `${ ddmmyyyy } в ${ hhmm }`;

  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item){

    return `<div class="transaction transaction_${item.type.toLowerCase()} row">
              <div class="col-md-7 transaction__details">
                <div class="transaction__icon">
                    <span class="fa fa-money fa-2x"></span>
                </div>
                <div class="transaction__info">
                    <h4 class="transaction__title">${item.name}</h4>
                    <div class="transaction__date">${this.formatDate(item.created_at)}</div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="transaction__summ">
                    ${item.sum} <span class="currency">₽</span>
                </div>
              </div>
              <div class="col-md-2 transaction__controls">
                  <button class="btn btn-danger transaction__remove" data-id="${item.id}">
                      <i class="fa fa-trash"></i>  
                  </button>
              </div>
          </div>`

  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data){

    const content = this.element.querySelector('.content');
    content.innerHTML = '';
    data.forEach(item => content.innerHTML += this.getTransactionHTML(item));

  }
}