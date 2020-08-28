const socket = io();
const text = document.querySelector('h1');
const button = document.querySelector('button');
const small = document.querySelector('small');

//Conexion del cliente
socket.on('connect', () => console.log('Connected to the server'));
//Desconexion del cliente
socket.on('disconnect', () => console.log('Connection lost'));

//Parametro del URL
const searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('escritorio')) {
  window.location = 'index.html';
  throw new Error('Desk is necessary');
}
const desk = searchParams.get('escritorio');
text.textContent = `Escritorio ${desk}`;


button.addEventListener('click', () => {
  //Evento de atender ticket
  socket.emit(
    'serveTicket',
    {
      desk,
    },
    (resp) => {
      if (resp === 'There are no tickets') {
        small.textContent = resp;
        alert(resp);
        return;
      }
      small.textContent = `Ticket ${resp.number}`;
    }
  );
});
