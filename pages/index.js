import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { handleGammin } from './api';
import Image from "next/image";
import fetchPlaceDetails from '../app/fetchdetails';
import axios from 'axios';

export default function Home() {
  const [isLoading, setIsLoading] = useState()
  const [data, setData] = useState()
  const [googleData, setGoogleData] = useState()
  const [searchCity, setSearchCity] = useState()

  const handleData = async () => {
    try {
      setIsLoading(true)
      const data = await handleGammin(searchCity || '')
      setData(data)
      const accom = await axios.post('/api/myScript', {
        name: data.accomodation
      });
      const re = await axios.post('/api/myScript', {
        name: data.activites
      });
      console.log('tjhis??', accom)
      setGoogleData([accom.data.accom, re.data.res])

    } catch (error) {
        console.log('the err', error)
    }
    setIsLoading(false)

  }


const DisplaySuggestions = ( response ) => {
  const suggestions = [response.accomodation, response.activites];

  console.log('suggestions', suggestions)
  console.log(googleData)
  return (
    <div>
      {suggestions.map((suggestion, index) => <div key={index} className="suggestion">
          <Image
                    src={googleData?.[index]?.imageUrl}
                    alt="External Image"
                    unoptimized
                    width={300}
                    height={200}
                />
          <h2>{suggestion.hotel}</h2>
          <p>{suggestion.reason}</p>
          <a href={suggestion.url} target="_blank" rel="noopener noreferrer">
            View Details
          </a>
        </div>)}
    </div>
  );
}
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main>
        <h1 className={styles.title}>
          Welcome to Trips for good
        </h1>

        <p className={styles.description}>
          Get started by editing <code>pages/index.js</code>
        </p>
        <input onChange={(e) => setSearchCity(e.target.value)} style={{padding: 10, borderRadius: 5, borderWidth: 2, borderColor: 'blue'}}/>

<button onClick={() => handleData()}>{isLoading ? "Loading..." : "search"}</button>
{data && DisplaySuggestions(data)}
        {/* <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div> */}
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
