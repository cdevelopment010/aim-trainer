import { useEffect } from "react";
import style from "../styles/InitialGame.module.css"

const initialGame = () => {

    useEffect(() => {
        generateBall();
    },[])

    function generateBall() {
        const container = document.getElementById("container");
        const containerRect = container.getBoundingClientRect();
        // const div = document.createElement("div");
        const div = document.getElementById("ball");
        div.style.visibility = "hidden"
        div.addEventListener("click", removeBall);        
        
        let vLeft = Math.random() * window.innerWidth; 
        let vHeight = Math.random() * window.innerHeight;
        
        div.style.left = vLeft + "px";
        div.style.top = vHeight + "px";
        let divRect = div.getBoundingClientRect()
        div.style.visibility = "visible"; 
        
        if (divRect.bottom > containerRect.bottom) {
          alert("Off screen");
        }
        
      }
      
      function removeBall() {
        // console.log(this)
        // this.remove(); 
        generateBall()
      }

    return (
        <div id="container" className={style.container}>
            <div id="ball" className={style.ball}></div>
        </div>
    )
}

export default initialGame;