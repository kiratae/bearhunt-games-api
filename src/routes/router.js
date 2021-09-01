const { userController } = require('../controllers/user')
const { roomController } = require('../controllers/room');
const User = require('../models/user');
const Room = require('../models/room');

const saveUserData = {
    schema: {
        response: {
            200: User,
        },
        response: {
            201: User,
        },
    },
    handler: userController.saveData,
};

const saveRoomData = {
    schema: {
        response: {
            200: Room,
        },
        response: {
            201: Room,
        },
    },
    handler: roomController.saveData,
};

function itemRoutes(fastify, options, done) {
    fastify.post('/users', saveUserData);

    // Add room
    fastify.post('/rooms', saveRoomData);

    done();
}

module.exports = itemRoutes;