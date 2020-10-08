passport.use(
  'token',
  new TokenStrategy(
    function (consumerKey, done) {
      Consumer.findOne({key: consumerKey}, function (err, consumer) {
        if (err) {
          return done(err);
        }
        if (!consumer) {
          return done(null, false);
        }
        return done(null, consumer, consumer.secret);
      });
    },
    function (accessToken, done) {
      AccessToken.findOne({token: accessToken}, function (err, token) {
        if (err) {
          return done(err);
        }
        if (!token) {
          return done(null, false);
        }
        Users.findById(token.userId, function (err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false);
          }
          // fourth argument is optional info.  typically used to pass
          // details needed to authorize the request (ex: `scope`)
          return done(null, user, token.secret, {scope: token.scope});
        });
      });
    },
    function (timestamp, nonce, done) {
      // validate the timestamp and nonce as necessary
      done(null, true);
    },
  ),
);
app.get('/api/me', passport.authenticate('token', {session: false}), function (
  req,
  res,
) {
  res.json(req.user);
});
