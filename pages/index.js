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

  return (
    <div>
      <DocHead />
      <Nav />

      <h1 className="title">Lost n' found</h1>
      <h3 className='title-desc'>A speed modifier calculator for DJMax Respect V</h3>

      <p>Selected Mode: {mode}</p>

      <div 
        className='modeSelect' 
        style={{height: '100px', width: '100px', border: '1px solid'}}
        onClick={() => {setMode('nearest')}}
      >
        <span>Nearest</span>
      </div>
      <div 
        className='modeSelect' 
        style={{height: '100px', width: '100px', border: '1px solid'}}
        onClick={() => {setMode('upperLimit')}}
      >
        <span>Upper Limit</span>
      </div>
      <div 
        className='modeSelect' 
        style={{height: '100px', width: '100px', border: '1px solid'}}
        onClick={() => {setMode('lowerLimit')}}
      >
        <span>Lower Limit</span>
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
