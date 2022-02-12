// Run tests with:
//  $ node tests.js

const assert = require('assert');
const https = require('https');

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const {extract} = require(__dirname + '/src/extract.js');

const URL = 'https://news.ycombinator.com/item?id=30055031';
https.get(URL, resp => {
    let data = '';
    resp.on('data', chunk => {
        data += chunk;
    });
    resp.on('end', () => {
        const dom = new JSDOM(data);
        const extracted = extract(dom.window.document);
        assert.notEqual(extracted, null);
        const {items, tbody} = extracted;
        assert.equal(items.length, 2);  // temporarily wrong
        const sortedItems = [...items].sort((a, b) => a.name.localeCompare(b.name));
        assert.equal(sortedItems[0].name, 'Linux');
        assert(sortedItems[0].score >= 247);
        assert.equal(sortedItems[1].name, 'MacOS');
        assert(sortedItems[1].score >= 172);
        assert.equal(sortedItems[2].name, 'Windows');
        assert(sortedItems[2].score >= 115);
        assert.equal(tbody.children.length, 9);
    });
}).on('error', err => {
    assert.fail(err.message);
});
