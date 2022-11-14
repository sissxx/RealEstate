const mongoose = require('mongoose');

const { DB_QS } = require('./env');

exports.dbInit = () => {
    mongoose.connection.on('open', () => console.log('DataBase is connected!'));
    
    return mongoose.connect(DB_QS);
}
