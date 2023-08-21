# README

Authors:

- Lablaco

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Pre-reqs

- Node version **>11, 13<**
- NPM > 6.14.4
  Yarn does not work, but feel free to fix it.
  [Installation instructions](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Running the project

1. Install the dependencies: `npm install`
2. Create a new .env file `.env.development` and get the keys for it.
3. If you're exclusively a frontend developer, use the development server keys instead.
4. Run the project: `npm run`
   In case you encounter the eslint error and you can't run the project because of it:
5. Remove `package-lock.json` and the `/node_modules` directory.
6. Run `npm install` again.
7. Run the project again: `npm run`
   In case of using Windows 10, there was an error, that program can't use 'react-image-crop' library. It was resolved:
8. Use `GitBash` tool terminal.
9. Do not delete the cloned file `package-lock.json`.
10. Run `npm install`.

<hr />

## How to update environment variables

This repository has a tight integration with CI/CD, but in general, changing environment variables should not cause any problems.

There are two options with which you can change the environment variables, namely:

1. Modify files on your local system.
2. Modify files on servers.

### Local

- If you only need to change a certain variable at development time, then you need to modify the `.env.development` file and re-run the project with `npm start` file because the variables from this file are loaded when you run the project for development.
- If you need to change the environment variables for staging, that is, for the application build that will be tested by the client or QA, you need to change the variables in the `.env.staging` file and rebuild project using `npm run build:staging`. Next, you need to update the code on the server, to do this you need to execute the following command: `scp -r build/* root@<host>:/root/api/django/static/build`.
- If you need to change environment variables for production to release a new version of the project to customers - you need to change the variables in the `.env.production` file and rebuild the project using `npm run build`. Next, you need to update the code on the server, to do this you need to execute the following command: `scp -r build/* root@<host>:/root/api/django/static/build`.

### Server

On the development server, there are files with environment variables in the path `/root/project_envs/react_app_envs`. In general, the logic of file modification is the same: if you need to change the environment variables for staging, that is, for the application build that will be tested by the client or QA, you need to change the variables in the `.env.staging` file, If you need to change environment variables for production to release a new version of the project to customers - you need to change the variables in the `.env.production` file.

> However, in this case you need to restart github actions (maybe with new PR merge) to rebuild the project and release the changes to the servers.
