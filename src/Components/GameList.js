
import styles from '@/styles/Home.module.css'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
// import { library } from '@fortawesome/fontawesome-svg-core';

export default function GameList() {
    return (
        <>
        <div className={`game`}>
              <Link href="/initialgame" className={`text-colour-2 ${styles.gametitle}`} >
                <h2 className={`text-colour-white-60 ${styles.gametitlehover}`}>
                  <FontAwesomeIcon icon={faAnglesRight} className={styles.gameIcon}/> 
                  Initial Game!
                </h2>
                </Link>
              <p className={`text-colour-white-40 ${styles.gamedeschover}`}>This is the first iteration of the aim trainer. Try to hit as many targets as possible within the time limit</p>
            </div>
            <hr />
            <div className={`game`}>
              <Link href="/" className={`text-colour-2 ${styles.gametitle}`} >
                <h2 className={`text-colour-white-60 ${styles.gametitlehover}`}>
                  <FontAwesomeIcon icon={faAnglesRight} className={styles.gameIcon}/> 
                  Game #2
                </h2>
                </Link>
              <p className={`text-colour-white-40 ${styles.gamedeschover}`}>This is the first iteration of the aim trainer. Try to hit as many targets as possible within the time limit</p>
            </div>
            <hr />
            <div className={`game`}>
              <Link href="/" className={`text-colour-2 ${styles.gametitle}`} >
                <h2 className={`text-colour-white-60 ${styles.gametitlehover}`}>
                  <FontAwesomeIcon icon={faAnglesRight} className={styles.gameIcon}/> 
                  Game #3
                </h2>
                </Link>
              <p className={`text-colour-white-40 ${styles.gamedeschover}`}>This is the first iteration of the aim trainer. Try to hit as many targets as possible within the time limit</p>
            </div>
            <hr />
            <div className={`game`}>
              <Link href="/" className={`text-colour-2 ${styles.gametitle}`} >
                <h2 className={`text-colour-white-60 ${styles.gametitlehover}`}>
                  <FontAwesomeIcon icon={faAnglesRight} className={styles.gameIcon}/> 
                  Game #4
                </h2>
                </Link>
              <p className={`text-colour-white-40 ${styles.gamedeschover}`}>This is the first iteration of the aim trainer. Try to hit as many targets as possible within the time limit</p>
            </div>
            <hr />
            <div className={`game`}>
              <Link href="/" className={`text-colour-2 ${styles.gametitle}`} >
                <h2 className={`text-colour-white-60 ${styles.gametitlehover}`}>
                  <FontAwesomeIcon icon={faAnglesRight} className={styles.gameIcon}/> 
                  Game #5
                </h2>
                </Link>
              <p className={`text-colour-white-40 ${styles.gamedeschover}`}>This is the first iteration of the aim trainer. Try to hit as many targets as possible within the time limit</p>
            </div>
        </>
    )
}