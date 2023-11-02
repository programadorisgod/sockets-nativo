const { Server } = require('node:net')


const server = new Server()

const END = "END"

/**Aquí colocamos a que el server escuche cuando un cliente se conecte */
server.on("connection", (socket) => {

  console.log('New connection from', socket.remoteAddress)
   
  const remoteSocket = `${socket.remoteAddress}:${socket.remotePort}`
  
  socket.setEncoding("utf-8")
  /** Cuando el cliente nos mande mensajes, preguntaremos si es de finalizar, sino, con el metodo write le respondemos */
  socket.on('data', (data) => {
    const message = data.toString().trim()

    if (message === END) {
      socket.end()
    } else {

      console.log(`${remoteSocket}:${data}`)

      socket.write(`Message recived from ${socket.remoteAddress}:${socket.remotePort}`)

    }
  })

/** En caso de que se salga sin enviar la palabra END  */
  socket.on('close', () => {
    console.log('Client off', remoteSocket)
  })

  socket.on('error', (error) => {

    console.log('Error de conexion', error)
  })

})





/*Se usa el hos 0.0.0.0 para que node me use ipv4 y no se confunda .
mezclando ipv4 con ipv6*/
server.listen({ port: 9000, host: '0.0.0.0' }, () => {
  console.log('Server listening on port 9000')
})