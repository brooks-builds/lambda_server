const lambdaFunction = require('./lambda/index');
const rawArguments = process.argv.slice(2)[0];

lambdaFunction(JSON.parse(rawArguments), result => console.log(result));