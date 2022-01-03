const fs = require('fs');
const readline = require('readline');

let lineReader = readline.createInterface(
  {
    input: fs.createReadStream('./access.log', 'utf8')
  }
);

lineReader.on('line', (strPost) => {

  if( strPost.includes('89.123.1.41') ) {
    fs.writeFile('./89.123.1.41__requests.log', strPost, { flag: 'a' }, (err) => console.log(err));
    fs.writeFile('./89.123.1.41__requests.log', '\n', { flag: 'a' }, (err) => console.log(err));
    console.log(strPost);
  }

  if( strPost.includes('34.48.240.111') ) {
    fs.writeFile('./34.48.240.111__requests.log', strPost, { flag: 'a' }, (err) => console.log(err));
    fs.writeFile('./34.48.240.111__requests.log', '\n', { flag: 'a' }, (err) => console.log(err));
    console.log(strPost);
  }

});