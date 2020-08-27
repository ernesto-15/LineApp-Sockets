const socket = io();
const label = document.querySelector('#lblNuevoTicket');
const button = document.querySelector('button');

//Conexion del cliente
socket.on('connect', () => console.log('Connected to the server'));
//Desconexion del cliente
socket.on('disconnect', () => console.log('Connection lost'));
//Escucha estado actual
socket.on('currentState', (ticket) => {
  label.textContent = ticket.current;
});

//Agregar Ticket
button.addEventListener('click', () => {
  socket.emit('nextTicket', null, (ticket) => {
    label.textContent = ticket;
    console.log(label.textContent);
  });
});
