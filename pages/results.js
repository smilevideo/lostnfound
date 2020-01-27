import DocHead from '../components/docHead';
import Nav from '../components/nav';

import { useRouter } from 'next/router';
import useSWR from 'swr';

const modeList = ['nearest', 'upperLimit', 'lowerLimit'];

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
    if (mode === 'nearest') {
        const diff = Math.abs(speedmodList[end] - targetBPM);
        if (Math.abs(speedmodList[end + 1] - targetBPM) < diff) {
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
        return speedmodList[end + 1];
    }
}

const Results = (props) => {
    const { query } = useRouter();

    //check if bpm in url query is a valid integer string; if not, default to 100
    const targetBPM = (!isNaN(query.targetBPM) && !isNaN(parseFloat(query.targetBPM)) && Number.isInteger(parseInt(query.targetBPM, 10)))
        ? query.targetBPM 
        : 100;

    //check if mode in url query is a valid mode; if not, default to nearest
    const mode = modeList.includes(query.mode) ? query.mode : 'nearest';

    //fetch song data from api
    const { data, error } = useSWR('./api/songs', url => (
        fetch(url).then(r => r.json())
    ));
    let status = '';
    if (!data) status = 'Loading...';
    if (error) status = 'Failed to fetch songs.';

    return (
        <div>
            <DocHead />
            <Nav />

            {/* fetch status - won't show if successful */}
            <div className='status'>{status}</div>

            <div>
                <p>Selected BPM: {targetBPM}</p>
                <p>Selected Mode: {mode}</p>
            </div>

            {data && <ul>
                {data.map(song => {
                    const speedMod = calcSpeedmod(targetBPM, mode, song.BPM)
                    const newBPM = speedMod * song.BPM;
                    const difference = newBPM - targetBPM;

                    return <li key={song.title}>
                        <div><strong>{`${song.title}`}</strong></div>
                        <div>{`Artist: ${song.artist}`}</div>
                        <div>{`BPM: ${song.BPM}`}</div> 
                        <div>{`Speed Mod to use: ${speedMod}`}</div> 
                        <div>{`New BPM: ${newBPM}`}</div>
                        <div>{`Difference: ${difference}`}</div>
                        <br />
                    </li>
                })}
            </ul>}

        </div>
    )
}

export default Results;