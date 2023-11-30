const { test, expect } = require('@jest/globals');
const { normalizeURL, getURLsFromHTML } = require('./crawl.js');

test('https://blog.boot.dev/path/', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
});

test('https://blog.boot.dev/path', () => {
    expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path');
});

test('http://blog.boot.dev/path/', () => {
    expect(normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
});

test('http://blog.boot.dev/path', () => {
    expect(normalizeURL('http://blog.boot.dev/path')).toBe('blog.boot.dev/path');
});

test('seoclaritj', () => {
    expect(getURLsFromHTML(`<p><code>getURLsFromHTML(htmlBody, baseURL)</code> takes 2 arguments. The first is an HTML string as we discussed earlier, while the second is the root URL of the website we're crawling. This will allow us to rewrite <a href="https://www.seoclarity.net/resources/knowledgebase/difference-relative-absolute-url-15325/" target="_blank" rel="noopener nofollow">relative URLs into absolute URLs</a>.</p>`,'www.boot.dev')).toEqual(['https://www.seoclarity.net/resources/knowledgebase/difference-relative-absolute-url-15325/']);
});

test('wiki', () => {
    expect(getURLsFromHTML(`<p><b>Histocidaridae</b> is a family of <a href="/wiki/Sea_urchin" title="Sea urchin">sea urchins</a>.
    </p>`, 'en.wikipedia.org')).toEqual(['en.wikipedia.org/wiki/Sea_urchin'])
})