# SkycastApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.3. 
This app is hosted on Heroku at (https://sky-cast-app.herokuapp.com/).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
`ng serve` will not work in this application's case, as the data retrieved by the backend node server is necessary to get weather data. Instead, build the project using `ng build --aot=false -prod` and then run it using `node ./server.js` at the root level.