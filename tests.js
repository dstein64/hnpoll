// Run tests with:
//  $ node tests.js

const assert = require('assert');
const https = require('https');

const {HttpsProxyAgent} = require('https-proxy-agent');
const {JSDOM} = require('jsdom');

const {extract} = require(__dirname + '/src/extract.js');

let https_agent = undefined;
const https_proxy = process.env.https_proxy;
if (https_proxy !== undefined) {
    https_agent = new HttpsProxyAgent(https_proxy);
}
const options = {
    agent: https_agent,
};

const url = 'https://news.ycombinator.com/item?id=42836273';
https.get(url, options, resp => {
    let data = '';
    resp.on('data', chunk => {
        data += chunk;
    });
    resp.on('end', () => {
        assert.equal(resp.statusCode, 200, data);
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
