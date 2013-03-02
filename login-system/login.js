var trimInput = function(val) {
  return val.replace(/^\s*|\s*$/g, "");
};

var checkPassword = function(password) {
  if(password.length >= 6) {return true};
  return false;
};

if (Meteor.isClient) {

  Meteor.Router.add({
    '/': 'home',
    '/signin': 'signin',
    '*': 'not_found'
  });

  Meteor.Router.filters({
    'checkLoggedIn': function(page) {
      if (Meteor.loggingIn()) {
        return 'wait a sec yo.';
      } else if (Meteor.user()) {
        return page;
      } else {
        return 'login';
      }
    }
  });

  Meteor.Router.filter('checkLoggedIn', {only: 'home'});

  Template.signin.events = {
    'click input.submit' : function (event, target) {

      var user = target.find('.username').value;
      var userOptions = {
        username : user,
        password : target.find('.password').value,
        email : trimInput(target.find('.email').value),
          profile : {
            name: target.find('.name').value
          }
      };

      if(checkPassword){
        Accounts.createUser(userOptions, function(err){
          if(err){throw err};
          return user;
        });
      }
      event.preventDefault();
      Meteor.Router.to('/');
    }
  };

  Template.login.events = {
    'click input.submit' : function (event, target) {
      Meteor.loginWithPassword(target.find('.username').value, target.find('.password').value);
    }
  }

  Template.home.events = {
    'click .logout' : function (event) {
      Meteor.logout();
      event.preventDefault();
    },

    'click input' : function (event) {
      console.log(event);
    }
  }

  var remove = function(){
    Meteor.users.allow(remove);
    Meteor.users.remove({});
  };
}


