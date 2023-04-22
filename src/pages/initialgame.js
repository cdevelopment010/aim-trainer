/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import style from "../styles/InitialGame.module.css";

const initialGame = () => {

    const [counter, setCounter] = useState(0); 
    const [mouseClicks, setMouseClicks] = useState(0); 
    const [accuracy, setAccuracy] = useState(0)
    const [timer, setTimer] = useState(10 * 1000); //60 seconds in miliseconds

    useEffect(() => {
      setAccuracy(mouseClicks ? Math.round((counter / mouseClicks)*100) / 100: 0);
    }, [counter, mouseClicks])

    useEffect(() => {
      if (timer <= 0) {
        document.getElementById("ball").style.visibility = 'hidden';
        console.log('Game over...'); //create a function
        gameOver();
        // function will need to tidy up onClick events 
        // show game over screen? Accuracy, targets hit (overall score?)
        // what could be the calculation for overall score? targets * accuracy * 100? 


        
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
      generateBall();
    },[])

    function addMouseClicks() {
      if (timer <=0) {return}
      console.log("mouse click...", timer)
      if (timer > 0 ) {
        setMouseClicks(mouseClicks => mouseClicks + 1); 
      }
    }

    function generateBall() {
        const container = document.getElementById("game-container");
        const containerRect = container.getBoundingClientRect();
        const div = document.getElementById("ball");
        div.style.visibility = "hidden"
        div.addEventListener("click", removeBall);        
        
        let maxLeft = container.offsetWidth - div.offsetWidth; 
        let maxTop = container.offsetHeight - div.offsetHeight;

        // let vLeft = Math.random() * containerRect.width; 
        // let vHeight = Math.random() * containerRect.height;

        let vLeft = Math.floor(Math.random() * maxLeft);
        let vHeight = Math.floor(Math.random() * maxTop);
        
        div.style.left = vLeft + "px";
        div.style.top = vHeight + "px";              
        div.style.visibility = "visible"; 

        return () => div.removeEventListener("click", removeBall);   
      }
      
      function removeBall() {
        setCounter(counter => counter + 1);
        generateBall()
      }

      function gameOver() {
        let score = counter * accuracy * 100  ; 
      }

    return (
        <div id="container" className={style.container}>
          <div className={`d-flex justify-content-center align-center ${style['game-nav']}` }>
            <div className={`text-center-div ${style['w-4']} ${style.timer}`}>{Math.round(timer*1)/1000}</div>
            <div className={`text-center-div ${style['w-5']} ${style.counter}`}>{counter}</div>
            <div className={`text-center-div ${style['w-4']} ${style.accuracy}`}>{ new Intl.NumberFormat(undefined, {style:'percent'}).format(accuracy) }</div>
          </div>
          <div id="game-container" className={style['game-container']} onClick={addMouseClicks}>
            <div id="ball" className={style.ball}></div>

          </div>

        </div>
    )
}

export default initialGame;