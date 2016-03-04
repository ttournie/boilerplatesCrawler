
Meteor.subscribe('search');



Template.index.helpers({
    items : function () {
        return Search.find().fetch();
    }
});