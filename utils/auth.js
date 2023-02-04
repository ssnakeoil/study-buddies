const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
    } else {
        next();
    }
};
const isAdmin = (req, res, next) => {
    if (!req.session.logged_in && !req.session.isAdmin) {
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
module.exports = { withAuth, isAdmin, noSession };

// This file does not need to be modified
