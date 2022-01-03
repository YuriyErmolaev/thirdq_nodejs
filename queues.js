const EventEmitter = require('events');
class myEmitter extends EventEmitter{};

const formatStrDate = (strDate) => {
    let str = strDate;
    let timeStr = str.substring(0,8);    
    str = strDate;
    let dateStr = str.substring(9);
    let [day, month, year] = dateStr.split('-');
    return `${year}-${month}-${day}T${timeStr}.000Z`;
}
const getLeft = (strDate) => {    
    let nowSeconds = Math.floor(Date.now()/1000);
    strDate = formatStrDate(strDate);
    let date = new Date(strDate);
    secDate = Math.floor(date.getTime()/1000); 
    let left = secDate - nowSeconds;
    return left;
}


// 23:30:10-02-01-2022 23:35:20-02-01-2022
let strDatesAr = process.argv.slice(2);

const emitterObj = new myEmitter();
emitterObj.on('countFire', (result)=>{console.log(result)});

const delay = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    });
};

const iterateAndChangeCounts = () => {    
    let left;
    let newAr = [];
    strDatesAr.forEach((strDate) => {    
        left = getLeft(strDate);
        if (left > 0) {
            result = left;
            newAr.push(strDate);
        } else {
            result = 'count expired';
        }        
        emitterObj.emit('countFire', result);
    });
    strDatesAr = [...newAr];
}

const runCounts = () => {

    delay(1000).then(
        () => {
            iterateAndChangeCounts();
            if(strDatesAr.length > 0) runCounts();
        }
    );

}

runCounts();