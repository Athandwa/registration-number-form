const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const flash = require('express-flash');
const session = require('express-session');
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

app.use(session({
    secret: 'keyboard cat',
    cookie: {
        maxAge: 60000 * 30
    }
}));
app.use(flash());

app.use(express.static('public'));

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: 'hbs'
}));
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
    res.render('home');
});

app.post('/', function(req, res) {
    var regNum = req.body.name;
    var regButtons = req.body.name;
    var registrations = "";

    models.regModel.create({
        name: regNum
    }, function(err) {
        if (err) {
            if (err.code === 11000) {
                // req.flash("error", "Hey the number plate has already been entered, please try another one");
                models.regModel.findOne({
                    name: regNum
                }, function(error) {
                    if (error) {
                        console.log(error);
                    } else {
                        models.regModel.find({}, function(err, results) {
                            if (err) {
                                console.log(err);
                            } else {
                                res.render('home', {
                                    regNumber: results
                                });
                                //console.log(results);
                            }
                        })
                    }
                })

            }
            // res.redirect("/")
        }
    })
});

app.post('/filter', function(req, res) {
    var RegNumbers = req.body.RegNumbers;

    models.regModel.find({
        name: {
            $regex: RegNumbers
        }
    }, function(err, platesResults) {
        if (err) {
            console.log(err);
        } else {
            console.log(platesResults);
            res.render('home', {
                regNumber: platesResults
            })
        }
    })
});


app.post('/All', function(req, res) {
    models.regModel.find({}, function(err, all) {
        if (err) {
            return err;
            console.log(err);
        }
        console.log(all);
        res.render('home', {
            regNumber: all
        })
    })
});


app.listen(3000);

// var port = process.env.PORT || 3000;
// app.listen('port', function() {
//     console.log("Server running at http://localhost:" + port + "/");
// })
