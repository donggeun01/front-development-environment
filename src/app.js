import './app.css'
import nyancat from './nyancat.jpg';

document.addEventListener('DOMContentLoaded', () => {
    document.body.innerHTML = `<img src=${ nyancat } />`
})

console.log(process.env.NODE_ENV)
console.log(TWO)            // 2;
console.log(STR_TWO)        // 1+1;
console.log(VERSION);       // v1.2.3
console.log(PRODUCTION);    // false
console.log(MAX_COUNT);     // 999
console.log(api_domain);    // https://dev.api.domain.com