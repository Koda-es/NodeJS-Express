const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('@config/db');

class Document extends Model {}

Document.init(
    {
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'The title can not be null.',
                },
                len: {
                    args: [3, 255],
                    msg: 'The title has to be between 3 and 255 characters.',
                },
            },
        },
        description: {
            type: DataTypes.TEXT
        }
    }, 
    { 
        sequelize, 
        modelName: 'document',
        timestamps: true
    }
);

module.exports = Document;