import { useState } from 'react'
import useSWR from 'swr';

import DocHead from '../components/docHead';

//map the calc mode strings to their frontend display versions
const modeList = {
  nearest: 'Nearest',
  upperLimit: 'Upper Limit',
  lowerLimit: 'Lower Limit'
};

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

const Index = () => {
  
  const [targetBPM, setTargetBPM] = useState(100);
  const [mode, setMode] = useState('nearest');
  const [language, setLanguage] = useState('EN');

  const modeSelectStyle = (optionMode) => ({
    height: '150px', 
    width: '150px', 
    border: optionMode === mode ? '10px solid' : '1px solid'
  })

  const displayMode = modeList[mode];

  //fetch song data from api
  const { data, error } = useSWR(`./api/songs${language}`, url => (
      fetch(url).then(r => r.json())
  ));
  let status = '';
  if (!data) status = 'Loading...';
  if (error) status = 'Failed to fetch songs.';

  return (
    <div>
      <DocHead />
      
      <h1 className="title">Lost n' found</h1>
      <h3 className='title-desc'>A speed modifier calculator for DJMax Respect V</h3>
      
      {/* fetch status - won't show if successful */}
      <div className='status'>{status}</div>

      <label for="mode-select">Calculation Mode:</label>

      <select name="mode" id="mode-select" onChange={(event) => {setMode(event.target.value)}}>
          <option value='nearest'>Nearest</option>
          <option value='upperLimit'>Upper Limit</option>
          <option value='lowerLimit'>Lower Limit</option>
      </select>

      <br />

      <span>BPM: </span>
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
              onChange={() => {setLanguage('EN')}}
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
              onChange={() => {setLanguage('KR')}}
              className='form-input-radio'
          />
          Korean
      </label>

      <hr />

      {data && <ul>
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
      </ul>}

    </div>
  )
}

export default Index
