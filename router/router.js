const router = require('express').Router();
const adminctrl = require('../controller/adminctrl')
const bodyParser = require('body-parser')

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', adminctrl.loginAdmin);

router.get('/createBlog', function (req, res) {
    res.render('blogForm')
})
router.post('/publishBlog', urlencodedParser, adminctrl.publishBlog)

router.get('/login', function (req, res) {
    if (req.session.id) {
        res.redirect('localhost:3000/blogs')
    } else {
        res.render('loginAdmin')
    }
})


router.post('/login', urlencodedParser, adminctrl.loginMethod)




module.exports = router;