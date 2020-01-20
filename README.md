# Lambda Server

## Running

clone and npm install in the directory

create the config file by renaming `config-example.json` to `config.json`. Make any changes to it for your environment.

create a `dockerfiles` director in the `docker` directory.

copy the `wrapper-example.js` file in the `docker` directory to the `dockerfiles` directory.

`npm start` to run the server

## Using the Lambda Service

Register a function with a name, and a github URI where the function lives. See [an example function](https://github.com/BrooksPatton/add_lambda) as an example.

Use Postman or some other HTTP tool to hit the given route and pass in the data to run your new lambda function.

## Note

This lambda server is for example only, it is not ready to production in its current state.