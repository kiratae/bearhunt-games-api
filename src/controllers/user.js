const uuid = require('uuid')

const userController = {
    saveData: (req, reply) => {
        try {
            const { name } = req.body;

            const userData = {
                name: name,
                id: uuid.v4()
            };

            console.log(userData)

            reply.code(201).send(userData);
        } catch (err) {
            reply.send(err);
        }
    }
}

module.exports = {
    userController
}