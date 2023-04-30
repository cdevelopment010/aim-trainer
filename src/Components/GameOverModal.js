import styles from '@/styles/modal.module.css'; 
import Link from 'next/link';

export default function GameOverModal({score, restartGame}) {

    return(
        <div className={styles['modal-container']}>
            <div className={styles.overlay}></div>
            <div className={`${styles.modal} bg-1`}>
                <div className="modal-header">
                    <h2 className="text-colour-2 m-4 text-3">Game Over</h2>
                </div>
                <div className={`${styles['modal-body']} text-center`}>
                    <div>You scored <span className="text-colour-4 font-bold">{score}!</span></div>
                    <div>
                        {/* This could be the previous score area or leadboard */}
                    </div>

                </div>
                <div className={styles['modal-footer']}>
                    <button className={`btn btn-secondary`}>
                        <Link href="/">Back to home screen</Link>
                    </button>
                    <button className={`btn btn-primary`} onClick={restartGame}>Restart</button>
                </div>
            </div>
        </div>
    )
}