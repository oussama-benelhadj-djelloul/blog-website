const mongoose = require('mongoose')

const marked = require('marked')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

const Article = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String
    },
    content: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    markHtml: {
        type: String,
        required: true,
    }
})

Article.pre('validate', function (next) {
    if (this.content) {
        this.markHtml = dompurify.sanitize(marked(this.content))
    }
    next()
})


module.exports = mongoose.model('Article', Article)