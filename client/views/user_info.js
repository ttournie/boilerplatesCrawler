// User helpers.
Template.user_loggedin.helpers({
    // get the current user.
    user: function () {
        console.log(Meteor.user());
        return  Meteor.user();
    }
});

// User event.
Template.user_loggedin.events({
    "click #logout": function(){
        Meteor.logout();
    }
});