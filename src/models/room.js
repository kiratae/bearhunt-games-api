module.exports = Room = {
    type: 'object',
    properties: {
        createUserId: { type: 'string' },
        users: { type: 'array' },
        gameId: { type: 'string' },
        id: { type: 'string' },
    },
};