# grace-shopper-team-fugees

Team Fugees' Grace-Shopper App!

### [Visit The App](https://grace-shopper-team-f.herokuapp.com/)

## Setup

Fork and Clone:

```bash
cd grace-shopper-team-f
# create a secrets file
./create_secrets "session secret" "google api client id" "google api client secret"

createdb grace-shopper-team-f
createdb grace-shopper-team-f-test

npm install
npm run seed
npm test

# start the server
npm run start-dev
```
