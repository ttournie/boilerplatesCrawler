Meteor.publish("search", function () {
    var self = this;

    var Github = Meteor.npmRequire('github');
    var github = new GitHub({
        version: "3.0.0",
        timeout: 5000
    });

    if(this.userId) {
        var user = Meteor.users.findOne(this.userId);
        var acount_info = Accounts.loginServiceConfiguration.findOne({
            service: 'github',
        });

        var tokken = user.services.github.accessToken;

        github.authenticate({
            type: "oauth",
            token: tokken,
        });

        github.user.get({}, function(err, res) {
        });

        var search_result = github.search.code({
            q: "reusables+in:path+user:nodeone+extension:info"
        });

        search = JSON.stringify(search_result);

        var searchs = [];

        _.each(search_result['items'], function(linetest) {

            var line = { name: linetest['name'],
                url: linetest['html_url']
            };
            searchs.push(line);
        });

        _.each(searchs, function(line) {
            self.added('search', Random.id(), line);
        });



        self.ready();

    }
});