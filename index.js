const fastify = require('fastify')({ logger: false })
fastify.register(require('fastify-cors'), { origin: true })
    // fastify.register(require('fastify-jwt'), {
    //     secret: process.env.SECRET
    // })

function handle(conn, req) {
    conn.pipe(conn) // creates an echo server
}

fastify.register(require('fastify-websocket'), {
    handle,
    options: {
        maxPayload: 1048576,
        clientTracking: true
    }
})

fastify.route({
    method: 'GET',
    url: '/',
    handler: (req, reply) => {
        // this will handle http requests
        reply.send({ hello: 'world' })
    },
    wsHandler: (connection, req) => {
        connection.socket.on('message', async(data) => {
            try {
                let buffer = Buffer.from(data);
                console.log(buffer.toString('utf8'))
                fastify.websocketServer.clients.forEach((client) => {
                    if (client.readyState === 1) {
                        client.send(data);
                    }
                });
            } catch (error) {
                console.error(error);
            }
        })
    }
})

try {
    setInterval(() => {
        fastify.websocketServer.clients.forEach((client) => {
            if (client.readyState === 1) {
                client.send(Buffer.from(JSON.stringify({ serverTime: new Date().toString() })));
            }
        });
    }, 1000)

} catch (error) {
    console.error(error);
}

const start = async() => {
    try {
        const PORT = process.env.PORT || 3000
        await fastify.listen(PORT, '0.0.0.0')

        console.log(`Server running at http://localhost:${PORT}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()