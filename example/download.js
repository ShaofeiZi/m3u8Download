const a = require('./data.js');
const progress = require('../lib/progress');
const length = a[0].skus.length;
let order = 0;

function download(url, name) {
    progress(url, name, nextDownload);
}

function nextDownload() {
    order++;
    if (order > length) {
        return;
    }
    const url = JSON.parse(a[0].skus[order].articles[0].video_media).hd.url;
    const name = `${a[0].skus[order].articles[0].article_title}:${a[0].skus[order].articles[0].article_subtitle}`;
    console.log('Download', name);
    download(url, name, order)
}

nextDownload()
