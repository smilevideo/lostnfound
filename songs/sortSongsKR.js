//this script is used to sort the korean songlist JSON after directly adding songs to the JSON manually

const fs = require('fs');

let songs = JSON.parse(fs.readFileSync('./songsKR.json'));

songs.sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();

    if (titleA < titleB) return -1;
    else if (titleA > titleB) return 1;
    else return 0;
})

let songsJSON = JSON.stringify(songs, null, 2);
fs.writeFileSync('./songsKR.json', songsJSON);