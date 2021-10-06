import React, { useState, useEffect } from "react";
import "./keyboard.css";
import Labels from "../labels/labels";
import data from "../../Assets/data";
import Counter from "../headers/countdown";
import Header from "../headers/header";
import axios from 'axios'
import {useParams,Link} from 'react-router-dom';
function Keyborad() {
  const [state, setState] = useState("");
  const [score, setscore] = useState(0);
  const [level, setlevel] = useState(0);
  var [arr, setarr] = useState([]);
  const [counter, setcounter] = useState(2);
  const [timer, settimer] = useState("");
  const [gameover, setgameover] = useState(false);
  const [speed, setspeed] = useState(0);
  const [blocker, setblocker] = useState(0);
  const [wrong, setwrong] = useState(0);
  const {name}=useParams()
  


  useEffect(() => {
    if (arr.length === 0) {
      for (var i = 0; i <= 4; i++) {
        const value = data[Math.floor(Math.random() * data.length)];

        arr.push(value.toUpperCase());
        setarr(arr);
      }
    }

    if (gameover) {
      setcounter(0);
    }
  });
  useEffect(() => {
    if (parseInt(timer) === 0) {
      setblocker(blocker + 1);
      if (blocker === 3) {
        
        setgameover(true);
      }

     
    }
   
  }, [timer]);
  useEffect(() => {

      document.onkeydown = function (evt) {
        evt = evt || window.event;
  
        if (evt.code === "Enter") {
          setState("");
          const value = arr.find((e) => e === state.toUpperCase());
          if (value !== undefined) {
            setarr(arr.filter((e) => e !== state.toUpperCase()));
            setblocker(blocker);
            var msg = new SpeechSynthesisUtterance();
msg.text = "Correct one";
window.speechSynthesis.speak(msg);
            setscore(score + 1);
  
            //to set speed of a game.
            if (score % 3 === 0) {
              setspeed(score / 3);
            }
            //to set levels of game
            if (score % 10 === 0) {
              setlevel(score / 10);
            }
  
            //hundrance part of game
            if (blocker === 0) {
            } else setblocker(blocker - 1);
          } else {
            //counting wrong number of words and set speed zero
            setspeed(0);
            var message = new SpeechSynthesisUtterance();
            message.text = "Wrong one";
            window.speechSynthesis.speak(message);
            setwrong(wrong + 1);
          }
  
     
        } else {
          try {
            var s = document.getElementById(`${evt.key.toUpperCase()}`);
            s.setAttribute("style", "background:rgb(251 211 72)");
            setState(state + evt.key);
          } catch (error) {
            alert("Please type only aphacharacter and enter...");
          }
        }
      };
      document.onkeyup = function (evt) {
        evt = evt || window.event;
        if (evt.code === "Enter") {
          // alert(state.toUpperCase())
        } else {
          try {
            var s = document.getElementById(`${evt.key.toUpperCase()}`);
            s.removeAttribute("style", "background:rgb(251 211 72)");
          } catch (error) {
            alert("Please type only aphacharacter and enter...");
          }
        }
      };
    
   
  }, [state]);

  const getTimer = (time) => {
    settimer(time.toString());
  };
  const Submit=()=>{
    const body={
      "username": name,
      "curr_level": level,
      "curr_score": score
    }

      axios.post('https://wrod-race-playerdata-api.vercel.app/pushdata',body)
      .then((response) =>{
        console.log(response);
        
      })
      .catch((error) =>{
        console.log(error)
      })
     
 
     
  }
  return (
    <>

    

    {
      !gameover ?
    <>
      <Header Name={name} />
      <Counter counter={counter} getTimer={getTimer} />
      <div className="body" style={{ marginTop: -75 }}>
        <div className="keyboard">
          <Labels
            level={level}
            speed={speed}
            score={score}
          />
          <div className="stackArea">
            {!gameover ? (
              arr !== [] &&
              arr.map(
                (index, i) =>
                  i <= blocker && (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <h3
                        style={{
                          border: "3px solid black",
                          padding: 8,
                          fontWeight: "200",
                        }}
                      >
                        {index}
                      </h3>
                    </div>
                  )
              )
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* --------- Game Over -------- {wrong} wrong words. --------- */}
              </div>
            )}

       
          </div>

          <div className="keyboard__row">
            <div className="key--letter" id="Q">
              Q
            </div>
            <div className="key--letter" id="W">
              W
            </div>
            <div className="key--letter" id="E">
              E
            </div>
            <div className="key--letter" id="R">
              R
            </div>
            <div className="key--letter" id="T">
              T
            </div>
            <div className="key--letter" id="Y">
              Y
            </div>
            <div className="key--letter" id="U">
              U
            </div>
            <div className="key--letter" id="I">
              I
            </div>
            <div className="key--letter" id="O">
              O
            </div>
            <div className="key--letter" id="P">
              P
            </div>
          </div>
          <div className="keyboard__row" style={{ marginLeft: "4%" }}>
            <div className="key--letter" id="A">
              A
            </div>
            <div className="key--letter" id="S">
              S
            </div>
            <div className="key--letter" id="D">
              D
            </div>
            <div className="key--letter" id="F">
              F
            </div>
            <div className="key--letter" id="G">
              G
            </div>
            <div className="key--letter" id="H">
              H
            </div>
            <div className="key--letter" id="J">
              J
            </div>
            <div className="key--letter" id="K">
              K
            </div>
            <div className="key--letter" id="L">
              L
            </div>
          </div>
          <div className="keyboard__row" style={{ marginLeft: "10%" }}>
            <div className="key--letter" id="Z">
              Z
            </div>
            <div className="key--letter" id="X">
              X
            </div>
            <div className="key--letter" id="C">
              C
            </div>
            <div className="key--letter" id="V">
              V
            </div>
            <div className="key--letter" id="B">
              B
            </div>
            <div className="key--letter" id="N">
              N
            </div>
            <div className="key--letter" id="M">
              M
            </div>
          </div>
        </div>
      </div>
    </>
    :<>
    <h1>GAME OVER</h1>

    <div className="outer">
     
        <div>
           <div className="innerDiv" >
               <h2> Racer Name</h2>
               <h3>{name}</h3>
           </div>
           <div className="innerDiv" >
               <h2> Total Score</h2>
               <h3>{score*2}</h3>
           </div>
           <div className="innerDiv" >
               <h2> Level</h2>
               <h3>{level}</h3>
           </div>
           <div className="innerDiv">
               <h2> Correct Word</h2>
               <h3>{score}</h3>
           </div>
           <div className="innerDiv" >
               <h2> Wrong Word</h2>
               <h3>{wrong}</h3>
           </div>
          
          </div>         
          <div style={{display: 'flex',justifyContent: 'space-around',marginTop:10}}>
      <img onClick={()=>{window.location.reload()}} src="data:image/png;base64,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"
      alt="replay" style={{width:60,height:'auto',cursor:"pointer"}}/>
      <Link to="">
           <img onClick={Submit} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKqFH-dwRqAXtZhlxRubrD1q7eHkif3KhSMA&usqp=CAU"
      alt="close" style={{width:60,height:'auto',cursor:"pointer"}}/>
     </Link>
    </div>
    </div>
   
   
    </>

}
</>
  );
}

export default Keyborad;
