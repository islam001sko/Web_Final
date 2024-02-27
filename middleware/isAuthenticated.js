module.exports = (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    } else {
        return res.status(401).send('You must be logged in to perform this action.');
    }
};