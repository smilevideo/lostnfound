# Lost n' found
A speed modifier calculator for DJMax Respect V.    

Select a target bpm and calculation mode and find your ideal speed mod for every song.

## Modes
- <strong>Nearest:</strong> The closest multiple to your target bpm  
(minimizes absolute value of difference)  

- <strong>Upper Limit:</strong> The largest multiple that is less than your target bpm  
(smallest negative difference)  

- <strong>Lower Limit:</strong> The smallest multiple that is greater than your target bpm  
(smallest positive difference)

## Notes
For songs with variable BPM, the app uses the maximum bpm in calculations. Those songs are listed below:
- Fentanest: 20~160
- KILLER BEE: 116~155
- Negative Nature: 125~145
- Royal Clown: 143~164

---

## Development Notes
Built with Next.js/React  

Song information scraped from [DJMAXDB](https://djmaxdb.com/4B/) with [this Node script](https://github.com/smilevideo/lostnfound/blob/master/songs/inputSongs.js).  
The (manual input) version is a script for adding songs to the JSON by manual CLI input.
