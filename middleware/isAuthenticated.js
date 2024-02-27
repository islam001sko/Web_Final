module.exports = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    } else {
        // Redirect to login page or send an error
        // return res.redirect('/login');
        return res.status(401).send('You must be logged in to perform this action.');
    }
};