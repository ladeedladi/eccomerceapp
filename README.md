
To run this project (5th step is super important)
Please make the following changes

1) Install all the node modules
2)Make a MySQL database and connect in the utils/database.js by entering your own credentials(username an password)

3)Now install node modules via (npm i)
4)Start the package via npm start
5)VVV Important - The templating engine frontend would not work when post request is made. To make it work make a small  change in app.js

    From

// app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

    To

app.use(bodyParser.urlencoded());
//app.use(bodyParser.json());

6)To make the bodyparser parse json object which you send via post request do the opposite

 From

app.use(bodyParser.urlencoded());
//app.use(bodyParser.json());

    To

//app.use(bodyParser.urlencoded());
app.use(bodyParser.json());