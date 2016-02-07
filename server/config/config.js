var path = require('path');

module.exports = {
    development: {
        username: 'root',
        password: 'root',
        database: 'ros',
        host: 'localhost',
        dialect: 'mysql',
        port: 8881,
        logging: false,
        applicationUrl: 'localhost:4000'
    },
    test: {
        username: 'root',
        password: 'root',
        database: 'generation',
        host: 'localhost',
        dialect: 'mysql',
        port: 8881,
        logging: false,
        applicationUrl: 'localhost:4000'
    },
    production: {
        username: 'root',
        password: 'horse123',
        database: 'rfs',
        host: '127.0.0.1',
        dialect: 'mysql',
        port: 3306,
        logging: false,
        applicationUrl: 'horu.io/rfs'

    }
};
