const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const dom = new JSDOM(JSDOM.fromFile('./index.html', {userAgent: 'node.js'})
    .then(dom => {
        return dom;
    })
);
global.window = dom.window;
global.document = window.document;
global.HTMLElement = window.HTMLElement;
global.XMLHttpRequest = window.XMLHttpRequest;
