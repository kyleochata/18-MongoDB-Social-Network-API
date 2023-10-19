# 18-MongoDB-Social-Network-API

Social Network API using MongoDB

[![MIT license](https://img.shields.io/badge/License-MIT-blue)](https://lbesson.mit-license.org)

## Description

In today's age, social networks are a part of everyday life. Most of us are using it to add new friends, remove old ones, post our thoughts and wait to react to other people's thoughts. All this is handled by sending data to a database to keep track of all of these changes. In this project, the aim was to build a backend that will handle the basic functions of a social network API. With the use of MongoDB this project is able to handle adding and removing friends, creating new users, reactions, and thoughts, updating users and thoughts and deleting the prior actions.

A challenge that was faced in this project was establishing relationships between the documents in order to update and populate the fields when called with the specific API. A future development will be adding front end to make this social network fully functional. This will most likely be done through React.js.

A video walkthrough of this application can be found [here](https://drive.google.com/file/d/1uMFK27x2Agu_b-Ku3eWIk05FZOk5MDNb/view)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Test](#test)
- [Questions](#questions)
- [Credit](#credit)

## Installation

### Programs needed for this project:

- GitBash (windows) or Terminal (Mac)
- Node.js
- MongoDB
- Insomnia

Locate a suitable place where you would like to download this repository. Once found, copy the repositories SSH or HTTPS to clone through the terminal or download the zipfile from GitHub. After it is downloaded, please ensure that node.js is installed. Once it is installed and at least version 18 or higher, go to your terminal, navigate to the directory that contains this repository. Once there, type in "npm i" to download the required dependencies.

Once all dependencies are downloaded, please type in "npm run start" or just "npm start" to start the connection to the MongoDB server. Navigate over to insomnia and go to http://localhost:3001 to interact with this application. When trying to update or create a user the JSON that must be passed must look like the following:

```
{
  "username": "enter a new username or update an existing one in these quotes",
  "email": "enter a new email or update an existing one in these quotes"
}
```

For creating or updating a Thought:

```
{
  "thoughtText": "enter a thought in these quotes",
  "username": "enter a username that already exists to attach this thought to a specific user"
}
```

For creating or updating a Reaction:

```
{
  "reactionText": "enter a reaction to a thought in these quotes",
  "username": "enter an existing username to attach this reaction to a specific user"
}
```

## Usage

This repository is allowed for use in a learning environment to evaluate and analyze.

## License

    Please see the MIT license found in the repository. To learn more, please click the license badge at the top of the README.MD

## Contributing

- MongoDB for their [modules](https://www.mongodb.com/)
- Express for their [modules](https://expressjs.com/)
- nodemon for their [modules](https://www.npmjs.com/package/nodemon)
- UCI BootCamp for the acceptance criteria.

## Test

There are no tests made for this project

## Questions

If you have further questions about this project, please send an email or checkout us out on GitHub.

Email: kyleochata@gmail.com

GitHub Link: https://github.com/kyleochata

## Credit

This project was created by Kyle Etrata
