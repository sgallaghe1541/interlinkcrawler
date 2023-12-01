function printReport(pages) {

    console.log('\n ------------------------------------------- \n');
    console.log('Start of report\n');

    const sortedPages = sortPages(pages);

    for (const [key, value] of Object.entries(sortedPages)) {
        console.log(` - Found ${value} internal links to ${key}`);
    };

    console.log('\nEnd of report\n');
    console.log(' ------------------------------------------- \n');
};

function sortPages(pages) {

    const pagesToSort = [];

    for (const [key, value] of Object.entries(pages)){
        pagesToSort.push([key, value]);
    };

    let sorting = true;

    while (sorting) {
        sorting = false;
        for (let i = 1; i < pagesToSort.length; i++) {
            if (pagesToSort[i-1][1] < pagesToSort[i][1]) {
                let temp = pagesToSort[i-1];
                pagesToSort[i-1] = pagesToSort[i];
                pagesToSort[i] = temp;
                sorting = true;
            };
        };
    };

    const sortedPages = {};

    for (let i = 0; i < pagesToSort.length; i++) {
        sortedPages[pagesToSort[i][0]] = pagesToSort[i][1];
    };

    return sortedPages;
};

module.exports = {
    printReport
};