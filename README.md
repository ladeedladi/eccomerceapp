
To run this project (5th step is super important) <br />
Please make the following changes <br />

1) Install all the node modules <br />
2)Make a MySQL database and connect in the utils/database.js by entering your own credentials(username an password) <br />

3)Now install node modules via (npm i) <br />
4)Start the package via npm start <br />
5)VVV Important - The templating engine frontend would not work when post request is made. To make it work make a small  change in app.js <br />

    From

// app.use(bodyParser.urlencoded()); <br />
app.use(bodyParser.json()); <br />

    To

app.use(bodyParser.urlencoded()); <br />
//app.use(bodyParser.json()); <br />

6)To make the bodyparser parse json object which you send via post request do the opposite <br />

 From

app.use(bodyParser.urlencoded()); <br />
//app.use(bodyParser.json()); <br />

    To

//app.use(bodyParser.urlencoded()); <br />
app.use(bodyParser.json()); <br />