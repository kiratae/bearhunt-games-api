const { RoomSerivice } = require('../services/roomService');
const { UserSerivice } = require('../services/userService');

const RoomController = {
    getData: async(req, reply) => {
        try {
            const { id } = req.params;

            let roomData = await RoomSerivice.getData(id)
            let users = []
            for (let userId of roomData.users) {
                users.push(await UserSerivice.getData(userId))
            }

            roomData.users = users

            reply.code(200).send(roomData);
        } catch (err) {
            console.error(err)
            reply.send(err);
        }
    },
    saveData: async(req, reply) => {
        try {
            const { gameId, userId } = req.body;

            let roomData = {
                gameId: gameId,
                users: [userId],
                createDate: new Date(),
                createUserId: userId,
            };

            roomData = await RoomSerivice.saveData(roomData)

            reply.code(201).send(roomData);
        } catch (err) {
            reply.send(err);
        }
    }
}

module.exports = {
    RoomController
}