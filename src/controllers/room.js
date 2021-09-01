const uuidv4 = require('uuid')

const roomController = {
    saveData: (req, reply) => {
        try {
            const { gameId, userId } = req.body;

            const roomData = {
                id: uuidv4.v5(),
                gameId: gameId,
                users: [userId],
                createDate: new Date(),
                createUserId: userId,
            };

            reply.code(201).send(roomData);
        } catch (err) {
            reply.send(err);
        }
    }
}

module.exports = {
    roomController
}