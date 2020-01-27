const fs = require('fs');
const readline = require('readline')
const os = require('os');

const endOfLine = os.EOL;

let songs = JSON.parse(fs.readFileSync('./songs.json'));

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const addSong = () => {
    const song = {};

    rl.question(`Enter 'y' to add a song. Enter anything else to save and quit.${endOfLine}`, response => {
        if (response === 'y') {
            rl.question(`Enter song title:${endOfLine}`, response => {
                song.title = response;

                rl.question(`Enter song artist:${endOfLine}`, response => {
                    song.artist = response;

                    rl.question(`Enter song BPM:${endOfLine}`, response => {
                        song.BPM = parseInt(response, 10);

                        songs.push(song);

                        addSong();
                    })
                })
            })
        }

        else {
            songs.sort((a, b) => {
                const titleA = a.title.toLowerCase();
                const titleB = b.title.toLowerCase();

                if (titleA < titleB) return -1;
                else if (titleA > titleB) return 1;
                else return 0;
            })

            let songsJSON = JSON.stringify(songs, null, 2);
            fs.writeFileSync('./songs.json', songsJSON)
            rl.close(); 
        }
    })
}
addSong();