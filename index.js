const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

var app = express();

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


// parse application/x-www-form-urlencoded

app.get('/', function(req, res) {
    res.render('home');
});

app.listen(3000);
// var port = process.env.PORT || 3001;
// app.listen('port', function() {
//     console.log("Server running at http://localhost:" + port + "/");
// })
