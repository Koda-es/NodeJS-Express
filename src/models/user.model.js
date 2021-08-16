const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('@config/db');

class User extends Model {}

User.init(
    {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'The name can not be null.',
                },
                len: {
                    args: [3, 255],
                    msg: 'The name has to be between 3 and 255 characters.',
                },
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: {
                    args: true,
                    msg: 'The email must be valid.',
                },
            },
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {
                    args: true,
                    msg: 'Age has to be a number.',
                },
                min: {
                    args: 1,
                    msg: 'The age has to be greater than or equal to one',
                },
                max: {
                    args: 120,
                    msg: 'Age has to be real',
                },
            },
        },
        role: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            validate: {
                isIn: {
                    args: [[0, 1]],
                    msg: 'Must be a valid role'
                }
            }
        },
    },
    {
        sequelize,
        modelName: 'user',
        timestamps: true,
    }
);

module.exports = User;
