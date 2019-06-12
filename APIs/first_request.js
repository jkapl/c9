const request = require('request');

request('https://jsonplaceholder.typicode.com/users', (error, response, body) => {
    if (!error && response.statusCode == 200) {
        const parsedData = JSON.parse(body);
        console.log(parsedData[0]['name'] + ' lives in ' + parsedData[0].address.city);
        console.log('--------');
        console.log(`${parsedData[0].name} lives in ${parsedData[0].address.city}`);
    }
});

//ES6 promises syntax (uses promises instead of callbacks)
const rp = require('request-promise')
rp('https://jsonplaceholder.typicode.com/users')
  .then((body) => {
   const parsedData = JSON.parse(body);
   console.log(`${parsedData[1].name} lives in ${parsedData[1].address.city}`);   
  })
  .catch((err) => {
      console.log('Error!', err);
  });