function normalizeURL(url) {
    const urlObject = new URL(url);
    const host = urlObject.hostname;
    let path = urlObject.pathname;

    if (path.endsWith('/')) {
        path = path.slice(0,-1)
    };

    return `${host}${path}`
};

const { JSDOM } = require('jsdom');

function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody);
    const document = dom.window.document;

    const aTags = document.querySelectorAll('a')
    const links = []

    for (let tag of aTags) {
        let link = tag.href;
        if (link.startsWith('/')) {
            link = `${baseURL}${link}`;
        }
        links.push(link)
    }

    return links
};

module.exports = {
    normalizeURL,
    getURLsFromHTML
}