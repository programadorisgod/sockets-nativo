
const { Socket } = require('node:net')
const { openStdin } = require('node:process')

const socket = new Socket()
const END = "END"

socket.connect({ port: 9000, host: 'localhost' })


console.log("Escribe...")
const stdin = new openStdin()

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

socket.on('data', (data) => {
    console.log(`[Server] ${socket.remoteAddress}:${socket.remotePort} says ${data}`)
})

socket.on('close', () => {
    console.log('Servidor Terminó ')
    process.exit(0)
})
socket.on('error', (error) => {

    console.log('Error de conexion', error)
})
