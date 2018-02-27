# Conflist
Website displaying recent and future conferences info. [https://conflist.devlabs-projects.info/](https://conflist.devlabs-projects.info/)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).


## Installing
To install the project run:

```
npm install
```

You need to create a config.js file in the src folder containing url's used in the project from config-template.js:

```
baseUrl = `https://api.conflist.devlabs-projects.com/`;
loginUrl = `${baseUrl}auth/twitter?returnUrl=http://localhost:3000/gate`;
```
The config.js file is added in .gitignore.

## Run

First build css:

```
npm run build-css
```

And run the project with:

```
npm start
```

## Contributing

This is an open source project, so if you want to contribute you need to:

```
1. git clone
2. npm install
3. npm run watch-css
4. npm start
```
