var trimInput = function(val) {
  return val.replace(/^\s*|\s*$/g, "");
};

var checkPassword = function(password) {
  if(password.length >= 6){return true};
  return false;
}

if (Meteor.isClient) {

  Meteor.Router.add({
    '/yo': 'yo',
    '/': '/',
    '*': 'not_found'
  });

  Meteor.Router.filters({
    'checkLoggedIn': function(page) {
      if (Meteor.loggingIn()) {
        return 'wait a sec yo.';
      } else if (Meteor.user()) {
        return page;
      } else {
        return 'signin';
      }
    }
  });

  Meteor.Router.filter('checkLoggedIn');

  Template.signin.events = {
    'click input.submit' : function (e, t) {

      var user = t.find('.username').value;
      var password = t.find('.password').value;
      var email = trimInput(t.find('.email').value);
      var userOptions = {
        username : user,
        password : password,
        email : email,
        profile : {
          name: 'howard',
          age: 12
        }
      }
      console.log(email);
      e.preventDefault();

      if(checkPassword){
        Accounts.createUser(userOptions, function(err){
          if(err){throw err};
          console.log(user);
          return user;
        });
      }
    }
  }

}
