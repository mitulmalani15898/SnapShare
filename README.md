# Project - CSCI 5409 - Group 35 - Thunder Cloud - SnapShare

- _Date Created_: 10 MAR 2022
- _Last Modification Date_: 06 APR 2022
- _Deployed Application URL_: <http://snapshare-app.s3-website-us-east-1.amazonaws.com/>
- _Git Repository URL_: <https://git.cs.dal.ca/malani/group35_csci5409>

## Authors

- [Kushang Arunbhai Mistry](kushang.mistry@dal.ca) - _(Maintainer)_
- [Mitul Pravinbhai Malani](mt215690@dal.ca) - _(Maintainer)_
- [Prit Atul Thakkar](prit.thakkar@dal.ca) - _(Maintainer)_

## Getting Started

See the following section for detailed step-by-step instructions on how to run this project locally and See deployment for notes on how to deploy the project on a live system.

### Prerequisites

To have a local copy of this tutorial up and running on your local machine, you will first need to install the following software

- [Node.js](https://nodejs.org/en/) - a JavaScript runtime (includes npm)
- [npm](https://docs.npmjs.com/about-npm) - a package manager for Node environment

### Installing

To get a development env running on local machine, run the following command in the project directory

Below command installs all the packages provided in package.json file into the folder called node_modules at the root of the project directory. You can see node_modules folder created at the root of the project directory when installation gets successful.

```
npm install
```

Below command runs the project in development mode. You can visit [http://localhost:3000](http://localhost:3000) to view it in your browser.

```
npm start
```

## Built With

- [React](https://reactjs.org/docs/getting-started.html) - A JS library for building UIs
- [React router dom](https://reactrouter.com/docs/en/v6/getting-started/installation) - A library for frontend routing for Single Page Application (SPA)
- [Material UI](https://mui.com/getting-started/installation/) - The React UI library
- [Amazon Cognito Identity](https://www.npmjs.com/package/amazon-cognito-identity-js) - Amazon Cognito Identity SDK for JavaScript
- [file-saver](https://www.npmjs.com/package/file-saver) - File saver library
- [js-cookie](https://www.npmjs.com/package/js-cookie) - A simple, lightweight JavaScript API for handling cookies
- [axios](https://www.npmjs.com/package/axios) - Promise based HTTP client for the browser and node.js

## Acknowledgments

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The following utility methods from lodash is used for debouncing and checking emptiness of object,

- “Npm: Lodash.Isempty,” npm. [Online]. Available: https://www.npmjs.com/package/lodash.isempty. [Accessed: 29-Mar-2022].
