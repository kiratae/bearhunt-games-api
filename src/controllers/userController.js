const { UserSerivice } = require('../services/userService');

const UserController = {
    getData: async(req, reply) => {
        try {
            const { id } = req.params;

            userData = await UserSerivice.getData(id)

            reply.code(200).send(userData);
        } catch (err) {
            console.error(err)
            reply.send(err);
        }
    },
    saveData: async(req, reply) => {
        try {
            const { name } = req.body;

            let userData = {
                name: name,
                createDate: new Date(),
                isTemp: true
            };

            userData = await UserSerivice.saveData(userData)

            reply.code(201).send(userData);
        } catch (err) {
            console.error(err)
            reply.send(err);
        }
    }
}

module.exports = {
    UserController
}