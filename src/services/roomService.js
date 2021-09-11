const { MongoClient, ObjectId } = require('mongodb')
require('dotenv').config()

const collectionName = 'rooms'

const RoomSerivice = {
    getData: async(roomId) => {
        const func = 'getData'
        const client = new MongoClient(process.env.CONNECTION_STRING)
        try {
            if (!roomId) throw "roomId is null."

            await client.connect();
            const database = client.db(process.env.DATABASE_NAME)
            const rooms = database.collection(collectionName);
            return await rooms.findOne({ "_id": ObjectId(roomId) })
        } catch (err) {
            console.error(`RoomSerivice.${func}: Exception caught with room id '${roomId}'. ${err}`)
        } finally {
            await client.close()
        }
    },
    saveData: async(room) => {
        const func = 'saveData'
        const client = new MongoClient(process.env.CONNECTION_STRING)
        try {
            if (!room) throw "room is null."

            await client.connect();
            const database = client.db(process.env.DATABASE_NAME)
            const rooms = database.collection(collectionName);
            if (!room.id) {
                const newRoom = await rooms.insertOne(room)
                room.id = newRoom.insertedId
            }

            return room
        } catch (err) {
            console.error(`RoomSerivice.${func}: Exception caught. ${err}`)
        } finally {
            await client.close()
        }
    }
}

module.exports = {
    RoomSerivice
}