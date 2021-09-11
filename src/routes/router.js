const { UserController } = require('../controllers/userController')
const { RoomController } = require('../controllers/roomController');
const User = require('../models/user');
const Room = require('../models/room');


const getUserData = {
    schema: {
        response: {
            200: User,
        },
    },
    handler: UserController.getData,
};
const saveUserData = {
    schema: {
        response: {
            200: User,
        },
        response: {
            201: User,
        },
    },
    handler: UserController.saveData,
};

const getRoomData = {
    schema: {
        response: {
            200: Room,
        },
    },
    handler: RoomController.getData,
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
    handler: RoomController.saveData,
};

function itemRoutes(fastify, options, done) {
    fastify.get('/users/:id', getUserData);
    fastify.post('/users', saveUserData);

    fastify.get('/rooms/:id', getRoomData);
    fastify.post('/rooms', saveRoomData);

    done();
}

module.exports = itemRoutes;