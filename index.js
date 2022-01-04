const fs = require('fs');
const readline = require('readline');

let lineReader = readline.createInterface(
  {
    input: fs.createReadStream('./access.log', 'utf8')
  }
);

const checkAndWriteReq = (strPost, ip) => {  
  let path = `./${ip}__requests.log`;
  if( strPost.includes(ip) ) {
    fs.writeFile( path, strPost, { flag: 'a' }, (err) => { if(err) console.log(err); } );
    fs.writeFile(path, '\n', { flag: 'a' }, (err) => { if(err) console.log(err); } );
  }
}

lineReader.on('line', (strPost) => {
  checkAndWriteReq(strPost, '89.123.1.41');
  checkAndWriteReq(strPost, '34.48.240.111');
});