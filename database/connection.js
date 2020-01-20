const monk = require('monk');

const connection = monk('localhost/twitch_lambda');
const lambdas = connection.get('lambdas');

module.exports = {
    lambdas,
};