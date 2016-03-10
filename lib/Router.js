Router.configure({
    layoutTemplate: 'mainLayout'
});
Router.route('/', {
    name: 'index'
});
Router.route('/gists', {
    name: 'gists'
});