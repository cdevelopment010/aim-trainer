/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import style from "../styles/InitialGame.module.css";
import Nav from "@/Components/Nav";
import GameOverModal from "@/Components/GameOverModal";

const precisionGame = () => {

    const [counter, setCounter] = useState(0); 
    const [mouseClicks, setMouseClicks] = useState(0); 
    const [accuracy, setAccuracy] = useState(0)
    const [timer, setTimer] = useState(30 * 1000); //60 seconds in miliseconds
    const [windowWidth, setWindowWidth] = useState();
    const [windowHeight, setWindowHeight] = useState();
    const [ballRadius, setBallRadius] = useState(50);
    const [grid, setGrid] = useState([]) //array of object of all possible ball locations
    const [ballsInGrid, setBallsInGrid] = useState([]); //array of object that the balls current occupy. 
    const [ballRemoved, setBallRemoved]  = useState([])

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
      let totalColumns = Math.floor(window.innerWidth / (ballRadius * 2)); 
      let totalRows = Math.floor((window.innerHeight * 0.9) /  (ballRadius * 2));

      let posArr = []; 

      for(let i = 0; i < totalColumns; i++) {
        for(let j = 0; j < totalRows; j++) {
            let position = {x: i*ballRadius*2, y: j*ballRadius*2}
            posArr.push(position);
        }
      }

      setGrid(posArr);
    },[])

    useEffect(() => {
        if (grid) {
            generateBall();
            drawBalls();
            // generateGrid();
        }
    },[ballsInGrid, grid])

    function addMouseClicks(e) {
      checkBallClick(e);
      if (timer <=0) {return}
      if (timer > 0 ) {
        setMouseClicks(mouseClicks => {
          return mouseClicks + 1
        }); 
      }
    }

    function generateGrid() {
        const canvas = document.getElementById("game-container");
        const ctx = canvas.getContext("2d");
        
        let totalColumns = Math.floor(window.innerWidth / (ballRadius * 2)); 
        let totalRows = Math.floor((window.innerHeight * 0.9) /  (ballRadius * 2));

        //columns
        while (totalColumns > 0) {
            ctx.beginPath(); 
            ctx.moveTo(totalColumns*(ballRadius * 2),0);
            ctx.lineTo(totalColumns*(ballRadius * 2),windowHeight)
            ctx.strokeStyle = '#F49E4C';
            ctx.stroke();
            ctx.closePath(); 
            totalColumns--;
        }
        //rows
        while (totalRows > 0) {
            ctx.beginPath(); 
            ctx.moveTo(0, totalRows*(ballRadius * 2));
            ctx.lineTo(windowWidth, totalRows*(ballRadius * 2))
            ctx.strokeStyle = '#F49E4C';
            ctx.stroke();
            ctx.closePath(); 
            totalRows--;
        }
    }

    function checkBallClick(e) {
      const canvas = document.getElementById("game-container");
      const rect = canvas.getBoundingClientRect(); 
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      //loop through current balls to see if one has been clicked;

      let currentBalls = [...ballsInGrid]; 
      currentBalls.forEach((ball, ind) => {
        const distance = Math.sqrt((mouseX - ball.x - 50) **2 + (mouseY - ball.y - 50)**2);
        if (distance < 50) {
            let newBallList = currentBalls.filter(cell => !(cell.x === ball.x && cell.y === ball.y));
            setBallRemoved([ball]);
            setBallsInGrid(newBallList);
            removeBall();
            return;
        }
      })
    }

    function generateBall() {
        if (ballsInGrid.length > 2) return;
        console.log("generate ball...", ballsInGrid.length);

        let vBallsInGrid = [...ballsInGrid]; 
        let currentGridCell;
        if (vBallsInGrid.length == 0) {
            //select random grid 
            currentGridCell = grid[Math.floor(Math.random() * grid.length)]; 
        } else {
            // get min/max of x & y from the balls current selected
            let xMin = vBallsInGrid.sort((a,b) => a.x < b.x && a.y < b.y ? -1 : 1)[0].x;
            let yMin = vBallsInGrid.sort((a,b) => a.x < b.x && a.y < b.y ? -1 : 1)[0].y;
            let xMax = vBallsInGrid.sort((a,b) => a.x < b.x && a.y < b.y ? 1 : -1)[0].x;
            let yMax = vBallsInGrid.sort((a,b) => a.x < b.x && a.y < b.y ? 1 : -1)[0].y;

            let avaiableCells = grid.filter(cell => !vBallsInGrid.includes(cell)) //!ballRemoved.includes(cell)
            avaiableCells = avaiableCells.filter(cell => !ballRemoved.includes(cell))
            let avaiableCells2 = avaiableCells.filter(cell =>(cell.x >= xMin-(ballRadius*2) && cell.x <= xMax+(ballRadius*2)) && (cell.y >= yMin-(ballRadius*2) && cell.y <= yMax + (ballRadius*2)) )
            // console.log(avaiableCells2);            
            currentGridCell = avaiableCells2[Math.floor(Math.random() * avaiableCells2.length)];     

            // 1) find all cells around the first ball
            // 2) find all cells around the second ball 
            // 3) union cells? 
            // 4) remove cell that the ball had just been in
            // 


            // testing - keeping in for refence for now. 
            // let availableCellsAroundBall1 = grid.filter(cell => (cell.x >= vBallsInGrid[0].x-(ballRadius*2) && cell.x <= vBallsInGrid[0].x+(ballRadius*2)) && (cell.y >= vBallsInGrid[0].y-(ballRadius*2) && cell.y <= vBallsInGrid[0].y + (ballRadius*2)) && !(cell.x == vBallsInGrid[0].x && cell.y === vBallsInGrid[0].y)  )
            // console.log("availableCellsAroundBall1:", availableCellsAroundBall1,  vBallsInGrid[0]);
            // let availableCellsAroundBall2 = [];
            // let delta = 0;
            // if (vBallsInGrid.length == 2 ){
            //   availableCellsAroundBall2 = grid.filter(cell => (cell.x >= vBallsInGrid[1].x-(ballRadius*2) && cell.x <= vBallsInGrid[1].x+(ballRadius*2)) && (cell.y >= vBallsInGrid[1].y-(ballRadius*2) && cell.y <= vBallsInGrid[1].y + (ballRadius*2)) && !(cell.x == vBallsInGrid[1].x && cell.y === vBallsInGrid[1].y)  )
            //   availableCellsAroundBall2 = availableCellsAroundBall2.filter(cell => !(cell.x === vBallsInGrid[0].x && cell.y === vBallsInGrid[0].y) )
            //   // availableCellsAroundBall2 = availableCellsAroundBall2.filter(cell => !availableCellsAroundBall1.includes(cell) )
            //   console.log("availableCellsAroundBall2:", availableCellsAroundBall2,  vBallsInGrid[1]);
              
            //   /// check if there is a gap between the two balls
            //   delta = Math.sqrt(  (vBallsInGrid[0].x - vBallsInGrid[1].x) ** 2 +   (vBallsInGrid[0].y - vBallsInGrid[1].y) ** 2 );
            //   console.log("delta",delta);
            // }


            // let totalAvailableCells = [];
            // if (delta > 150) {
            //   // intersect
            //   totalAvailableCells = availableCellsAroundBall1.filter(cell => availableCellsAroundBall2.includes(cell));
            // } else {
            //   totalAvailableCells = [...availableCellsAroundBall1, ...availableCellsAroundBall2]; 
            // }
            // console.log("totalAvailableCells",totalAvailableCells);

            // currentGridCell = totalAvailableCells[Math.floor(Math.random() * totalAvailableCells.length)];

        }

        
        if (currentGridCell === undefined) {
            console.log("currentGridCell isn't populated!")
            return;
        }

        vBallsInGrid.push(currentGridCell);
        setBallsInGrid(vBallsInGrid);    
           
        
      }

      function drawBalls() {
        const canvas = document.getElementById("game-container");
        const ctx = canvas.getContext("2d");
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let balls = [...ballsInGrid];

        balls.forEach((ball, ind) => {
            // console.log("ball", ball);
            let ballLocalX = ball.x + 50;
            let ballLocalY = ball.y + 50; 

            ctx.beginPath(); 
            ctx.arc(ballLocalX, ballLocalY, ballRadius, 0, Math.PI * 2);
            // ctx.fillStyle = ind == 0 ? "red" : ind == 1 ? "blue" : "#A4C2A5";
            ctx.fillStyle = "#A4C2A5";
            ctx.fill();

            const shadowGradient = ctx.createRadialGradient(ballLocalX- ballRadius*0.4, ballLocalY- ballRadius*0.4, ballRadius / 4, ballLocalX, ballLocalY, ballRadius*1.3)
            shadowGradient.addColorStop(0, "rgba(0, 0, 0, 0)");
            shadowGradient.addColorStop(1, "rgba(0, 0, 0, 0.5)");
            ctx.fillStyle = shadowGradient;
            ctx.fill();

            ctx.closePath();

        })

        
      }
      
      function removeBall() {
        setCounter(counter => counter + 1); 
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

export default precisionGame;