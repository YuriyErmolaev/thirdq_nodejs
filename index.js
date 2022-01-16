const colors = require("colors/safe");
let [num1, num2] = process.argv.slice(2);
num1 = +num1; num2 = +num2;

if(
    !Number.isInteger(num1) ||
    !Number.isInteger(num2)
){
    console.log(colors.red('Some of arguments is not a number.'));
    throw '';
}

if(num2 < num1){
    console.log(colors.red('Second number is less than first'));
    throw '';
}

const getPrimes = (max) => {    
    let sieve = [], i, j, primes = [];
    for (i = 2; i <= max; ++i) {
        if (!sieve[i]) {
            // i has not been marked -- it is prime
            primes.push(i);
            for (j = i << 1; j <= max; j += i) {
                sieve[j] = true;
            }
        }
    }
    return primes;
}

let primes = getPrimes(num2);

let count = 0;
let hasPrimes = false;
primes.forEach(num => {
    if(num>=num1){
        count++;
        switch(count){
            case 1: console.log(colors.green(num)); break;
            case 2: console.log(colors.yellow(num)); break;
            case 3: console.log(colors.red(num)); break;
            default: count = 0;
        }
        hasPrimes = true;
    }    
});

if(!hasPrimes) console.log(colors.red('There is no prime numbers in range.'));