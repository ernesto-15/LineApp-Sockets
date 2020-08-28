const socket = io();
const labelTicket1 = document.querySelector('#lblTicket1');
const labelTicket2 = document.querySelector('#lblTicket2');
const labelTicket3 = document.querySelector('#lblTicket3');
const labelTicket4 = document.querySelector('#lblTicket4');

const labelEscritorio1 = document.querySelector('#lblEscritorio1');
const labelEscritorio2 = document.querySelector('#lblEscritorio2');
const labelEscritorio3 = document.querySelector('#lblEscritorio3');
const labelEscritorio4 = document.querySelector('#lblEscritorio4');

const labelEscritorios = [labelEscritorio1, labelEscritorio2, labelEscritorio3, labelEscritorio4]
const  labelTickets = [labelTicket1, labelTicket2, labelTicket3, labelTicket4]


//Conexion del cliente
socket.on('connect', () => console.log('Connected to the server'));
//Desconexion del cliente
socket.on('disconnect', () => console.log('Connection lost'));
//Escucha estado actual
socket.on('currentState', (ticket) => {
  console.log(ticket);
  updateHTML(ticket.lastFour)
});

//Comunicacion de la cola de tickets
socket.on('lastFour', (ticket) => {
  const audio = new Audio('../audio/new-ticket.mp3')
  audio.play()
  updateHTML(ticket.lastFour)
})

//Actualizar el dom
function updateHTML(lastFour) {
  for(let i = 0; i <= lastFour.length - 1; i++) {
    labelTickets[i].textContent = `Ticket ${lastFour[i].number}`
    labelEscritorios[i].textContent = `Escritorio ${lastFour[i].desk}`
  }
}