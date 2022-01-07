const fs = require('fs');
const readline = require('readline');
const path = require('path');
const inquirer = require('inquirer');
const EventEmitter = require('events');
class myEmitter extends EventEmitter{};
const http = require('http');
const url = require('url');

let curDir = process.cwd();
let homePath = path.join(curDir, 'public');

let getHtmlistItems = (items, ipath) => {    
    items = ['..', ...items];
    let list = '', href;
    items.map(item =>{
        href = path.join(ipath, item);
        list += `
            <li>
                <a href = ${href}>
                    ${item}
                </a>
            </li>
        `;
    ;});
    let htmlListItems = `<ul>${list}</ul>`;
    return htmlListItems;
}

http.createServer((request, response) => {
    if (request.method === 'GET'
        && request.url != '/favicon.ico'
    ) 
    {
        let subPath = request.url,
            ipath =  path.join(homePath, subPath);        
        response.writeHead(200, 'OK', {
            'Content-Type': 'text/html',
        });
        
        if( fs.lstatSync(ipath).isDirectory() ) {
            let items = fs.readdirSync(ipath);
            let htmlListItems = getHtmlistItems(items, subPath);
            response.write(htmlListItems);
            response.end();
        }
        if( fs.lstatSync(ipath).isFile() ) {            
            console.log('ipath file:', ipath);
            
            let upHref = path.join(subPath, '../')
            response.write(`<a href='${upHref}'>..</a><hr/>`);

            let lineReader = require('readline').createInterface({
                input: require('fs').createReadStream(ipath),
              });
            lineReader.on('line', (line) => {               
                response.write(line + '<br/>');                
            });            
            lineReader.on('close', () => {                
                response.end();
            });
        }
    };
}).listen(3003, 'localhost');
