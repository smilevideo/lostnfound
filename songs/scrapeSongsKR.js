const fs = require('fs');

const request = require('request');
const cheerio = require('cheerio');

request('https://djmaxdb.com/4B/', (error, response, html) => {
    if (!error && response.statusCode === 200) {
        const songs = [];

        const $ = cheerio.load(html);

        $('#DB_TABLE tr').each((i, el) => {
           const row = $(el);
           const title = row.find('td:nth-child(2)').text();
           let bpm = row.find('td:nth-last-child(2)').text();

           //use maximum bpm for songs with bpm changes
           if (bpm.includes('~')) {
               bpm = bpm.split('~')[1].trim();
           } 

           bpm = parseInt(bpm, 10);

           songs.push({
               title: title,
               BPM: bpm
           });
        });

        //sort songs by title alphabetically
        songs.sort((a, b) => {
            const titleA = a.title.toLowerCase();
            const titleB = b.title.toLowerCase();

            if (titleA < titleB) return -1;
            else if (titleA > titleB) return 1;
            else return 0;
        })

        //write to file songsKR.json
        let songsJSON = JSON.stringify(songs, null, 2);
        fs.writeFileSync('./songsKR.json', songsJSON)
    }
});

