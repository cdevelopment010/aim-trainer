
import styles from '@/styles/Home.module.css'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
// import { library } from '@fortawesome/fontawesome-svg-core';

export default function GameList() {
    return (
        <>
        <div className={`game`}>
              <Link href="/target-practice" className={`text-colour-2 ${styles.gametitle}`} >
                <h2 className={`text-colour-white-60 ${styles.gametitlehover}`}>
                  <FontAwesomeIcon icon={faAnglesRight} className={styles.gameIcon}/> 
                  Target practice
                </h2>
                </Link>
              <p className={`text-colour-white-40 ${styles.gamedeschover}`}>Try to hit as many targets as possible within the time limit</p>
            </div>
            <hr />
            <div className={`game`}>
              <Link href="/tracking-game" className={`text-colour-2 ${styles.gametitle}`} >
                <h2 className={`text-colour-white-60 ${styles.gametitlehover}`}>
                  <FontAwesomeIcon icon={faAnglesRight} className={styles.gameIcon}/> 
                  Tracking Game
                </h2>
                </Link>
              <p className={`text-colour-white-40 ${styles.gamedeschover}`}>Hover over the target for as long as possible.</p>
            </div>
            <hr />
            <div className={`game`}>
              <Link href="/precision-game" className={`text-colour-2 ${styles.gametitle}`} state={{precision: true}} >
                <h2 className={`text-colour-white-60 ${styles.gametitlehover}`}>
                  <FontAwesomeIcon icon={faAnglesRight} className={styles.gameIcon}/> 
                  Precision Training
                </h2>
                </Link>
              <p className={`text-colour-white-40 ${styles.gamedeschover}`}>Try to hit as many targets as possible within the time limit, but watch out! The target changes size. </p>
            </div>
            <hr />
            <div className={`game`}>
              <Link href="/grid-shot" className={`text-colour-2 ${styles.gametitle}`} >
                <h2 className={`text-colour-white-60 ${styles.gametitlehover}`}>
                  <FontAwesomeIcon icon={faAnglesRight} className={styles.gameIcon}/> 
                  Grid Shot
                </h2>
                </Link>
              <p className={`text-colour-white-40 ${styles.gamedeschover}`}></p>
            </div>
            <hr />
            {/* <div className={`game`}>
              <Link href="/" className={`text-colour-2 ${styles.gametitle}`} >
                <h2 className={`text-colour-white-60 ${styles.gametitlehover}`}>
                  <FontAwesomeIcon icon={faAnglesRight} className={styles.gameIcon}/> 
                  Game #5
                </h2>
                </Link>
              <p className={`text-colour-white-40 ${styles.gamedeschover}`}>This is the first iteration of the aim trainer. Try to hit as many targets as possible within the time limit</p>
            </div> */}
        </>
    )
}