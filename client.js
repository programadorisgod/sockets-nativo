
const { Socket } = require('node:net')
const { openStdin } = require('node:process')

const socket = new Socket()
const END = "END"

socket.connect({ port: 9000, host: 'localhost' })


console.log("Escribe...")
const stdin = new openStdin()

/**Cuando escribamos por consola, se enviará un mensaje al servidor con el metodo write  */
stdin.addListener('data', (data) => {
    const message = data.toString().trim()
    console.log(`[TU] ${message}`)
  
    socket.write(message)

    if (message === END) {
        console.log('Cliente Terminó ')
        socket.end()
        process.exit(0)
    }

})

/**En caso del que el servidor responda, escuhamos el evento y en el callback mostramos lo que nos respondio el server  */
socket.on('data', (data) => {
    console.log(`[Server] ${socket.remoteAddress}:${socket.remotePort} says ${data}`)
})

/** De igual forma que en el server, en caso de que se cierre la conexion, avisamos y cerramos el proceso. */
socket.on('close', () => {
    console.log('Servidor Terminó ')
    process.exit(0)
})
socket.on('error', (error) => {

    console.log('Error de conexion', error)
})
