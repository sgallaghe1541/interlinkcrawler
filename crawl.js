function normalizeURL(url) {
    const urlObject = new URL(url)
    const host = urlObject.hostname
    let path = urlObject.pathname

    if (path.endsWith('/')) {
        path = path.slice(0,-1)
    }
    
    return `${host}${path}`
}

module.exports = {
    normalizeURL
}