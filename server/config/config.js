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
        applicationUrl: 'localhost:4000',
        consumerKey: 'sqnMkZc0i7OuyBpKC3XcjZxDj',
        consumerSecret: 'xIJTWC7J0A55zAu38EU3cI435PBtcQwrQo2LtzWcqxzZgPglSn',
        callbackUrl: 'http://127.0.0.1:5000/callback'
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
        applicationUrl: 'horu.io/rfs',
        consumerKey: 'YKoLrNkDPQ8pSkR9iD0xbFDPm',
        consumerSecret: 'Qs7oUOglpSvhjyu6gy9aLJY4WC5imS34hv8a7eyTxhpCNYXDUl',
        callbackUrl: 'http://rfs.horu.io/callback'

    }
};
