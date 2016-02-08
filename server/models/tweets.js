module.exports = function(sequelize, DataTypes){
    var tweets = sequelize.define('tweets', {
            id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            tweet_id: DataTypes.STRING,
            twitter_user_id: DataTypes.INTEGER,
            tweet_text: DataTypes.STRING,
            tweet_picture: DataTypes.STRING
        },
        {
            timestamps: false
        });

    return tweets;
};
