const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

//Control de ticket
const ticketControl = new TicketControl();

//Conexion del servidor
io.on('connection', (client) => {
  console.log('client connected');
  //Desconexion
  client.on('disconnect', () => {
    console.log('cliente disconnected');
  });

  //Sigueitne ticket
  client.on('nextTicket', (ticket, callback) => {
    const next = ticketControl.nextTicket();
    callback(next);
  });

  //Atender Ticket
  client.on('serveTicket', (data, callback) => {
    if (!data.desk) {
      return callback({
        error: true,
        message: 'Desk is required',
      });
    }
    let serveTicket = ticketControl.serveTicket(data.desk);
    callback(serveTicket);
    console.log(ticketControl.lastFour)

    //Comunicacion con la pantalla principal
    client.broadcast.emit('lastFour', {
      lastFour: ticketControl.getLastFour()
    })
  });

  //Estado actual
  client.emit('currentState', {
    current: ticketControl.getLastTicket(),
    lastFour: ticketControl.getLastFour(),
  });
});
