import { useRouter } from 'next/router';
import Head from 'next/head'
import Nav from '../components/nav';
import useSWR from 'swr';

const fetcher = (url) => {
    return fetch(url).then(r => r.json());
  };

const Results = (props) => {
    const router = useRouter();


    const { data, error } = useSWR('./api/songs', fetcher);
    if (data) console.log(data);

    let status = '';
    if (!data) status = 'Loading...';
    if (error) status = 'Failed to fetch songs.';

    return (
        <div>
            <Head>
                <title>Lost n' found</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Nav />

            {/* fetch status - won't show if successful */}
            <div className='status'>{status}</div>
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