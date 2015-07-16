// until we get all that DB stuff figured out
var data = {
    'fall15' : {
        'president' : 'John Renner (president@sse.se.rit.edu)',
        'vice president' : 'Brian Besmanoff (vp@sse.se.rit.edu)',
        'treasurer' : 'Ben Kantor (treasurer@sse.se.rit.edu)',
        'secretary' : 'Jesse Jurman (secretary@sse.se.rit.edu)',
        'mentoring' : 'Matt Mokary (mentoring@sse.se.rit.edu)',
        'projects' : 'John Grischuk (projects@sse.se.rit.edu)',
        'events' : 'Wade Mauger (events@sse.se.rit.edu)',
        'fundraising' : 'Justin Peterson (fundraising@sse.se.rit.edu)',
        'technology' : 'Craig Cabrey (technology@sse.se.rit.edu)',
        'winter ball' : 'Kayla Nussbaum (winterball@sse.se.rit.edu)',
        'pr' : 'Dominic Cicilio (pr@sse.se.rit.edu)',
        'lab ops' : 'Matt Smicinski (labops@sse.se.rit.edu)'
    }
};

var CURRENT_TERM = 'fall15';

var api = {
    run : function (metadata, args) {
        var position = args.join(' '),
            returnText = '';

        if (data[CURRENT_TERM][position]) {
            returnText = position + ': ' + data[CURRENT_TERM][position]
        } else {
            returnText = 'Unrecognized position: ' + position +
                '. Type `/sse help whois` to see all positions.';
        }

        return returnText;
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
