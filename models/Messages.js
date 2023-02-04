const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Messages extends Model { };


Messages.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        sender_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        receiver_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'messsges',
    }
);

module.exports = Messages;