const express = require('express');
const app = express();
//the sessions var
const session = require('express-session');
const router = require('./router/router')
const homectrl = require('./controller/homectrl')
const Article = require('./model/blog')
const bodyParser = require('body-parser')
const path = require('path')
const moment = require('moment');
const port = process.env.PORT || 3000;



// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//Public folders
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))


app.set('view engine', 'ejs')

moment.suppressDeprecationWarnings = true;

require('./model/db')();

//session variables
app.use(session({
    secret: 'sectegedfvrfgfrhgbfgbfg',
    resave: false,
    saveUninitialized: true
}))



app.get('/', function (req, res) {
    console.log(req.session)
    Article.find({}, function (err, resultat) {
        //.then(resultat => res.json(resultat))
        //.catch(err => res.status(400).json('Error: ' + err))
        if (err) {
            console.log("we couldn't get it from base")
            console.log(err)
        } else {
            res.render('index', { article: resultat, sess: req.session.user })
            //res.json(resultat)moment(dueDate, 'DD-MM-YYYY').format('DD-MMM');
        }
    }).sort({ date: "desc" })
})

app.use('/djoussadmin', router)

app.get('/article/:id', function (req, res) {
    console.log(req.params.id)
    Article.findById(req.params.id, function (err, resultat) {
        if (err) {
            console.log("we couldn't get it from base")
            console.log(err)
        } else (
            res.render('articlePage', { article: resultat })
        )
    })
})

app.get('/article/:id', function (req, res) {
    console.log(req.params.id)
    Article.findById(req.params.id, function (err, resultat) {
        if (err) {
            console.log("we couldn't get it from base")
            console.log(err)
        } else (
            res.render('articlePage', { article: resultat })
        )
    })
})

app.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            res.send('error');
        } else {
            res.redirect('/')
        }
    });

})

//app.get('/blogs', function (req, res) {})

app.get('/article/edit/:id', function (req, res) {
    Article.findById({ _id: req.params.id }, function (err, resultat) {
        if (err) {
            console.log("we couldn't get it from base")
            console.log(err)
        } else (
            res.render('blogForm', { articleID: resultat._id })
        )
    })
})

app.get('/article/delete/:id', function (req, res) {
    Article.deleteOne({ _id: req.params.id }, function (err, resultat) {
        if (err) {
            console.log("we couldn't delete it from base")
            console.log(err)
        } else {
            res.redirect('/')
            //res.json({})
        }

    })
})

app.listen(port)
