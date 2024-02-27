module.exports = (req, res, next) => {
    if (req.session.user && req.session.user.admin) {
        next();
    } else {
        res.status(403).send("Access denied. Admin only.");
    }
}
