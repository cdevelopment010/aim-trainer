/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import style from "../styles/InitialGame.module.css";
import Nav from "@/Components/Nav";
import GameOverModal from "@/Components/GameOverModal";

const initialGame = ({precision = false}) => {

    const [counter, setCounter] = useState(0); 
    const [mouseClicks, setMouseClicks] = useState(0); 
    const [accuracy, setAccuracy] = useState(0)
    const [timer, setTimer] = useState(30 * 1000); //60 seconds in miliseconds
    const [windowWidth, setWindowWidth] = useState();
    const [windowHeight, setWindowHeight] = useState();
    const [ballX, setBallX] = useState(0);
    const [ballY, setBallY] = useState(0);
    const [ballRadius, setBallRadius] = useState(50);

    useEffect(() => {
      setAccuracy(mouseClicks ? Math.round((counter / mouseClicks)*100) / 100: 0);
    }, [mouseClicks])

    useEffect(() => {
      if (timer <= 0) {
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
      setWindowWidth(window.innerWidth); 
      setWindowHeight(window.innerHeight * 0.9);
    },[])

    useEffect(() => {
      generateBall(); 
    }, [windowWidth])

    function addMouseClicks(e) {
      checkBallClick(e);
      if (timer <=0) {return}
      if (timer > 0 ) {
        setMouseClicks(mouseClicks => {
          return mouseClicks + 1
        }); 
      }
    }

    function checkBallClick(e) {
      const canvas = document.getElementById("game-container");
      const rect = canvas.getBoundingClientRect(); 
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const distance = Math.sqrt((mouseX - ballX) **2 + (mouseY - ballY)**2);

      if (distance < 50) {
        removeBall();
      }

    }

    function generateBall() {
        const canvas = document.getElementById("game-container");
        const ctx = canvas.getContext("2d");

        //clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //ball properties
        let maxLeft = canvas.width - 100;
        let maxTop = canvas.height - 100; 

        // issue with ball going off the canvas in the y direction
        let localBallRadius = ballRadius;
        if (precision) {
          localBallRadius = Math.floor(Math.random() * (50 - 10 + 1)+10); 
          setBallRadius(localBallRadius);
        }
         
        let ballLocalX = Math.floor(Math.random() * maxLeft) + 50;
        let ballLocalY = Math.floor(Math.random() * maxTop) + 50; 
        setBallX(ballLocalX);
        setBallY(ballLocalY);

        ctx.beginPath(); 
        // ctx.arc(95, 50, 40, 0, 2 * Math.PI);
        ctx.arc(ballLocalX, ballLocalY, localBallRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#A4C2A5";
        ctx.fill();

        const shadowGradient = ctx.createRadialGradient(ballLocalX- localBallRadius*0.4, ballLocalY- localBallRadius*0.4, localBallRadius / 4, ballLocalX, ballLocalY, localBallRadius*1.3)
        shadowGradient.addColorStop(0, "rgba(0, 0, 0, 0)");
        shadowGradient.addColorStop(1, "rgba(0, 0, 0, 0.5)");
        ctx.fillStyle = shadowGradient;
        ctx.fill();
  
        ctx.closePath();
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
        setTimer(30 * 1000);
        setAccuracy(0); 
        setMouseClicks(0); 
        generateBall();
      }
    return (
        <div id="container" className={`bg-1 ${style.container}`}>
          <Nav />
          <div className={`d-flex justify-content-center align-center ${style['game-nav']} gap-10` }>
            <div className={`text-center-div text-colour-white-60 ${style['w-4']} ${style.timer}`}>{Math.round(timer*1)/1000}</div>
            <div className={`text-center-div text-colour-2 ${style['min-w-7']} ${style.counter}`}>{counter}</div>
            <div className={`text-center-div text-colour-white-60 ${style['w-4']} ${style.accuracy}`}>{ new Intl.NumberFormat(undefined, {style:'percent'}).format(accuracy) }</div>
          </div>
          <canvas id="game-container" width={windowWidth} height={windowHeight} onClick={addMouseClicks}></canvas>

          {/* Score modal */}
          {timer <= 0 &&
            <GameOverModal score={(counter * accuracy * 100).toFixed(0)} restartGame={restartGame}/>
          }

        </div>
    )
}

export default initialGame;