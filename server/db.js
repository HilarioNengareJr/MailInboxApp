const { Sequelize, DataTypes } = require('sequelize');

// Connecting to sqlite3 database
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'maildb.sqlite',
});

// Model for User
const User = sequelize.define('User', {
    userId: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},  { tableName: 'User' });

// Model for Message
const Message = sequelize.define('Message', {
    subject: {
        type: DataTypes.STRING,
    },
    content: {
        type: DataTypes.TEXT,
    },
    isRead: {
        type: DataTypes.BOOLEAN,
    },
},  { tableName: 'Message' });

// Associations between database models that we have
User.hasMany(Message, { foreignKey: 'userId' });

// Function to sync models to db
const syncDatabase = async () => {
    try {
        await sequelize.sync();
        console.log('Database synced successfully!!');
    } catch (error) {
        console.error('Error syncing models:', error);
    }
};

module.exports = { User, Message, syncDatabase };
