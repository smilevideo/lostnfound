import React, { useState } from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import Link from 'next/link';

const ResultsLink = props => (
  <Link href={`/results?targetBPM=${props.targetBPM}&mode=${props.mode}`}>
    <a>go</a>
  </Link>
)

const Home = () => {
  const [targetBPM, setTargetBPM] = useState(null);
  const [mode, setMode] = useState(null);

  return (
    <div>
      <Head>
        <title>Lost n' found</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <h1 className="title">Welcome to Lost n' found.</h1>

      <ResultsLink targetBPM={targetBPM} mode={mode}/>

      

    </div>
  )
}

export default Home
