# Lost n' found
A speed modifier calculator for DJMax Respect V.  
[Lost n' found](temp.temp)  

Select a target bpm and mode and find your ideal speed mod for every song.

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

Song information was manually input with [this Node script]('./songs/inputSongs.js') because song lists I saw elsewhere either didn't have BPMs or didn't have full parity with Respect V. If anyone knows how to get this info directly from the game files that would be cool...

Testing with Jest:
```
npm install
npm run test
```