
Meteor.subscribe('search');



Template.index.helpers({
    items : function () {
        return Search.find().fetch();
    }
});

Template.index.events({
    'click button': function () {
        // increment the counter when button is clicked
        Session.set('counter', Session.get('counter') + 1);
    }
});