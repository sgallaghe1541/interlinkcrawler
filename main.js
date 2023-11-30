const { argv } = require('node:process');

function main() {
    if (argv.length < 3) {
        console.log('Not enough arguments included');
        return
    } else if (argv.length > 3) {
        console.log('Too many arguments included');
        return
    } else {
        const baseURL = argv[2];
        console.log(`Crawler started at ${baseURL}`);
        return
    }

}

main()