//this script is used to sort the korean songlist JSON after directly adding songs to the JSON manually
    //for the EN version, you can just run inputSongsEN without adding any songs for the same effect

const fs = require('fs');

let songs = JSON.parse(fs.readFileSync('../songsKR.json'));

songs.sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();

    if (titleA < titleB) return -1;
    else if (titleA > titleB) return 1;
    else return 0;
})

let songsJSON = JSON.stringify(songs, null, 2);
fs.writeFileSync('../songsKR.json', songsJSON);