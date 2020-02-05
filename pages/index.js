import { useState } from 'react';
import fetch from 'isomorphic-unfetch';

import DocHead from '../components/docHead';

const Index = ({ songs }) => {
	const [targetBPM, setTargetBPM] = useState(110);
	const [mode, setMode] = useState('nearest');
	const [modeInfo, setModeInfo] = useState(false);
	const [language, setLanguage] = useState('EN');
	const [song, setSong] = useState(songs.EN[0]);
	const [songMod, setSongMod] = useState(1.0);
	const [filter, setFilter] = useState('');
	
	let data = songs[language];

	//fix song select dropdown when switching languages on a song that isn't in the other language
	if (!data.map(song => song.title).includes(song.title)) {
		setSong(songs[language][0]); 
	}

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

	const calcDifferenceRGBStyle = (difference) => {
		let rgb = [0, 0, 0];
		
		if (difference > 0) {
			rgb[0] = difference * 10;
		}
		else if (difference < 0) {
			rgb[2] = -1 * difference * 10;
		}

		return { color: `rgb(${rgb})` };
	}

	return (
		<div className='app'>
			<DocHead />
			
			<header>
				<h1 className="title">Lost n' found</h1>
				<h3 className='title-desc'>Speed modifier calculator for DJMax Respect V</h3>
			</header>

			<section className='inputs'>
				<h3 className='input-header'>Inputs</h3>
				<div className='language-radio'>
					<input
						type='radio'
						id='language1'
						name='language'
						value='EN'
						checked={language === 'EN'}
						onChange={(event) => {setLanguage(event.target.value)}}
						className='form-input-radio'
					/>
					<label htmlFor='language1'>English</label>
					
					<input
						type='radio'
						id='language2'
						name='language'
						value='KR'
						checked={language === 'KR'}
						onChange={(event) => {setLanguage(event.target.value)}}
						className='form-input-radio'
					/>
					<label htmlFor='language2'>Korean</label>
				</div>

				<div className='setTargetBPMBySong'>
					<div className='songTitle-select'>
						<span>Song Played: </span>
						<select 
							name="song"  
							onChange={(event) => {setSong(data[event.target.value])}}
							value={data.map(song => song.title).indexOf(song.title)}
						>
							{data.map((song, index) => (
								<option key={song.title} value={index}>{`${song.title}`}</option>
							))}
						</select>
					</div>
				
					<div className='songMod-select'>
						<span>Speed Used: </span>
						<select name="songMod" value={songMod} onChange={(event) => {setSongMod(event.target.value)}}>
							{speedmodList.map(mod => (
								<option key={mod} value={mod}>{mod}</option>
							))}
						</select>
					</div>

					<div className='calcTargetBPM-button'>
						<input type='button' value='Set Target BPM' onClick={() => {setTargetBPM(song.BPM * songMod)}}></input>
					</div>
				</div>

				<div className='targetBPM-input'>
					<span>Target BPM: </span>
					<input 
						type='number'
						min='1'
						value={targetBPM}
						onChange={(event) => {setTargetBPM(event.target.value)}}
					/>
				</div>
				
				<div className='mode-select'>
					<span>Calculation Mode <button className='toggleModeInfo' onClick={()=>{
						if (!modeInfo) setModeInfo(true);
						else setModeInfo(false);
					}}>(?)</button>: </span>
					<select name="mode" id="mode-select" onChange={(event) => {setMode(event.target.value)}}>
						<option value='nearest'>Nearest</option>
						<option value='upperLimit'>Upper Limit</option>
						<option value='lowerLimit'>Lower Limit</option>
					</select>
					{modeInfo && 
					<ul className='modeInfo'>
						<li><b>Nearest:</b> The speed that gives the closest BPM to your target BPM.</li>
						<li><b>Upper Limit:</b> The speed that gives the largest BPM less than your target BPM.</li>
						<li><b>Lower Limit:</b> The speed that gives the smallest BPM greater than your target BPM.</li>
					</ul>}
				</div>
			</section>

			<section className='results'>
				<input 
					type='text' 
					className='filter-input'
					value={filter}
					placeholder='Search..'
					onChange={(event) => {setFilter(event.target.value)}}
				/>

				<table className="resultsTable">
					<thead>
						<tr>
							<th scope="col">Song</th>
							<th scope="col">BPM</th>
							<th scope="col">Speed</th>
							<th scope="col">New BPM</th>
							<th scope="col">Difference</th>
						</tr>
					</thead>
					
					<tbody>
						{data.filter(song => song.title.toLowerCase().includes(filter.toLowerCase()))
						.map(song => {
							const speedMod = calcSpeedmod(targetBPM, mode, song.BPM)
							const newBPM = speedMod * song.BPM;
							const difference = newBPM - targetBPM;

							return <tr key={`${song.title}`}>
								<td>{`${song.title}`}</td>
								<td>{`${song.BPM}`}</td>
								<td>{`${speedMod}`}</td>
								<td>{`${newBPM}`}</td>
								<td style={calcDifferenceRGBStyle(difference)}>{`${Math.round(difference * 100) / 100}`}</td>
							</tr>
						})}
					</tbody>
				</table>
			</section>

			<img src='/bg.jpg' className='song-image' />

			<footer>
				<a href='https://github.com/smilevideo/lostnfound'><img src='GitHub-Mark-32px.png' id='githubButton' /></a>
			</footer>
		</div>
	)
}

Index.getInitialProps = async ctx => {
	//kick off the two fetch requests simultaneously, effectively running them in parallel
	const [ resEN, resKR ] = [await fetch('http://localhost:3000/api/songsEN'), await fetch('http://localhost:3000/api/songsKR')];
	const [ jsonEN, jsonKR ] = [await resEN.json(), await resKR.json()];

	return {
		songs: {
			EN: jsonEN,
			KR: jsonKR
		}
	}
}

export default Index
