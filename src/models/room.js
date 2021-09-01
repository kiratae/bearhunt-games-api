module.exports = Room = {
    type: 'object',
    properties: {
        users: { type: 'array' },
        gameId: { type: 'string' },
        id: { type: 'string' },
    },
};