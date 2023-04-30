import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';

import Nav from '@/Components/Nav';
import GameList from '@/Components/GameList';

// library.add(faAnglesRight)

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Aim Trainer</title>
        <meta name="description" content="Online aim trainer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <div className={`${styles.image}`} style={{zIndex: 0}}>
        <FontAwesomeIcon icon={faBullseye} className={`text-75 text-colour-3 ${styles.target}`} />
        {/* <img src={"/bullseye-solid.svg"} className={`${styles.target}`}/> */}
        <div className={`${styles.ball} ${styles.ball1}`}></div>
        <div className={`${styles.ball} ${styles.ball2}`}></div>
        <div className={`${styles.ball} ${styles.ball3}`}></div>
      </div>
      <main className={`bg-1 h-100 w-100 text-colour-white-60 d-flex align-center justify-content-center`} >
        <h1 className={`text-colour-2 text-uppercase text-10 text-right line-height-90 w-50 font-bold text-overflow`} style={{zIndex: 100}}>Aim trainer</h1>
        <div className={`d-flex flex-column gap-10 w-50 align-center`}>
          <div className={`w-50 gap-10 d-flex flex-column`}>
            <GameList />
          </div>
        </div>
      </main>
    </>
  )
}
