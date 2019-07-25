const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Admins = require("./database/sqlDatabaseHandler").Admins;

passport.use(
    new LocalStrategy(function (username, password, done)
    {
        Admins.findOne({
            where: {
                username 
            }
        })
        .then(function(admin)
        {
            if(!admin)
                return done(null, false, {message: "No Username Exists"});

            if(admin.password != password)
                return done(null, false, {message: "Wrong Password"});

            done(null, admin);
        })
        .catch(done);
    })
);

passport.serializeUser(function(admin, done)
{
    done(null, admin.id);
});

passport.deserializeUser(function(adminId, done)
{
    Admins.findOne({
        where: {
            id: adminId 
        }
    })
    .then(function(admin)
    {
        done(null, admin);
    })
    .catch(done);
})

module.exports = passport;

