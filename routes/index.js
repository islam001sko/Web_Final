module.exports = function (app) {
    app.get('/', function (req, res) {
        res.redirect('./home');
    });

    // app.use('/search', require('./search'));
    // app.use('/profile', require('./profile'));
    // app.use('/borrow', require('./borrow'));
    // app.use('/quick_borrow', require('./quick_borrow'));

};