const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n' , (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Maintenance page',
//         welcomeMessage: "We're working to be back as soon as possible."
//     });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

//req = Request
//res = Response
app.get('/', (req, res) => {
    // // res.send('<h1>Hello Express!</h1>');
    // res.send({
    //     name: 'Matheus Brasil',
    //     likes:[
    //         'Movies',
    //         'Games',
    //         'food'
    //     ]
    // });
    res.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMessage: 'Welcome to my blog.'
    });
});

app.get('/about', (req, res) => {
    // res.send('About page.');
    res.render('about.hbs', {
        pageTitle: 'About page'
    });
});

app.get('/bad', (req, res) => {
    res.status(500).send({
        errorMessage: 'Error!'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});