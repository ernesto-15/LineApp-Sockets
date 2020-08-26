const fs = require('fs')
const path = require('path')
class TicketControl {
  constructor() {
    this.last = 0
    this.today = new Date().getDate()
    let data = require('../data/data.json')
    if(data.today === this.today) {
      this.last = data.last
    } else {
      this.resetCount()
    }
  }

  getLastTicket() {
    return `Ticket ${this.last}`
  }
  
  nextTicket() {
    this.last += 1
    this.saveFile()
    return `Ticket ${this.last}`
  }
  resetCount() {
    this.last = 0
    console.log('Se ha inicializado el sistema')
    this.saveFile()
  }

  saveFile() {
    let jsonData = {
      last: this.last,
      today: this.today
    }
    let jsonDataString = JSON.stringify(jsonData)
    fs.writeFileSync(path.resolve(__dirname, '../data/data.json'), jsonDataString)
  }

}

module.exports = {
  TicketControl
}