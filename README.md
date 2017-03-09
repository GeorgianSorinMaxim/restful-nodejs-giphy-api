# Giphinator

#### Requirements:
- Nodejs (at least v5)
- npm

#### Install:
  - Navigate to your project folder
  - Install dependencies
    `npm install`
  - Install jshint & jscs (in the project or globally).
    `npm install jscs -g`
    `npm install jshint -g`
  - Install pg (https://www.npmjs.com/package/pg) as the Postgres client
    `npm install pg --save`
  - Install giphy-api (https://github.com/austinkelleher/giphy-api#browser-build) for making the API calls to giphy
    `npm install giphy-api --save`
  - Install Supertest
    `npm install supertest --save-dev`
  - Install Mocha
    `npm install mocha --save-dev`
  - Install should
    `npm install should --save-dev`
  - Install assert
    `npm install assert --save-dev`

#### Run the app:
  - Run migrations on your postgres instance
    `DATABASE_URL={YOUR_POSTGRES_DATABASE_URL} npm run migrations`
  - Run the application
    `DATABASE_URL={YOUR_POSTGRES_DATABASE_URL} PORT={YOUR_PORT} npm start`

#### Instructions
This API should query the giphy API for any provided query string. This data should be cached on a PostgreSQL database using the provided migrations and schemas.

 - The `./lib/handlers/giphinate.js` handler calls the giphy API and return the first GIF URL in the response. The data is cached in the PostgreSQL database so the next time the same query is used, the GIF URL is returned from the database instead of the Giphy API.
 - A `DELETE` route and controller deletes the record associated with the query text sent up.
 - A `INSERT` route and controller inserts a new record if the query is new.
 - A `GET` route and controller returns the gif url if the query is existent.
 - A set of tests for each endpoint have been included in the ./lib/tests/unit.js.

### Implementation details:
- I have used ElephantSQL as the Postgres instance. The Db url is:
  `postgres://clnfnefw:ZpUJXBSY_TaG1Qlh-65jW8IEWsuJIWbq@babar.elephantsql.com:5432/clnfnefw`

- Depending on your NodeJs version, you might run in an issue when first running the code:
  `deprecated bodyParser: use individual json/urlencoded middlewares`
- In order to solve this issue include in the ./index.js file the following:
  `app.use(bodyParser.json())`
  `app.use(bodyParser.urlencoded({extended: true}))`

- I ran jscs and jshint on ./index.js and on the files contained in ./lib/handlers.

- For unit test coverage, Mocha, the JavaScript test framework (https://mochajs.org/) + Supertest (https://www.npmjs.com/package/supertest) are used. There are a number of unit tests are placed in the ./lib/tests/unit.js file. See the steps below on how to run the tests.


## Run the unit tests:
 - In a terminal window (iTerm) go to the project folder and start the app using:
  `cd YOUR_FOLDER_PATH`
  `DATABASE_URL={YOUR_POSTGRES_DATABASE_URL} npm run migrations`
 - Open a new terminal window (iTerm) and go to the path of the cloned folder using the command:
  `cd YOUR_FOLDER_PATH`
 - Go to the tests folder using the command:
  `cd lib/tests`
 - Run the tests using:
  `mocha unit`


## See below the steps on how to test the API using Postman: 	
	- Install Postman in Google Chrome  (https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en)

	- Go to the project folder and start the app using:
    `cd YOUR_FOLDER_PATH`
    `DATABASE_URL={YOUR_POSTGRES_DATABASE_URL} npm run migrations`

  - For testing the giphenate, use the GET request on the following url: http://localhost:3000/YOUR-TEXT-HERE. Run the request, the gif URL will be returned. If the query string is new, the gif will be inserted and its url returned, otherwise the already inserted gif url will be returned.

  - For deleting a gif, use the DELETE request on the following url: http://localhost:3000/YOUR-TEXT-HERE. Run the request, the gif will be deleted if existent.

  - For getting the url of a gif saved in the Db using the query text, use the GET request on the following url: http://localhost:3000/YOUR-TEXT-HERE. Run the request, a the gif will be returned if existent.

  - For inserting a new gif in the Db using the query text, use the POST request on the following url: http://localhost:3000/YOUR-TEXT-HERE. Run the request, a the gif will be inserted if not existent.
