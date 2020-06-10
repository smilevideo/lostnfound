# Lost n' found
A speed modifier calculator for [DJMax Respect V](https://store.steampowered.com/app/960170/DJMAX_RESPECT_V/). Somewhat mobile-friendly.

Select a target bpm either manually or by selecting a song and modifier you were comfortable with to find your ideal speed mod for every song. You can also select from three calculation modes, explained further below.

Supports both English and Korean songlists.  
  
Demo deployed here: https://lostnfound.now.sh/

## Calculation Modes
- <strong>Nearest:</strong> Default mode. The closest multiple to your target bpm  
(minimizes absolute value of difference)  

- <strong>Upper Limit:</strong> The largest multiple that is less than your target bpm  
(greatest nonpositive difference)  

- <strong>Lower Limit:</strong> The smallest multiple that is greater than your target bpm  
(smallest nonnegative difference)

## Songs with BPM Changes
For songs with variable BPM, __the app uses the maximum bpm__ in calculations. Those songs and their BPM ranges are listed below:
- Fentanest: 20~160
- KILLER BEE: 116~155
- Negative Nature: 125~145
- Royal Clown: 143~164
- Misty Er'A: 66~120
- Vile Requiem: 75~150
- STOP: 90~162
- Marry me, Nightmare: 114~142

---

### Development Notes
Built with Next.js/React  

For initial songlist (pre-any DLC),
English song information was manually entered with [this Node script](https://github.com/smilevideo/lostnfound/blob/master/songs/scripts/inputSongsEN.js) because the lists I saw elsewhere either didn't have BPMs or didn't have full parity with Respect V.
Korean song information was scraped from [DJMAXDB](https://djmaxdb.com/4B/) with [this Node script](https://github.com/smilevideo/lostnfound/blob/master/songs/scripts/scrapeSongsKR.js).

--- 
### Updates - <span style="color:red"><em>Up-to-date as of 6/5/20</em></span>

- (6/5/20) - Added the 5/28 DLCs "CLAZZIQUAI EDITION PACK" and "BLACK SQUARE PACK" -thanks changho147

- (6/5/20) - Added the 5/21 free update "Guilty Gear Collaboration"

- (4/10/20) - Added the 4/14 DLCs "DJMAX TRILOGY PACK" and "GROOVE COASTER PACK"

- (3/12/20) - Added the 3/12 DLC "V Extension Pack"

- (3/3/20) - Added the 3/12 DLC "Emotional Sense Pack"
