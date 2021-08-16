const Address = require('./address.model');
const Category = require('./category.model');
const Document = require('./document.model');
const User = require('./user.model');

// One To One
User.hasOne(Address, { 
    as: 'address', 
    foreignKey: { 
        name: 'userId', 
        allowNull: false,
        onDelete: 'CASCADE'
    } 
});

Address.belongsTo(User, { 
    as: 'user', 
    foreignKey: {
        name: 'userId',
        allowNull: false,
        onDelete: 'CASCADE'
    } 
});

// One To Many
User.hasMany(Document, { 
    as: 'documents', 
    foreignKey: {
        name: 'userId',
        allowNull: false,
        validate: {
            notNull: {
                msg: 'The userId can not be null.',
            },
        },
        onDelete: 'CASCADE'
    }
});

Document.belongsTo(User, { 
    as: 'user', 
    foreignKey: {
        name: 'userId',
        allowNull: false,
        validate: {
            notNull: {
                msg: 'The userId can not be null.',
            },
        },
        onDelete: 'CASCADE'
    }
});

// One To Many Through
Document.belongsToMany(Category, { 
    through: 'document_categories', 
    timestamps: false
});

Category.belongsToMany(Document, { 
    through: 'document_categories', 
    timestamps: false
});


module.exports = { Category, Document, Address, User };