import React, { useState } from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import useSWR from 'swr';
import Link from 'next/link';

const fetcher = (url) => {
  return fetch(url).then(r => r.json());
};

const ResultsLink = props => (
  <Link href={`/results?targetBPM=${props.targetBPM}&mode=${props.mode}`}>
    <a>go</a>
  </Link>
)

const Home = () => {
  const [targetBPM, setTargetBPM] = useState(null);
  const [mode, setMode] = useState('closest');

  const { data, error } = useSWR('./api/songs', fetcher);
  if (data) console.log(data);

  let status = '';
  if (!data) status = 'Loading...';
  if (error) status = 'Failed to fetch songs.';

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <ResultsLink />

      <div className="hero">
        {/* fetch status - won't show if successful */}
        <div className='status'>{status}</div>

        <h1 className="title">Welcome to Lost n' found.</h1>
        <p className="description">
          To get started, edit <code>pages/index.js</code> and save to reload.
        </p>

        <div className="row">
          <a href="https://nextjs.org/docs" className="card">
            <h3>Documentation &rarr;</h3>
            <p>Learn more about Next.js in the documentation.</p>
          </a>
          <a href="https://nextjs.org/learn" className="card">
            <h3>Next.js Learn &rarr;</h3>
            <p>Learn about Next.js by following an interactive tutorial!</p>
          </a>
          <a
            href="https://github.com/zeit/next.js/tree/master/examples"
            className="card"
          >
            <h3>Examples &rarr;</h3>
            <p>Find other example boilerplates on the Next.js GitHub.</p>
          </a>
        </div>
  
        {data && <ul>
          {data.map(song => (
            <li key={song.title}>
              <div><strong>{`${song.title}`}</strong></div>
              <div>{`Artist: ${song.artist}`}</div>
              <div>{`BPM: ${song.bpm}`}</div> <br />
            </li>
          ))}
        </ul>}

      </div>

      <style jsx>{`
        :global(body) {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
            Helvetica, sans-serif;
        }
        .hero {
          width: 100%;
          color: #333;
        }
        .title {
          margin: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
        }
        .title,
        .description {
          text-align: left;
          padding-left: 40px;
        }
        .row {
          max-width: 880px;
          margin: 80px auto 40px;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
        .card {
          padding: 18px 18px 24px;
          width: 220px;
          text-align: left;
          text-decoration: none;
          color: #434343;
          border: 1px solid #9b9b9b;
        }
        .card:hover {
          border-color: #067df7;
        }
        .card h3 {
          margin: 0;
          color: #067df7;
          font-size: 18px;
        }
        .card p {
          margin: 0;
          padding: 12px 0 0;
          font-size: 13px;
          color: #333;
        }
      `}</style>
    </div>
  )
}

export default Home
