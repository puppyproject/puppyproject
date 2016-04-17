var request = require('request'),
    qs = require('querystring'),
    makeSendtoken = require('./jwt.js'),
    User = require('../schemas/User.js');

module.exports = function(req, res){
  var accessTokenUrl = "http://graph.facebook.com/oauth/access_token";
  var graphApiUrl = "http://graph.facebook.com/me";

  var params = {
    client_id: req.body.clientId,
    redirect_uri:req.body.redirectUri,
    client_secret:config.FACEBOOK_SECRET,
    code:req.body.code
  };

  request.get({
       url:accessTokenUrl,
       qs:params
     },
       function(err, res, accessToken){
        accessToken = qs.parse(accessToken);

        request.get({url:graphApiUrl,
           qs:accessToken,
           json:true
         },
           function(err, res, profile){
             User.findOne({facebookId: profile.id}, function(err, existingUser){
               if(existingUser)
                return makeSendtoken(existingUser, res);

              var newUser = new User();
              newUser.facebookId = profile.id;
              newUser.save(function(err){
                makeSendtoken(newUser, res);
              });

             });
          });
  });

};
