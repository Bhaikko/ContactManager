const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Users = require("./database/sqlDatabaseHandler").Users;

passport.use(
    new LocalStrategy(function (loginUsername, loginPassword, done)
    {
        Users.findOne({
            where: {
                username: loginUsername 
            }
        })
        .then(function(user)
        {
            if(!user)
                return done(new Error("Username Invalid"));

            if(user.password != loginPassword)
                return done(null, false);

            done(null, user);
        })
        .catch(done);
    })
);

passport.serializeUser(function(user, done)
{
    done(null, user.id);
});

passport.deserializeUser(function(userId, done)
{
    Users.findOne({
        where: {
            id: userId 
        }
    })
    .then(function(user)
    {
        done(null, user);
    })
    .catch(done);
})

module.exports = passport;

