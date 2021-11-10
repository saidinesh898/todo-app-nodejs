const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('unable to connect to Mongo')
    } else {
        console.log('connected to Mongo')
    }

    const db = client.db(databaseName)

    // db.collection('users').insertOne({
    //     name: 'Sai Dinesh Kumar',
    //     age: 23
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('unable to insert user', error)
    //     }
    //     console.log(result)

    // })

    // db.collection('users').insertMany([{
    //         name: 'Dinesh Kumar',
    //         age: 23
    //     },
    //     {
    //         name: 'Sai Kumar',
    //         age: 23
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('unable to insert user', error)
    //     }
    //     console.log(result)
    // })

    db.collection('tasks').insertMany([{
            description: 'Learn Node CLI',
            completed: true
        },
        {
            description: 'Learn MongoDB',
            completed: false
        },
        {
            description: 'Learn REST-APIs',
            completed: false
        }
    ], (error, result) => {
        if (error) {
            return console.log('unable to insert user', error)
        }
        console.log(result)


    })

})