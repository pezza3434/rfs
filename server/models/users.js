module.exports = function(sequelize, DataTypes){
    var users = sequelize.define('users', {
            id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            twitter_id: DataTypes.INTEGER,
            token: DataTypes.STRING,
            secret_token: DataTypes.STRING
        },
        {
            timestamps: false
        });

    return users;
};
