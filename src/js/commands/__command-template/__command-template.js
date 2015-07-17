var api = {
    run : function (metadata, args) {
        // 'metadata' contains information about the context in which your
        // command was called, and contains the fields channelId,
        // channelName, userId, userName
        // 'args' contains arguments passed to your command, for example if the
        // call was '/sse your-command hello world' args would contain:
        // ['hello', 'world']

        var returnText = '';

        // do whatever the command needs to do here, and put the text that
        // should be displayed to the caller in returnText

        return returnText;
    },

    help : function (usage) {
        if (usage) {
            // this help text is shown when someone calls /sse help your-command
            // it should contain detailed usage instructions
            return '';
        }

        // this help text is shown as a short summary of your command in the
        // '/sse help' list of commands. It should be a one-sentence,
        // high-level description of what your command does.
        return '';
    }
};

module.exports = api;
