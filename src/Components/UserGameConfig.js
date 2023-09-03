
import modalStyles from '@/styles/modal.module.css'; 
import Link from 'next/link';
import { useEffect } from 'react';

export default function UserGameConfig({setGameStart, ballRadius, setBallRadius, gameType = null, decreasingOption, setDecreasingOption}) {

    useEffect(()=> {
        drawBall();


    },[])

    useEffect(() => {
        let timeout = setTimeout(() => {
            if (timeout) {
                clearTimeout(timeout);
            }
            drawBall()
        }, 0)

        return () => clearTimeout(timeout);
    }, [ballRadius])

    const drawBall = () => {
        const canvas = document.getElementById("ball-canvas");
        const ctx = canvas.getContext("2d");
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let ballLocalX = 100;
        let ballLocalY = 100; 

        ctx.beginPath(); 
        ctx.arc(ballLocalX, ballLocalY, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#A4C2A5";
        ctx.fill();

        const shadowGradient = ctx.createRadialGradient(ballLocalX- ballRadius*0.4, ballLocalY- ballRadius*0.4, ballRadius / 4, ballLocalX, ballLocalY, ballRadius*1.3)
        shadowGradient.addColorStop(0, "rgba(0, 0, 0, 0)");
        shadowGradient.addColorStop(1, "rgba(0, 0, 0, 0.5)");
        ctx.fillStyle = shadowGradient;
        ctx.fill();

        ctx.closePath();
    }

    return (
        <div className={modalStyles['modal-container']}>
            <div className={modalStyles.overlay}></div>
            <div className={`${modalStyles.modal} bg-1`}>
                <div className={modalStyles['modal-header']}>
                    <h2 className="text-colour-2 m-4 text-3">Game setup</h2>
                </div>
                <div className={`${modalStyles['modal-body-1fr']} text-center`}>
                    <div>
                        <div>
                            <label htmlFor="myRange" className='m-2'>
                               {gameType === "precision" && 
                               <span>Initial </span>}
                                Ball size:
                            </label>
                            <input type="range" min="10" max="75" value={ballRadius}
                                onChange={(e) => setBallRadius(e.target.value*1)}
                                id="myRange" />
                        </div>
                        <div>
                            <canvas id="ball-canvas" height="200" width="200"></canvas>
                        </div>
                    </div>
                    {
                        gameType === "precision" &&
                        <div className='d-flex align-items-center justify-content-between'>
                            <input type="radio" id="random" name="ball-radius" value="random" onChange={() => setDecreasingOption("random")} checked={decreasingOption === "random"} className='mr-1'/>
                            <label for="random" className='mr-3'>Random ball size</label><br/>
                            <input type="radio" id="decreasing" name="ball-radius" value="decreasing" onChange={() => setDecreasingOption("decreasing")} checked={decreasingOption === "decreasing"} className='mr-1'/>
                            <label for="decreasing">Decreasing ball size</label><br/>
                        </div>
                    }
                </div>
                <div className={modalStyles['modal-footer']}>
                    <button className={`btn btn-secondary`}>
                        <Link href="/">Back to home screen</Link>
                    </button>
                    <button className={`btn btn-primary`} onClick={() => setGameStart(true)}>Start!</button>
                </div>
            </div>
        </div>
    )
}