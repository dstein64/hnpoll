// Run tests with:
//  $ node tests.js

const assert = require('assert');
const https = require('https');

const jsdom = require('jsdom');
const {JSDOM} = jsdom;

const {extract} = require(__dirname + '/src/extract.js');

const url = 'https://news.ycombinator.com/item?id=42836273';
https.get(url, resp => {
    assert.equal(resp.statusCode, 200);
    let data = '';
    resp.on('data', chunk => {
        data += chunk;
    });
    resp.on('end', () => {
        const dom = new JSDOM(data);
        const extracted = extract(dom.window.document);
        assert.notEqual(extracted, null);
        const {items, tbody} = extracted;
        assert.equal(items.length, 2);
        const sortedItems = [...items].sort((a, b) => a.name.localeCompare(b.name));
        assert.equal(sortedItems[0].name, 'Rust');
        assert(sortedItems[0].score >= 7);
        assert.equal(sortedItems[1].name, 'Zig');
        assert(sortedItems[1].score >= 6);
        assert.equal(tbody.childElementCount, 6);
    });
}).on('error', err => {
    assert.fail(err.message);
});
