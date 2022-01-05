#!/usr/bin/env node
const fs = require('fs');
const readline = require('readline');
const path = require('path');
const inquirer = require('inquirer');
const EventEmitter = require('events');
class myEmitter extends EventEmitter{};

const emitterObj = new myEmitter();
emitterObj.on('chooseDir', (ipath)=>{
            getItem(ipath);
        }
    );

inquirer.prompt([
    {
        name: 'ipath',
        type: 'input',
        message: 'Enter dir path: ',   
    }
]).then(
    ({ipath}) => {
        getItem(ipath);
    }
);

const getItem = (ipath) => {
    inquirer.prompt({
        name: 'item',
        type: 'list',
        message: 'Choose file or dir: ',        
        choices: ['..', ...fs.readdirSync(ipath)],
    }).then(({item})=>{        
        
        if ( fs.lstatSync( path.join(ipath,item) ).isDirectory() ) {            
            emitterObj.emit('chooseDir', path.join(ipath,item));
        }
        if ( item == '..' ) {            
            emitterObj.emit('chooseDir', path.join(ipath, '../'));
        }        
        if ( fs.lstatSync( path.join(ipath,item) ).isFile() ) {            
            
            inquirer.prompt([
                {
                    name: 'temp',
                    type: 'input',
                    message: 'Enter temp for search: ',   
                }
            ]).then(
                ({temp}) => {
                    checkInFile(temp, path.join(ipath,item) );
                }
            );
        }

    });
};

const checkInFile = ( temp, filepath ) => {    
    let lineReader = readline.createInterface(
        {input: fs.createReadStream(filepath, 'utf8')}
    );  
    
    let rpath = path.join(
        path.join(filepath, '../'),
        'finded.log'
    );

    const checkAndWriteReq = (line, temp) => {          
        if( line.includes(temp) ) {
          fs.writeFile( rpath, line + '\n', { flag: 'a' }, (err) => { if(err) console.log(err); } );          
        }
    }
      
    lineReader.on('line', (line) => {
        checkAndWriteReq(line, temp);        
    });
};

// C:\Learn\GeekBrains\Frontend_developer\thirdq_nodejs\4\forth_lesson\dir