const {lambdas} = require('./connection');

function store(newLambda) {
    return lambdas.insert(newLambda);
}

function getAll() {
    return lambdas.find({});
}

function getById(_id) {
    return lambdas.findOne({_id});
}

module.exports = {
    store,
    getAll,
    getById,
};