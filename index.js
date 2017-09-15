const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/test";
const Models = require("./model");
const models = Models(mongoURL);



var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

app.use(express.static('public'));

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: 'hbs'
}));
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
    res.render('home');
});

app.post('/', function (req, res) {
    var regNum = req.body.name;
    var registrations = "";
    registrations = regNum;
      res.render('home', {
          regNumber: registrations
      })
});


app.listen(3000);
// var port = process.env.PORT || 3000;
// app.listen('port', function() {
//     console.log("Server running at http://localhost:" + port + "/");
// })
