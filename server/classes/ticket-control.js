const fs = require('fs');
const path = require('path');

class Ticket {
  constructor(number, desk) {
    this.number = number;
    this.desk = desk;
  }
}

class TicketControl {
  constructor() {
    this.last = 0;
    this.today = new Date().getDate();
    this.tickets = [];
    this.lastFour = [];
    let data = require('../data/data.json');
    if (data.today === this.today) {
      this.last = data.last;
      this.tickets = data.tickets;
      this.lastFour = data.lastFour;
    } else {
      this.resetCount();
    }
  }

  //Obtener el ultimo ticket
  getLastTicket() {
    return `Ticket ${this.last}`;
  }

  //Obtener los ultimos 4 tickets
  getLastFour() {
    return this.lastFour;
  }

  //Atender un ticket
  serveTicket(desk) {
    if (this.tickets.length === 0) {
      return 'There are no tickets';
    }
    let numberTicket = this.tickets[0].number;
    this.tickets.shift();
    let serveTicket = new Ticket(numberTicket, desk);
    this.lastFour.unshift(serveTicket);
    if (this.lastFour.length > 4) {
      this.lastFour.splice(-1, 1); //Eliminar ultimo elemento
    }
    this.saveFile();
    return serveTicket;
  }

  //Crear un ticket
  nextTicket() {
    this.last += 1;
    let ticket = new Ticket(this.last, null);
    this.tickets.push(ticket);
    this.saveFile();
    return `Ticket ${this.last}`;
  }

  //Reiniciar sistema
  resetCount() {
    this.last = 0;
    this.tickets = [];
    this.lastFour = [];
    console.log('Se ha inicializado el sistema');
    this.saveFile();
  }

  //Guardar al archivo json
  saveFile() {
    let jsonData = {
      last: this.last,
      today: this.today,
      tickets: this.tickets,
      lastFour: this.lastFour,
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
