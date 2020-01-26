import DocHead from '../components/docHead';
import Nav from '../components/nav';

import { useRouter } from 'next/router';
import useSWR from 'swr';

const fetcher = (url) => {
    return fetch(url).then(r => r.json());
};

const calcSpeedmod = (targetBPM, mode, songBPM) => {
    // speed mods go from 0.5 to 5.0, in increments of 0.25


}

const Results = (props) => {
    const { query } = useRouter();

    const targetBPM = query.targetBPM ? query.targetBPM : 100;
    const mode = query.mode ? query.mode : 'nearest';

    const { data, error } = useSWR('./api/songs', fetcher);
    if (data) console.log(data);

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
                {data.map(song => (
                    <li key={song.title}>
                        <div><strong>{`${song.title}`}</strong></div>
                        <div>{`Artist: ${song.artist}`}</div>
                        <div>{`BPM: ${song.BPM}`}</div> <br />
                    </li>
                ))}
            </ul>}

        </div>
    )
}

export default Results;