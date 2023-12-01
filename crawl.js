function normalizeURL(url) {
    const urlObject = new URL(url);
    const host = urlObject.hostname;
    let path = urlObject.pathname;

    if (path.endsWith('/')) {
        path = path.slice(0,-1);
    };

    return `${host}${path}`
};

const { JSDOM } = require('jsdom');

function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody);
    const document = dom.window.document;

    const aTags = document.querySelectorAll('a');
    const links = [];

    for (let tag of aTags) {
        let link = tag.href;
        if (link.startsWith('/')) {
            link = `${baseURL}${link}`;
        }
        links.push(link);
    }

    return links
};

async function crawlPage(baseURL, currentURL, pages) {
    
    try {
        const currentURLObject = new URL(currentURL);
        const baseURLObject = new URL(baseURL);
        if (baseURLObject.hostname !== currentURLObject.hostname) {
            return pages;
        };

        const normCurrentURL = normalizeURL(currentURL);
        if (normCurrentURL in pages) {
            pages[normCurrentURL]++;
            return pages;
        };

        if (normCurrentURL === baseURL) {
            pages[normCurrentURL] = 0;
            return pages;
        };
        
        pages[normCurrentURL] = 1;
        
        
    } catch (err) {
        console.log(err.message);
        return pages;
    };

    console.log(`Crawling ${currentURL}`);

    const links = await fetch(currentURL, {
        mode: 'cors',
        method: 'GET',
        headers: {
            'content-type': 'text/html'
        }
    })
    .then((response) => {
        return new Promise((resolve, reject) => {
            if (response.status >= 400 && response.status < 500) {
                reject(`${response.status}: ${response.statusText}`);
            };

            const contentType = response.headers.get('content-type')
            if (!contentType.includes('text/html')) {
                reject(`Fetch did not receive valid HTML from ${response.url}.`);
            };
            resolve(response);
        });
    })
    .then((response) => response.text())
    .then((htmlBody) => {
        return getURLsFromHTML(htmlBody, baseURL);
    })
    .catch((err) => {
        console.error(err);
        return undefined
    });

    if (await links) {
        for (let link of links) {
            if (link) {
                pages =  await crawlPage(baseURL, link, pages)
            } else {
                return pages;
            };
        };
    }
    return pages;
    
};

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
};