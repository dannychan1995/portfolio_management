
# README

### Demo : https://portfolio-management-dannychan.herokuapp.com

## Getting Started
<div>
    <div style="font-size: 15px; padding: 20px 0px;">
        <div role="tabpanel" id="Portfolio">
            <h3>Portfolio</h3>
            <ol>
                <li>To start with, please <a href="https://portfolio-management-dannychan.herokuapp.com/signup">signup</a> first.</li>
                <li>You can create portfolio at <a href="https://portfolio-management-dannychan.herokuapp.com/portfolio">portfolio page</a>.</li>
                <li>Please input Name, Description, and initial cash amount.</li>
                <li>You can create multiple portfolio if you like.</li>
            </ol><img src="https://portfolio-management-dannychan.herokuapp.com/img/portfolio.png" width="70%" alt=""></div>
        <div role="tabpanel" id="Market" style="margin-top: 20px;">
            <h3>Market</h3>
            <ul>
                <li>You may explore the market in <a href="https://portfolio-management-dannychan.herokuapp.com/market">market page</a></li>
                <li>You can search any instrument by the symbol. The data is provided by <a target="brank" href="https://www.alphavantage.co/">Alpha Vantage</a>. </li>
                <li>If you would like to use your own API KEY, please modify MARKET_API_KEY in env file</li>
            </ul><img src="https://portfolio-management-dannychan.herokuapp.com/img/market.png" width="70%" alt=""></div>
        <div role="tabpanel" id="Order" style="margin-top: 20px;">
            <h3>Order</h3>
            <ul>
                <li>If you want to make a new order, you can just click order button in Market/ Portfolio Detail Page</li>
                <li>Fill in all information below and click confirm.</li>
            </ul><img src="https://portfolio-management-dannychan.herokuapp.com/img/order.png" width="30%" alt=""></div>
        <div role="tabpanel" id="Report" style="margin-top: 20px;">
            <h3>Report</h3>
            <ul>
                <li>In Portfolio Detail Page, you may find Valuation, Remaining Position and Transaction Record.</li>
                <li>If you want to deposit or withdraw cash from portfolio, you may click Cash Injection button.</li>
                <li>You can also add dividend for the specific instrument. The system will calculate the valuation for you.</li>
            </ul><img src="https://portfolio-management-dannychan.herokuapp.com/img/report.png" width="70%" alt=""></div>
    </div>
</div>

## Required Plugins for VS Code

You need to install the following plugins for VS Code.

### Debugger for Chrome

### ESLint

### Jest

### Prettier - Code formatter

## After checkout

Run the following commands

```shell
yarn install
```

## Setup your local MongoDB

To run the server locally, you need a connection to some MongoDB instance.

If you installed the MongoDB on your machine, you can start it with

```shell
mongod --dbpath /path/to/mongodb/storage/directory
```

Note that the `/path/to/mongodb/storage/directory` should exist and you have write permission to it.

## Configure your local .env file

In the `server` directory, you need to add one `.env` file.

You can follow the example in `.env.example` file.

- PORT
  - This is the port number that the server listens on
- FRONTEND_PORT
  - This is the port number that the frontend web server listens on. You only need to set this when you run this application locally
- SYSTEM_EMAIL_ADDRESS
  - This is the email address to be used as from-address when the application sends emails to users
- APPLICATION_NAME
  - This is the name of your application
- NODE_ENV
  - This needs to be set to 'production' in your production deployment environment. Set it to 'local' when you run the server locally.
- MONGODB_URI
  - If you run the server locally, you need to set this to your local MongoDB instance URI.
  - In Heroku, This should have been automatically set by Heroku when you add an `mLab` add-on
- SECRET
  - You need to choose a random secret to sign JWT tokens during authentication
- MAILGUN_API_KEY
  - To send emails via MAILGUN service, you need to register one account on MAILGUN and get an API key
- MAILGUN_DOMAIN
  - This is your MAILGUN domain (you can find it at https://app.mailgun.com/app/domains)

## Start both client and server locally

```shell
yarn start
```

## Deploy to Heroku

This project follows the setup as described in [Running Create React App and Express (CRAE) on Heroku](https://originmaster.com/running-create-react-app-and-express-crae-on-heroku-c39a39fe7851), except that I didn't use babel on the server side.

You can follow the steps below to deploy this application to Heroku.

### Steps

1. Create a new application on heroku and link it with the github repository

2. configure a new add-on for MongoDB (e.g. the one from mLab)

3. configure environment variables in Heroku application settings

You need to configure the environment variables you have put in the `server/.env` file, except for `PORT` and `FRONTEND_PORT`

4. deploy the application

### Deployment Script

```shell
// navigate to the root of your project
// login to Heroku (if you aren't already)
heroku login

// create your heroku project, make sure to replace name-of-my-app, // with the actual name of your app. Note, this name must be unique // across of all heroku.
heroku create name-of-my-app

// add the latest nodejs build pack to our project
heroku buildpacks:set https://github.com/heroku/heroku-buildpack-nodejs#yarn

// add mongodb add-on
heroku addons:create mongolab:sandbox

// set environment variables

heroku config:set NODE_ENV=production
heroku config:set SECRET=choose_your_secret_for_jwt_token_signing
heroku config:set MAILGUN_API_KEY=your_mailgun_api_key
heroku config:set MAILGUN_DOMAIN=your_mailgun_domain
heroku config:set SYSTEM_EMAIL_ADDRESS=no-reploy@yourdomain.com
heroku config:set APPLICATION_NAME=yourdomain.com

// push our code to heroku.  This step will take the longest
git push heroku master
// let's launch your app
heroku open
```
