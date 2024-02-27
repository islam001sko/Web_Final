const getHomePage = async (req, res, next) => {
    const isLoggedIn = req.session.user ? true : false;
    const user = req.session.user ? req.session.user : {}; 
    req.session.save();
    res.render('home', {
        user: user,
        isLoggedIn: isLoggedIn
    });
}

module.exports = {
    getHomePage
};