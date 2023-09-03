/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import style from "../styles/InitialGame.module.css";
import Nav from "@/Components/Nav";
import GameOverModal from "@/Components/GameOverModal";
import UserGameConfig from "@/Components/UserGameConfig";
import CurrentGameStats from "@/Components/CurrentGameStats";

const precisionGame = ({precision = true}) => {

    const [gameStart, setGameStart] = useState(false);
    const [counter, setCounter] = useState(0); 
    const [mouseClicks, setMouseClicks] = useState(0); 
    const [accuracy, setAccuracy] = useState(0)
    const [timer, setTimer] = useState(30 * 1000); //60 seconds in miliseconds
    const [windowWidth, setWindowWidth] = useState();
    const [windowHeight, setWindowHeight] = useState();
    const [ballX, setBallX] = useState(0);
    const [ballY, setBallY] = useState(0);
    const [ballRadius, setBallRadius] = useState(50);
    const [maxballRadius, setMaxBallRadius] = useState(50);
    const [decreasingOption, setDecreasingOption] = useState("random");

    useEffect(() => {
      setAccuracy(mouseClicks ? Math.round((counter / mouseClicks)*100) / 100: 0);
    }, [mouseClicks])

    useEffect(() => {
      if (timer <= 0) {
        gameOver();
        return;
      }
       let interval
      if (gameStart) {
        interval  = setInterval(()=>{
          setTimer(timer => timer - 100);
        }, 100)
      }
      
      return () => {
        clearInterval(interval);
      }
    }, [timer, gameStart])

    useEffect(() => {
      if (gameStart) {
        setWindowWidth(window.innerWidth); 
        setWindowHeight(window.innerHeight * 0.9);
        setMaxBallRadius(ballRadius);
      }
    },[gameStart])

    useEffect(() => {
      if (windowWidth) {
        generateBall(); 
      }
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

      let newBallRadius = ballRadius;
      if (distance < ballRadius) {
        if (decreasingOption === "decreasing"){
          newBallRadius = newBallRadius - 2 < 10 ? 10 : newBallRadius - 2;
        }
        removeBall();
      } else {
        if (decreasingOption === "decreasing"){
          newBallRadius += 2; 
        }
        
      }
      setBallRadius(newBallRadius);
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
        if (decreasingOption === "random") {
          localBallRadius = Math.floor(Math.random() * (maxballRadius - 10 + 1)+10); 
          setBallRadius(localBallRadius);
        } else {
          // localBallRadius = Math.floor(ballRadius * accuracy);
          console.log("decreasing ball radius:", localBallRadius) 
          setBallRadius(localBallRadius);
        }
         
        let ballLocalX = Math.floor(Math.random() * maxLeft) + localBallRadius;
        let ballLocalY = Math.floor(Math.random() * maxTop) + localBallRadius; 
        setBallX(ballLocalX);
        setBallY(ballLocalY);

        ctx.beginPath(); 
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
        setGameStart(false)
        generateBall();
      }
    return (
        <div id="container" className={`bg-1 ${style.container}`}>
          <Nav />
          <CurrentGameStats timer={timer} counter={counter} accuracy={accuracy}/>
          <canvas id="game-container" width={windowWidth} height={windowHeight} onClick={addMouseClicks}></canvas>

          {/* Score modal */}
          {timer <= 0 &&
            <GameOverModal score={(counter * accuracy * 100).toFixed(0)} restartGame={restartGame}/>
          }

          {
            !gameStart &&
            <UserGameConfig 
              setGameStart={setGameStart} 
              ballRadius={ballRadius} 
              setBallRadius={setBallRadius} 
              gameType="precision"
              decreasingOption={decreasingOption}
              setDecreasingOption={setDecreasingOption}
              />
          }

        </div>
    )
}

export default precisionGame;