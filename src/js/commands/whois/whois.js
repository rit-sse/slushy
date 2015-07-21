var getWhoisResponse = function (api, position, callback) {
    api.Officers.all({ position : position }, function (err, res) {
        if (res.body.length === 0) {
            callback('Unrecognized position: ' + position + '. Type `/sse ' +
                'help whois` to see all positions.');
        } else {
            var officer = res.body[0];

            api.Members.one(officer.member_id, function (err, res) {
                var member = res.body;

                callback(position + ': ' + member.first_name + ' ' +
                    member.last_name);
            });
        }
    });
};

var api = {
    run : function (metadata, args, callback, api) {
        var position = args.join(' ');

        if (position.length) {
            getWhoisResponse(api, position, callback);
        } else {
            callback(this.help(true));
        }
    },

    help : function (usage) {
        if (usage) {
            return '```/sse whois <position>``` ' +
                '`<position>` can be any of the following SSE positions:\n' +
                'president, vice president, treasurer, secretary, mentoring' +
                ', projects, events, fundraising, technology, winter ball, ' +
                'pr, lab ops';
        }

        return 'Look up names and contact info of primary officers and ' +
            'committee heads within the SSE';
    }
};

module.exports = api;
