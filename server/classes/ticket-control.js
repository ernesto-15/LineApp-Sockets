const fs = require('fs');
const path = require('path');

class Ticket {
  constructor(number, desk) {
    this.number = number
    this.desk = desk
  }
}

class TicketControl {
  constructor() {
    this.last = 0;
    this.today = new Date().getDate();
    this.tickets = [];
    let data = require('../data/data.json');
    if (data.today === this.today) {
      this.last = data.last;
      this.tickets = data.tickets
    } else {
      this.resetCount();
    }
  }

  getLastTicket() {
    return `Ticket ${this.last}`;
  }

  nextTicket() {
    this.last += 1;
    let ticket = new Ticket(this.last, null)
    this.tickets.push(ticket)
    this.saveFile();
    return `Ticket ${this.last}`;
  }
  resetCount() {
    this.last = 0;
    this.tickets = []
    console.log('Se ha inicializado el sistema');
    this.saveFile();
  }

  saveFile() {
    let jsonData = {
      last: this.last,
      today: this.today,
      tickets: this.tickets
    };
    let jsonDataString = JSON.stringify(jsonData);
    fs.writeFileSync(
      path.resolve(__dirname, '../data/data.json'),
      jsonDataString
    );
  }
}

module.exports = {
  TicketControl,
};
