const fs = require('fs');
const zlib = require('zlib');

const readStream = fs.createReadStream('text.txt');
const writeStream = fs.createWriteStream('new-text.txt');
const compressor = zlib.createGzip();
// readStream.on('data', (chunk) => {
//     writeStream.write(chunk);
// })

// readStream.pipe(writeStream)

const handleError = (error) => {
    console.log(error);
    readStream.destroy()
    writeStream.end('Writing finished...')
}

readStream
    .on('error', handleError)
    .pipe(compressor)
    .pipe(writeStream)
    .on('error', handleError);