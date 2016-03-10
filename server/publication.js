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
            var repo = linetest['repository'];

            // Create a link to folder, not to file.
            var htlm_url = linetest['html_url']
            var htlm_array = htlm_url.split('/');
            htlm_array.pop();
            htlm_url = htlm_array.join('/');

            //remove extention from name
            var name = linetest['name']
            var name_array = name.split('.');
            name = name_array[0];


            var line = { name: name,
                url: htlm_url,
                repository: repo['name']
            };
            searchs.push(line);
        });

        _.each(searchs, function(line) {
            self.added('search', Random.id(), line);
        });



        self.ready();

    }
});