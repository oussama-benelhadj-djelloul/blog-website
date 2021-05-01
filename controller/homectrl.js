exports.ShowBlogs = function (req, res) {
    const Blog = {
        title: 'First thing',
        content: 'this is the first blog has been written in the backend'
    }
    res.render('index', { blog: Blog })
}