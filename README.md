# Lost n' found
A speed modifier calculator for [DJMax Respect V](https://store.steampowered.com/app/960170/DJMAX_RESPECT_V/). 

Select a target bpm and calculation mode and find your ideal speed mod for every song.

Supports both English and Korean songlists.

## Calculation Modes
- <strong>Nearest:</strong> The closest multiple to your target bpm  
(minimizes absolute value of difference)  

- <strong>Upper Limit:</strong> The largest multiple that is less than your target bpm  
(smallest negative difference)  

- <strong>Lower Limit:</strong> The smallest multiple that is greater than your target bpm  
(smallest positive difference)

## Songs with BPM Changes
For songs with variable BPM, the app uses the maximum bpm in calculations. Those songs and their BPM ranges are listed below:
- Fentanest: 20~160
- KILLER BEE: 116~155
- Negative Nature: 125~145
- Royal Clown: 143~164

---

## Development Notes
Built with Next.js/React  

English song information manually entered with [this Node script](https://github.com/smilevideo/lostnfound/blob/master/songs/inputSongsEN.js) because the lists I saw elsewhere either didn't have BPMs or didn't have full parity with Respect V.

Korean song information scraped from [DJMAXDB](https://djmaxdb.com/4B/) with [this Node script](https://github.com/smilevideo/lostnfound/blob/master/songs/scrapeSongsKR.js).  

