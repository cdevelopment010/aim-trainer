
import { useState, useEffect } from "react";
import GameOverModal from "@/Components/GameOverModal";
import Nav from "@/Components/Nav";
import style from "../styles/InitialGame.module.css";

const trackingGame = () => {

    const [counter, setCounter] = useState(0); 
    const [mouseClicks, setMouseClicks] = useState(0); 
    const [accuracy, setAccuracy] = useState(0)
    const [timer, setTimer] = useState(30 * 1000); //60 seconds in miliseconds
    const [mouseHover, setMouseHover] = useState(false);


    useEffect(() => {
      setAccuracy(mouseClicks ? Math.round((counter / mouseClicks)*100) / 100: 0);
    }, [mouseClicks])

    useEffect(() => {
      if (timer <= 0) {
        document.getElementById("ball").style.visibility = 'hidden';
        gameOver();
        return;
      }
       let interval = setInterval(()=>{
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
      const div = document.getElementById("ball"); 
      div.addEventListener("mouseout", () => setMouseHover(false))
      div.addEventListener("mouseover", removeBall);  
      generateBall();
      moveBall(); 

      return () => div.removeEventListener("mouseover", removeBall);
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
        
        let maxLeft = container.offsetWidth - div.offsetWidth; 
        let maxTop = container.offsetHeight - div.offsetHeight;

        let vLeft = Math.floor(Math.random() * maxLeft);
        let vHeight = Math.floor(Math.random() * maxTop);
        
        div.style.left = vLeft + "px";
        div.style.top = vHeight + "px";              
        div.style.visibility = "visible";   
      }
      
      function moveBall() {
        const div = document.getElementById("ball");
        // let [oldTop, oldLeft] = [div.getBoundingClientRect().top, div.getBoundingClientRect().left]
        let [top,left] = newPosition();
        // let speed = generateSpeed([oldTop, oldLeft], [top, left]);
        div.animate({top: top + 'px', left: left + 'px'},3000).finished.then(
          function() { 
            div.style.top = top + 'px';
            div.style.left = left + 'px';
            moveBall() }
        )

      }

      function newPosition() {
        const container = document.getElementById("game-container");
        const div = document.getElementById("ball");
        let maxLeft = container?.offsetWidth - div.offsetWidth; 
        let maxTop = container?.offsetHeight - div.offsetHeight;
        let vLeft = Math.floor(Math.random() * maxLeft);
        let vHeight = Math.floor(Math.random() * maxTop);
        
        return [vHeight, vLeft];
      }

      function generateSpeed(oldPos, newPos) {
        let x = Math.abs(oldPos[1] - newPos[1]);
        let y = Math.abs(oldPos[0] - newPos[0]);
        let greatest = x > y ? x : y;
        let speedModifier = Math.random();
        let speed = Math.ceil(greatest/speedModifier);
        return speed;
      }



      function removeBall() {
        console.log("move overball")
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
          <div id="game-container" className={style['game-container']}>
            <div id="ball" className={`${style.ball} cursor-pointer`}></div>
          </div>

          {/* Score modal */}
          {timer <= 0 &&
            <GameOverModal score={(counter * accuracy * 100).toFixed(0)} restartGame={restartGame}/>
          }

        </div>
    )
}

export default trackingGame;