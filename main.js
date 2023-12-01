const { argv } = require('node:process');
const { crawlPage } = require('./crawl.js');
const { printReport } = reqire('./report.js');

async function main() {
    if (argv.length < 3) {
        console.log('Not enough arguments included');
        return
    } else if (argv.length > 3) {
        console.log('Too many arguments included');
        return
    } else {
        const baseURL = argv[2];
        console.log(`Crawler started at ${baseURL}`);

        let pages = {};
        pages = await crawlPage(baseURL, baseURL, pages);
        console.log(pages)
    }

}

main()