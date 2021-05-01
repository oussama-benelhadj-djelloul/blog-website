
const mongoose = require('mongoose');
const MONGO_URL = 'mongodb://admin:admin123@cluster0-shard-00-00.me0uj.mongodb.net:27017,cluster0-shard-00-01.me0uj.mongodb.net:27017,cluster0-shard-00-02.me0uj.mongodb.net:27017/Articlee?ssl=true&replicaSet=atlas-q12izu-shard-0&authSource=admin&retryWrites=true&w=majority'


const connect = async () => {
    try {
        //connect to db cloud
        const con = await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log('Mongo connect')
    } catch (err) {
        console.log('no connection')
        console.log(err);
        process.exit(1);
    }
}
require('./blog')

module.exports = connect