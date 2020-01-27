import DocHead from '../components/docHead';
import Nav from '../components/nav'

import { useState } from 'react'
import Link from 'next/link';

const ResultsLink = props => (
  <Link href={`/results?targetBPM=${props.targetBPM}&mode=${props.mode}`}>
    <a>go</a>
  </Link>
)

const Home = () => {
  const [targetBPM, setTargetBPM] = useState(100);
  const [mode, setMode] = useState('nearest');

  const modeSelectStyle = (optionMode) => ({
    height: '150px', 
    width: '150px', 
    border: optionMode === mode ? '10px solid' : '1px solid'
  })

  return (
    <div>
      <DocHead />
      <Nav />

      <h1 className="title"></h1>
      <h3 className='title-desc'>A speed modifier calculator for DJMax Respect V</h3>

      <div 
        className='modeSelect' 
        style={modeSelectStyle('nearest')}
        onClick={() => {setMode('nearest')}}
      >
        <div>Nearest</div>
        <div>Finds the modified BPM closest to your target BPM.</div>
      </div>
      <div 
        className='modeSelect' 
        style={modeSelectStyle('upperLimit')}
        onClick={() => {setMode('upperLimit')}}
      >
        <div>Upper Limit</div>
        <div>Finds the maximum modified BPM less than your upper limit.</div>
      </div>
      <div 
        className='modeSelect' 
        style={modeSelectStyle('lowerLimit')}
        onClick={() => {setMode('lowerLimit')}}
      >
        <div>Lower Limit</div>
        <div>Finds the minimum modified BPM greater than your lower limit.</div>
      </div>
      
      <input 
        type='number'
        min='1'
        value={targetBPM}
        onChange={(event) => {setTargetBPM(event.target.value)}}
      />
      <br /><br />

      <ResultsLink targetBPM={targetBPM} mode={mode}/>

    </div>
  )
}

export default Home
