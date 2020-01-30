const fs = require('fs');

const request = require('request');
const cheerio = require('cheerio');

request('https://djmaxdb.com/4B/', (error, response, html) => {
    if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html);
        
        const songs = [];

        $('#DB_TABLE tr').each((i, el) => {
           const row = $(el);
           const title = row.find('td:nth-child(2)').text();
           const bpm = row.find('td:nth-last-child(2)').text();

           songs.push({
               title: title,
               BPM: parseInt(bpm, 10)
           });
        });

        songs.sort((a, b) => {
            const titleA = a.title.toLowerCase();
            const titleB = b.title.toLowerCase();

            if (titleA < titleB) return -1;
            else if (titleA > titleB) return 1;
            else return 0;
        })

        let songsJSON = JSON.stringify(songs, null, 2);
        fs.writeFileSync('./songsKR.json', songsJSON)
    }
});

