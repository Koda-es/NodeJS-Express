const { Validator } = require('node-input-validator');

exports.documentHasAllData = async (document) => {
    const validator = new Validator(document, {
        title: 'required|minLength:5',
        description: 'nullable',
    });

    return await validator.check();
}