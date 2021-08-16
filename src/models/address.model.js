const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('@config/db');

class Address extends Model {}

Address.init(
    {
        name: {
            type: DataTypes.STRING,
        },
    }, { 
        sequelize, 
        modelName: 'address',
        timestamps: false
    }
);

module.exports = Address;