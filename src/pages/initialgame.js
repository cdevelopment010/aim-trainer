/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import style from "../styles/InitialGame.module.css";
import Link from "next/link";
import Nav from "@/Components/Nav";

const initialGame = () => {

    const [counter, setCounter] = useState(0); 
    const [mouseClicks, setMouseClicks] = useState(0); 
    const [accuracy, setAccuracy] = useState(0)
    const [timer, setTimer] = useState(30 * 1000); //60 seconds in miliseconds

    useEffect(() => {
      console.log("set accuracy", counter, mouseClicks)
      setAccuracy(mouseClicks ? Math.round((counter / mouseClicks)*100) / 100: 0);
    }, [mouseClicks])

    useEffect(() => {
      if (timer <= 0) {
        document.getElementById("ball").style.visibility = 'hidden';
        gameOver();
        return;
      }
       let interval = setInterval(()=>{
        setTimer(timer => timer - 100);
      }, 100)
      
      return () => {
        clearInterval(interval);
      }
    }, [timer])

    useEffect(() => {
      const div = document.getElementById("ball");   
      div.addEventListener("click", removeBall);  
      generateBall();

      return () => div.removeEventListener("click", removeBall);
    },[])

    function addMouseClicks() {
      if (timer <=0) {return}
      if (timer > 0 ) {
        setMouseClicks(mouseClicks => {
          return mouseClicks + 1
        }); 
      }
    }

    function generateBall() {
        const container = document.getElementById("game-container");
        const div = document.getElementById("ball");
        div.style.visibility = "hidden"
        // div.removeEventListener("click", removeBall);      
        
        let maxLeft = container.offsetWidth - div.offsetWidth; 
        let maxTop = container.offsetHeight - div.offsetHeight;

        let vLeft = Math.floor(Math.random() * maxLeft);
        let vHeight = Math.floor(Math.random() * maxTop);
        
        div.style.left = vLeft + "px";
        div.style.top = vHeight + "px";              
        div.style.visibility = "visible";   
      }
      
      function removeBall() {
        setCounter(counter => counter + 1); 
        generateBall()
      }

      function gameOver() {
        let score = counter * accuracy * 100  ; 
      }

      function restartGame() {
        setCounter(0);
        setTimer(10 * 1000);
        setAccuracy(0); 
        setMouseClicks(0); 
        generateBall();
      }
    return (
        <div id="container" className={`bg-1 ${style.container}`}>
          <Nav />
          <div className={`d-flex justify-content-center align-center ${style['game-nav']}` }>
            <div className={`text-center-div text-colour-white-60 ${style['w-4']} ${style.timer}`}>{Math.round(timer*1)/1000}</div>
            <div className={`text-center-div text-colour-2 ${style['w-7']} ${style.counter}`}>{counter}</div>
            <div className={`text-center-div text-colour-white-60 ${style['w-4']} ${style.accuracy}`}>{ new Intl.NumberFormat(undefined, {style:'percent'}).format(accuracy) }</div>
          </div>
          <div id="game-container" className={style['game-container']} onClick={addMouseClicks}>
            <div id="ball" className={`${style.ball} cursor-pointer`}></div>

          </div>

          {/* Score modal */}
          {timer <= 0 &&
            <div className={`${timer <= 0 ? '' : 'd-none'} ${style.scoreboard}`}>
              <h3>GAME OVER</h3>
              <span>You scored <strong>{(counter * accuracy * 100).toFixed(0)}!</strong></span>
              <div>
              <button>
                <Link href="/">Back to home screen</Link>
              </button>
              <button onClick={restartGame}>Restart</button>
              </div>
            </div>
          }

        </div>
    )
}

export default initialGame;