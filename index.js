const fs = require('fs');
const readline = require('readline');

let lineReader = readline.createInterface(
  {
    input: fs.createReadStream('./access.log', 'utf8')
  }
);

lineReader.on('line', (line) => {
  console.log('line:', line);  
});