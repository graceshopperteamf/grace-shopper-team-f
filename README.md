# Fugees

[Fugees](https://grace-shopper-team-f.herokuapp.com/) is an e-commerce website that allows guests and users to browse and purchase an eclectic collection of artwork seamlessly and securely.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- You have installed the latest version of [Node.js and NPM](https://nodejs.org/en/).
- You have a Windows/Linux/Mac machine.

### Installing and using

To get acclimated, follow the steps below:

1. Fork and clone this repository.
2. Run cd grace-shopper-team-f and npm install to install the necessary packages.
4. Create two Postgres databases by running:
```
createdb grace-shopper-team-f
createdb grace-shopper-team-f-test
```
3. Seed the database by executing npm run seed.
4. Create a secrets file that will contain the secret environment variables you will use by running ./create_secrets <session secret> <google api client id> <google api client secret>, where you would pass in the information as arguments.
You can also choose to manually create the file, which must be called secrets.js. It might look like something to the effect of:
```
process.env.GOOGLE_CLIENT_ID = 'hush hush'
process.env.GOOGLE_CLIENT_SECRET = 'pretty secret'
process.env.GOOGLE_CALLBACK = '/auth/google/callback'
```
5. To use OAuth with Google, go to the [Google APIs dashboard](https://accounts.google.com/signin/v2/identifier?service=cloudconsole&passive=1209600&osid=1&continue=https%3A%2F%2Fconsole.developers.google.com%2Fapis%2Fcredentials&followup=https%3A%2F%2Fconsole.developers.google.com%2Fapis%2Fcredentials&flowName=GlifWebSignIn&flowEntry=ServiceLogin) to get a real client ID and client secret supplied from Google.

## Running the tests

- To run the automated tests for this system, use the following:
```
npm run test
```
- The test specs in /server/db/models test each model for the fields and validation.
- The test specs in /server/api test the behavior of what should happen when various HTTP requests are made.
- The test specs in /client/components test whether or not the components are rendering properly with their passed in props.
- The test specs in /client/store test whether or not the actions dispatched are returning the appropriate, expected state.


## Deployment

- There are two supported ways to deploy this application:
1. Automatically through continuous deployment with Travis CI.
2. "Manually" from your local machine through the deploy script.

### Heroku

1. Set up the [Heroku command line tools](https://devcenter.heroku.com/articles/heroku-cli).
2. Run heroku login
3. Add a git remote for heroku. If you are creating a new app, run heroku create or heroku create your-app-name if you have a name in mind. Use heroku addons:create heroku-postgresql:hobby-dev to add ("provision"), a Postgres database to your Heroku dyno.
4. Run heroku git:remote your-app-name.

### Travis CLI

1. Create a new branch by running the following:
```
git checkout master
git pull
git checkout -b f/travis-deploy
```
2. Run the script to finish configuring travis.yml : npm run heroku-token, which will the previously configured Heroku CLI above to generate an authenticate token.
3. Run the following commands to commit these changes
```
git add .travis.yml
git commit -m 'travis: activate deployment'
git push -u origin f/travis-deploy
```
4. Make a pull request for the new branch, get it approved, and merge it into the master branch.

## Built With

* [React](https://reactjs.org/l) - The JavaScript library used for creating the user interface.
* [Redux](https://redux.js.org/) - The JavaScript library used to manage the state of an application.
* [Thunk](https://github.com/reduxjs/redux-thunk) - The JavaScript library used to handle asynchronous redux actions.
* [faker.js](https://github.com/marak/Faker.js/) - The JavaScript library used to generate fake data.
* [npm](https://www.npmjs.com/) - The package manager used to manage the various dependencies.
* [Material UI](https://material-ui.com/) - The framework used to design the user interface.
* [Heroku](https://www.heroku.com/) - The cloud platform used to build and deploy the application.
* [Travis CI](https://docs.travis-ci.com/) - The continuous integration service used to build and test this application.
* [Express](https://expressjs.com/) - The JavaScript library used to handle HTTP requests.
* [Sequelize](https://sequelize.org/) -  A promise-based Node.js Object-relational mapping used with Postgres.
* [Axios](https://github.com/axios/axios) - The JavaScript library used to make HTTP requests.
* [pg](https://node-postgres.com/) - The JavaScript library used to interface with your PostgreSQL database.
* [React-Redux](https://react-redux.js.org/) - The Redux User Interface binding library for React.
* [React-Router](https://reacttraining.com/react-router/) - The standard routing library for React that allows navigation without refreshing the page.
* [ESlint](https://eslint.org/) - The tool used to maintain code quality.
* [Prettier](https://prettier.io/) - The tool used to format code.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/graceshopperteamf/grace-shopper-team-f/tags).

## Authors

* **Andres Gomez** - *Initial work* - [tiredamage42](https://github.com/tiredamage42)
* **Asim Samuel** - *Initial work* - [lordofdorne](https://github.com/lordofdorne)
* **Claudia Saimbert** - *Initial work* - [Claudiathefirst](https://github.com/Claudiathefirst)
* **Kristy Li** - *Initial work* - [ahtae](https://github.com/ahtae)

See also the list of [contributors](https://github.com/graceshopperteamf/grace-shopper-team-f/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/graceshopperteamf/grace-shopper-team-f/blob/master/LICENSE) file for details

## Acknowledgments

* [David Patlut](https://github.com/dpatlut)
* [Erick Canals](https://github.com/EC7495)
* [Dan Abramov](https://github.com/gaearon) (for his [Building React Applications with Idiomatic Redux](https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage))
* [Billie Thompson](https://github.com/PurpleBooth) (for her [README.md](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2))
