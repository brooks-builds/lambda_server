var express = require('express');
const {store, getAll, getById} = require('../database/lambdas');
const config = require('../config');
const {createDockerfile, creatDockerImage, runDockerImage} = require('../docker/docker_helper');
var router = express.Router();
const serverBaseUri = process.env.BASE_URI || `${config.baseUri}:${config.port}`;

/* GET home page. */
router.get('/', function(req, res, next) {
  getAll()
    .then(lambdas => lambdas.map(lambda => {
      lambda.runUri = `${serverBaseUri}/run/${lambda._id}`;

      return lambda;
    }))
    .then(lambdas => {
      res.render('index', {lambdas});
    });
});

router.post('/lambdas', (request, response, next) => {
  const newLambda = {
    name: request.body.name,
    githubUri: request.body.uri,
  };

  store(newLambda)
    .then(lambda => createDockerfile(lambda.githubUri, lambda.name))
    .then(() => creatDockerImage(newLambda.name))
    .then(() => response.redirect('/'))
    .catch(error => next(error));
});

router.all('/run/:id', (request, response, next) => {
    const data = {
      body: request.body,
      query: request.query,
      params: request.params,
    };
  
    getById(request.params.id)
      .then(lambda => {
        return runDockerImage(lambda.name, data);
      })
      .then(result => response.json({result}))
      .catch(error => next(error));
  });

module.exports = router;
