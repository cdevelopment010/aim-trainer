
import style from "../styles/InitialGame.module.css";

export default function CurrentGameStats({timer, counter, accuracy}) {
    return(
        <div className={`d-flex justify-content-center align-center ${style['game-nav']} gap-10` }>
            <div className={`text-center-div text-colour-white-60 ${style['w-4']} ${style.timer}`}>{Math.round(timer*1)/1000}</div>
            <div className={`text-center-div text-colour-2 ${style['min-w-7']} ${style.counter}`}>{counter}</div>
            <div className={`text-center-div text-colour-white-60 ${style['w-4']} ${style.accuracy}`}>{ new Intl.NumberFormat(undefined, {style:'percent'}).format(accuracy) }</div>
        </div>
    )
}