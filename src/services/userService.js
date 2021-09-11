const { MongoClient, ObjectId } = require('mongodb')
require('dotenv').config()

const collectionName = 'users'

const UserSerivice = {
    getData: async(userId) => {
        const func = 'getData'
        const client = new MongoClient(process.env.CONNECTION_STRING)
        try {
            if (!userId) throw "userId is null."

            await client.connect();
            const database = client.db(process.env.DATABASE_NAME)
            const users = database.collection(collectionName);
            return await users.findOne({ "_id": ObjectId(userId) })
        } catch (err) {
            console.error(`UserSerivice.${func}: Exception caught with user id '${userId}'. ${err}`)
        } finally {
            await client.close()
        }
    },
    saveData: async(user) => {
        const func = 'saveData'
        const client = new MongoClient(process.env.CONNECTION_STRING)
        try {
            if (!user) throw "user is null."

            await client.connect();
            const database = client.db(process.env.DATABASE_NAME)
            const users = database.collection(collectionName);
            if (!user.id) {
                const newUser = await users.insertOne(user)
                user.id = newUser.insertedId
            }

            return user
        } catch (err) {
            console.error(`UserSerivice.${func}: Exception caught. ${err}`)
        } finally {
            await client.close()
        }
    }
}

module.exports = {
    UserSerivice
}