const Sequelize = require('sequelize');

const { sequelize } = require('@config/db');

const Document = sequelize.define(
    'document',
    {
        title: {
            type: Sequelize.STRING(100),
        },
        description: {
            type: Sequelize.TEXT(),
        },
    },
    {
        timestamps: true,
    }
);

module.exports = Document;