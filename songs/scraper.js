const url = 'https://news.ycombinator.com/';
const axios = require('axios');
const cheerio = require('cheerio');

axios.get(url)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    })