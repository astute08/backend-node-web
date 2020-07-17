let fs = require('fs');
let path = require('path');
let mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};
module.exports = (req, res, next) =>{
    //console.log(req.path);
    let file = path.join("./"+req.path);
    if (file.indexOf("src" + path.sep) !== -1 ) {
        return res.status(403).end('Forbidden');
    }
    // return last '.' to end string  in last position of the path.
    let type = mime[path.extname(file).slice(1)] || 'text/plain';
    // create data stream to can read file on api
    let s = fs.createReadStream(file);
    s.on('open', function () {
        res.set('Content-Type', type);
        s.pipe(res);
    });
    s.on('error', function () {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Not found');
    });
}