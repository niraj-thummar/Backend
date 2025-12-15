const givenUrl = "https://www.example.com/products/item?id=101&category=mobile";
const myUrl = new URL(givenUrl);

console.log("Protocol:", myUrl.protocol);
console.log("Hostname:", myUrl.hostname);
console.log("Pathname:", myUrl.pathname);

console.log("Query Parameters:");
myUrl.searchParams.forEach((value, key) => {
    console.log(`${key}: ${value}`);
});


// const url = require('url');
// const myUrl = url.parse('https://www.example.com/products/item?id=101&category=mobile');
// console.log(myUrl); //old

