import { useState } from 'react';
import fetch from 'isomorphic-unfetch';

import DocHead from '../components/docHead';

// possible speed mods in Respect V go from 0.5 to 5.0, in increments of 0.25
const speedmodList = [];
for (let i = 0.5; i <= 5; i += 0.25) {
  speedmodList.push(i);
}

const calcSpeedmod = (targetBPM, mode, songBPM) => {
  //binary search for the largest speed mod that gives a bpm less than the target BPM
  let start = 0;
  let end = speedmodList.length - 1;

  while (start <= end) {
      let mid = Math.floor((start + end) / 2);

      if (songBPM * speedmodList[mid] > targetBPM) {
          end = mid - 1;
      }
      else if (songBPM * speedmodList[mid] < targetBPM) {
          start = mid + 1;
      }
      else {
          return speedmodList[mid]; //perfect match applies to all 3 modes
      }
  }
  
  //after the loop, speedmodList[end] will give the largest speed less than targetBPM
  if (end < 0) { 
      return 0.5; //if the targetBPM is less than the minimum possible speed, return minimum speed 
  }

  if (mode === 'nearest') {
      const diff = Math.abs((speedmodList[end] * songBPM) - targetBPM);
      if (Math.abs((speedmodList[end + 1] * songBPM) - targetBPM) < diff) {
          return speedmodList[end + 1];
      }
      else {
          return speedmodList[end];
      }
  }
  else if (mode === 'upperLimit') {
      return speedmodList[end];
  }
  else if (mode === 'lowerLimit') {
      if (end === speedmodList.length - 1) {
          return speedmodList[end]; //speedmodList[end + 1] doesn't exist if the targetBPM is greater than the maximum multiple
      }
      else {
          return speedmodList[end + 1];
      }
  }
}

const Index = ({ dataEN, dataKR }) => {
  const [targetBPM, setTargetBPM] = useState(110);
  const [mode, setMode] = useState('nearest');
  const [language, setLanguage] = useState('EN');
  
  let data = [];
  if (language === 'EN') data = dataEN;
  else if (language === 'KR') data = dataKR;

  const [song, setSong] = useState(data[0]);
  const [songMod, setSongMod] = useState(1.0);

  return (
    <div>
      <DocHead />
      
      <h1 className="title">Lost n' found</h1>
      <h3 className='title-desc'>A speed modifier calculator for DJMax Respect V</h3>

      <label htmlFor="mode-select">Calculation Mode:</label>
      <select name="mode" id="mode-select" onChange={(event) => {setMode(event.target.value)}}>
        <option value='nearest'>Nearest</option>
        <option value='upperLimit'>Upper Limit</option>
        <option value='lowerLimit'>Lower Limit</option>
      </select>
      
      <br />

      <select name="song" id="songTitle-select" onChange={(event) => {setSong(data[event.target.value])}}>
        {data.map((song, index) => (
          <option key={song.title} value={index}>{`${song.title}`}</option>
        ))}
      </select>

      <select name="songMod" id="songMod-select" value={songMod} onChange={(event) => {setSongMod(event.target.value)}}>
        {speedmodList.map(mod => (
          <option key={mod} value={mod}>{mod}</option>
        ))}
      </select>

      <input type='button' disabled={!song} value='Set Target BPM' onClick={() => {setTargetBPM(song.BPM * songMod)}}></input>

      <br />

      <span>Target BPM: </span>
      <input 
        type='number'
        min='1'
        value={targetBPM}
        onChange={(event) => {setTargetBPM(event.target.value)}}
      />
      <br /><br />
      
      <label className='form-radio'>
          <input
              type='radio'
              name='language'
              value='EN'
              checked={language === 'EN'}
              onChange={(event) => {setLanguage(event.target.value)}}
              className='form-input-radio'
          />
          English
      </label>
      <label className='form-radio'>
          <input
              type='radio'
              name='language'
              value='KR'
              checked={language === 'KR'}
              onChange={(event) => {setLanguage(event.target.value)}}
              className='form-input-radio'
          />
          Korean
      </label>

      <hr />

      <ul>
          {data.map(song => {
              const speedMod = calcSpeedmod(targetBPM, mode, song.BPM)
              const newBPM = speedMod * song.BPM;
              const difference = newBPM - targetBPM;

              return <li key={song.title}>
                  <div><strong>{`${song.title}`}</strong></div>
                  <div>{`BPM: ${song.BPM}`}</div> 
                  
                  <div>{`Speed Mod to use: ${speedMod}`}</div> 
                  <div>{`New BPM: ${newBPM}`}</div>
                  <div>{`Difference: ${Math.round(difference * 100) / 100}`}</div>
                  <br />
              </li>
          })}
      </ul>

      <a href='https://github.com/smilevideo/lostnfound'><img src='GitHub-Mark-32px.png' id='githubButton' /></a>
    </div>
    
  )
}

Index.getInitialProps = async ctx => {
  //kick off the two fetch requests simultaneously, effectively running them in parallel
  const [ resEN, resKR ] = [await fetch('http://localhost:3000/api/songsEN'), await fetch('http://localhost:3000/api/songsKR')];
  const [ jsonEN, jsonKR ] = [await resEN.json(), await resKR.json()];

  return {
    dataEN: jsonEN,
    dataKR: jsonKR
  }
}

export default Index
