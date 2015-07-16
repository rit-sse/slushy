var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var http       = require('http').Server(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port   = process.env.PORT || 8080;
var router = express.Router();

// all commands are listed here.
// must match the directory and file (without .js extension) names in
// the commands/ directory (e.g. 'help' => commands/help/help.js)
var commandsToLoad = [
    'whois'
];

var commands = {};
commandsToLoad.forEach(function (command) {
    commands[command] = require('./commands/' + command + '/' + command);
});

// help is kind of a meta command, so it's here and not in commands/
commands.help = {
    run : function (metadata, args) {
        var helpText = '';

        if (args && args.length) {
            helpText = commands[args[0]] ? commands[args[0]].help(true) :
                '`' + args[0] + '` is not a valid command. Type `sse help` ' +
                'to see a list of available commands.';
        } else {
            helpText = 'Use `/sse help <command>` for usage instructions. ```';
            for (var name in commands) {
                if (commands.hasOwnProperty(name)) {
                    helpText += name + ' - ' + commands[name].help() + '\n';
                }
            }
            helpText += '```';
        }
        return helpText;
    },

    help : function (usage) {
        if (usage) {
            return '```/sse help [command]```' +
                'Use `/sse help` for a list of available commands, ' +
                'and `/sse help <command>` for more detailed information on ' +
                'a specific command.';
        }

        return 'Displays a list of available commands, and a short ' +
            'description of what they do.';
    }
}

router.route('/sse')
    .post(function (req, res) {
        var metadata = {
            channelId : req.body.channel_id,
            channelName : req.body.channel_name,
            userId : req.body.user_id,
            userName : req.body.user_name
        };

        var args = req.body.text && req.body.text.split(' '),
            command = args && args.splice(0, 1);

        console.log('Command: ' + command);
        console.log('Args: ' + args);

        if (!command) {
            // user gave no command (just typed /sse)
            res.send('Welcome to the Society of Software Engineers at RIT\'s' +
                ' Slack network! The /sse command is full of awesome stuff. ' +
                'Type `/sse help` to see what you can do.');
        } else if (!commands[command]) {
            res.send('`' + command + '` is not a valid command. Type `/sse ' +
                'help` to see a list of available commands.');
        } else {
            var result = '`/sse ' + req.body.text + '`\n';
            result += commands[command].run(metadata, args);
            res.send(result);
        }
    });

app.use(router);

http.listen(port, function () {
    console.log('Listening on port: ' + port);
});
