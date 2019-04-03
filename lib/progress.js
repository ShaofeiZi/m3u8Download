const fs = require('fs');
const readline = require('readline');
const m3u8stream = require('./stream');
/**
 * showProgress
 * @param {string} url
 * @param {string} name
 * @param {Function} cb
 */
module.exports = (url, name, cb) => {
    const playlist = url;
    if (!playlist || !name) {
        const path = require('path');
        const filepath = path.relative(process.cwd(), __filename);
        console.error('Must provide link to  playlist');
        console.error('usage: node ' + filepath + ' <playlist url>');
        console.error('file name null!');
    } else {
        const stream = m3u8stream(playlist);
        stream.pipe(fs.createWriteStream(`${name}.mp4`));
        stream.on('progress', (segment, totalSegments, downloaded) => {
            readline.cursorTo(process.stdout, 0);
            process.stdout.write(
                `${segment.num} of ${totalSegments} segments ` +
                `(${(segment.num / totalSegments * 100).toFixed(2)}%) ` +
                `${(downloaded / 1024 / 1024).toFixed(2)}MB downloaded`);
        });
        stream.on('end', () => {
            console.log('OK');
            cb && cb();
        })
    }
}
