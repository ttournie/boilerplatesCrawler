Meteor.subscribe('gists');

Template.gists.helpers({
    items : function () {
        return Gists.find().fetch();
    }
});