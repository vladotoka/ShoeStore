import moment from 'moment';

class Order {
  constructor(id, items, totalAmount, date) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
  }

  // get readableDate() {
  //   return this.date.toString();
  // }
  get readableDate() {
    // в Анроид следното форматиране на датата не работи
    // return this.date.toLocaleDateString('en-EN', {
    //   year: 'numeric',
    //   month: 'long',
    //   day: 'numeric',
    //   hour: '2-digit',
    //   minute: '2-digit'
    // });

    //правилно форматиране дата в Андроид с отделна библиотека moment
    // let bg = moment(this.date).locale('bg');
    // return bg.format('Do MMMM YYYY, hh:mm');
    return moment(this.date).locale('bg').format('Do MMMM YYYY, hh:mm');
  }
}

export default Order;