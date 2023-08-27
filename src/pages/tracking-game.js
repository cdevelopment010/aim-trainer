
import { useState, useEffect } from "react";
import GameOverModal from "@/Components/GameOverModal";
import Nav from "@/Components/Nav";
import style from "../styles/InitialGame.module.css";

const TrackingGame = () => {

    const [counter, setCounter] = useState(0); 
    const [mouseClicks, setMouseClicks] = useState(0); 
    const [accuracy, setAccuracy] = useState(0)
    const [timer, setTimer] = useState(30 * 1000); //30 seconds in miliseconds
    const [mouseHover, setMouseHover] = useState(false);
    const [canvas, setCanvas] = useState();
    const [windowWidth, setWindowWidth] = useState();
    const [windowHeight, setWindowHeight] = useState();
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);
    const [ballX, setBallX] = useState(0);
    const [ballY, setBallY] = useState(0);
    const [ballX2, setBallX2] = useState(0);
    const [ballY2, setBallY2] = useState(0);
    const [speed, setSpeed] = useState(2);


    useEffect(() => {
      setAccuracy(mouseClicks ? Math.round((counter / mouseClicks)*100) / 100: 0);
    }, [mouseClicks])

    useEffect(() => {
      // moveBall();
      if (timer <= 0) {
        gameOver();
        return;
      }
      
      let interval = setInterval(()=>{
        checkBallPos()
        if(mouseHover) {
          setCounter(() => counter + 1)
        }

        setMouseClicks(() => mouseClicks + 1)
        setTimer(timer => timer - 100);
      }, 100)
      
      return () => {
        clearInterval(interval);
      }
    }, [timer])


    useEffect(() => {
      window.addEventListener("mousemove", getCurrentMouse); 
      setWindowWidth(window.innerWidth); 
      setWindowHeight(window.innerHeight * 0.9);
      return ()=> window.removeEventListener("mousemove", getCurrentMouse);
    },[])

    useEffect(() => {
      if (windowWidth){
        setCanvas(document.getElementById("game-container"));
        let [ballLocalX, ballLocalY] = newPosition(); 
        setBallX(ballLocalX);
        setBallY(ballLocalY);
        let [ballLocalX2, ballLocalY2] = newPosition(); 
        setBallX2(ballLocalX2);
        setBallY2(ballLocalY2);
      }
    }, [windowWidth])

    useEffect(()=> {
      let interval = setInterval(() => {
        moveBall();

      }, 10)

      return () => clearInterval(interval);
    }, [ballX])
  

    function getCurrentMouse(e) {
      setMouseX(e.clientX); 
      setMouseY(e.clientY);
    }

    function checkBallPos() {
      const canvas = document.getElementById("game-container");
      const rect = canvas.getBoundingClientRect(); 
      const mouseX1 = mouseX - rect.left;
      const mouseY1 = mouseY - rect.top;

      const distance = Math.sqrt((mouseX1 - ballX) **2 + (mouseY1 - ballY)**2);
      if (distance < 50) {
        removeBall();
      } else {
        setMouseHover(false);
      }
    }

    function drawBall() {
      const canvas = document.getElementById("game-container");
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const ballRadius = 50; 
      ctx.beginPath(); 
      ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#A4C2A5";
      ctx.fill();

      const shadowGradient = ctx.createRadialGradient(ballX- ballRadius*0.4, ballY- ballRadius*0.4, ballRadius / 4, ballX, ballY, ballRadius*1.3)
      shadowGradient.addColorStop(0, "rgba(0, 0, 0, 0)");
      shadowGradient.addColorStop(1, "rgba(0, 0, 0, 0.5)");
      ctx.fillStyle = shadowGradient;
      ctx.fill();

      ctx.closePath();

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
        const ballRadius = 50; 
        let ballLocalX = Math.floor(Math.random() * maxLeft) + 50;
        let ballLocalY = Math.floor(Math.random() * maxTop) + 50; 
        setBallX(ballLocalX);
        setBallY(ballLocalY);
        
        let ballLocalX2 = Math.floor(Math.random() * maxLeft) + 50;
        let ballLocalY2 = Math.floor(Math.random() * maxTop) + 50;
        setBallX2(ballLocalX2);
        setBallY2(ballLocalY2); 

        ctx.beginPath(); 
        // ctx.arc(95, 50, 40, 0, 2 * Math.PI);
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
      
      function moveBall() {
        if (timer <=0) return;
        let canvas = document.getElementById("game-container");
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawBall(); 
        // console.log([ballX, ballY], [ballX2, ballY2]);
        let deltaX = ballX2 - ballX; 
        let deltaY = ballY2 - ballY; 

        if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10){
            let [ballLocalX, ballLocalY] = newPosition();
            setBallX(ballX2);
            setBallY(ballY2);
            setBallX2(ballLocalX);
            setBallY2(ballLocalY);
            setSpeed(Math.floor(Math.random() * (5 - 2 + 1)+2 ))
      }

      
      let distance = Math.sqrt(deltaX ** 2 + deltaY **  2)

      setBallX(() => ballX + (deltaX  / distance) * speed);
      setBallY(() => ballY + (deltaY  / distance) * speed);
    }

 

      function newPosition() {
        const canvas = document.getElementById("game-container");
        const ctx = canvas.getContext("2d");
        let maxLeft = canvas.width - 100;
        let maxTop = canvas.height - 100; 
        let ballLocalX = Math.floor(Math.random() * maxLeft) + 50;
        let ballLocalY = Math.floor(Math.random() * maxTop) + 50;
        
        return [ballLocalX, ballLocalY];
      }

      function removeBall() {
        setMouseHover(true);
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
            <div className={`text-center-div text-colour-2 ${style['w-7']} ${style.counter}`}>{counter}</div>
            <div className={`text-center-div text-colour-white-60 ${style['w-4']} ${style.accuracy}`}>{ new Intl.NumberFormat(undefined, {style:'percent'}).format(accuracy) }</div>
          </div>
          
          <canvas id="game-container" width={windowWidth} height={windowHeight}></canvas>

          {/* Score modal */}
          {timer <= 0 &&
            <GameOverModal score={(counter * accuracy * 100).toFixed(0)} restartGame={restartGame}/>
          }

        </div>
    )
}

export default TrackingGame;