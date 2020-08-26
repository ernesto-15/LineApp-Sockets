const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl()

//Conexion del servidor
io.on('connection', (client) => {
  console.log('client connected');
  //Desconexion
  client.on('disconnect', () => {
    console.log('cliente disconnected')
  })
  //Sigueitne ticket
  client.on('nextTicket', (ticket, callback) => {
    const next = ticketControl.nextTicket() 
    console.log(next)
    callback(next)
  })
  //Estado actual
  client.emit('currentState', {
    current: ticketControl.getLastTicket()
  })
});
