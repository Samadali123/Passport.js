var express = require('express');
var router = express.Router();
const usermodel = require(`./users`);
const passport = require('passport');
const localStrategy = require(`passport-local`);

passport.use(new localStrategy(usermodel.authenticate()));


/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('index');

});


router.get(`/profile`, function(req, res, next) {
    res.send("register successfully ")

})


router.post(`/register`, function(req, res, next) {
    var newUser = new usermodel({
        username: req.body.username,
        email: req.body.email,

    })

    usermodel.register(newUser, req.body.password)
        .then(function() {
            passport.authenticate('local')(req, res, function() {
                res.redirect(`/profile`);
            })
        })

})


router.post(`/login`, passport.authenticate('local', {
    successRedirect: `/profile`,
    failureRedirect: `/`,

}), function(req, res, next) {})




router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});


function IsLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect(`/`);
}



module.exports = router;