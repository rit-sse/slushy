# create the boilerplate for a new command
# Usage: ./create-new-command.sh <command name> [--with-data]
# (--with-data) to create corresponding JSON file in command's directory

usage_options() {
    printf "Usage: ./create-new-command.sh <command name> [--with-data]\n"
}

if [ -d  "./src/js/commands/$1" ]; then
    printf "\ncommand '$1' already exists at src/js/commands/$1\n\n" 
    exit 0
fi

if [ "$2" != "" ] && [ "$2" != "--with-data" ]; then
    printf "\nfatal: unrecognized option $2\n"
    usage_options
    exit 0
fi

mkdir ./src/js/commands/$1

if [ "$2" == "--with-data" ]; then
    echo "{}" > ./src/js/commands/$1/$1.json
    printf "var data = require('./$1.json');\n\n" | cat - ./src/js/commands/__command-template/__command-template.js > ./src/js/commands/$1/$1.js
    printf "\nNew data file for $1 at ./src/js/commands/$1/$1.json"
else
    cat ./src/js/commands/__command-template/__command-template.js > ./src/js/commands/$1/$1.js
fi

printf "\nNew JS file for $1 at ./src/js/commands/$1/$1.js (with instructions as comments)\n\n"
