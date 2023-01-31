const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
    } else {
        next();
    }
};

const noSession = (req, res, next) => {
    if (req.session.logged_in) {
        res.redirect('/')
    } else {
        next();
    }
}
module.exports = { withAuth, noSession };

// This file does not need to be modified
