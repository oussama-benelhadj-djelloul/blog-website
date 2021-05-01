const Article = require('../model/blog')
const bodyParser = require('body-parser')

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

exports.loginAdmin = function (req, res) {
    if (req.session.user) {
        res.redirect('localhost3000/blogs')
    } else {
        console.log('log in now!');
        res.render('loginAdmin')
    }
}

exports.publishBlog = async function (req, res) {
    if (req.body.id == '') {
        const blog = new Article({
            title: req.body.title,
            author: req.body.author,
            content: req.body.content,
        });
        blog.save()
            .then(item => {
                //res.send("item saved to database");
                console.log('success save')
                res.redirect("http://localhost:3300/")
            })
            .catch(err => {
                res.status(400).send("unable to save to database" + err);
            });
    } else {
        Article.update({ _id: req.body.id }, req.body, { upsert: true }, function (err, results) {
            if (err) {
                console.log('database update error' + err);
            } else {
                console.log('update done');
                res.redirect('http://localhost:3300/');
            }
        })

    }


}

exports.loginMethod = function (req, res) {
    console.log(req.body)
    if (req.body.email = "admin" && req.body.password == "admin123") {
        req.session.user = req.body.email
        res.redirect('http://localhost:3300')
    }
}