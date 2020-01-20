const fs = require('fs');
const {exec} = require('child_process');

function createDockerfile(runUri, name) {
    const dockerfile = `
        FROM node:latest
        RUN mkdir code
        WORKDIR code
        COPY ./wrapper.js /code/
        RUN git clone ${runUri} lambda
        ENTRYPOINT ["node", "wrapper.js"]
    `;

    return new Promise((resolve, reject) => {
        fs.writeFile(`${__dirname}/dockerfiles/${sanitizeName(name)}`, dockerfile, error => {
            if(error) return reject(error);

            resolve();
        });
    });
}

function sanitizeName(name) {
    return name.replace(/ /g, '').toLowerCase();
}

function creatDockerImage(name) {
    return new Promise((resolve, reject) => {
        exec(`docker build --no-cache -t ${sanitizeName(name)} -f ${__dirname}/dockerfiles/${sanitizeName(name)} ${__dirname}/dockerfiles`, (error) => {
            if(error) return reject(error);

            resolve();
        });
    });
}

function runDockerImage(name, data) {
    return new Promise((resolve, reject) => {
        exec(`docker run --rm ${sanitizeName(name)} '${JSON.stringify(data)}'`, (error, stdout) => {
            if(error) return reject(error);

            resolve(stdout);
        });
    });
}

module.exports = {
    createDockerfile,
    creatDockerImage,
    runDockerImage,
};