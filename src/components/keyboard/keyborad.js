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
    alert("Your Name and Score has been successfully saved to our database.");
        
      })
      .catch((error) =>{

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
               <h3>{score*2+level*5}</h3>
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
            <Link to="/">
      <img onClick={()=>{window.location.reload()}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKqFH-dwRqAXtZhlxRubrD1q7eHkif3KhSMA&usqp=CAU"
      alt="replay" style={{width:60,height:'auto',cursor:"pointer"}}/>
      </Link>
      <Link to="/">
           <img onClick={Submit} src="data:image/jpeg;base64,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 "
      alt="close" style={{width:100,height:'auto',cursor:"pointer",marginTop:4}}/>
     </Link>
    </div>
    </div>

   
    </>

}
</>
  );
}

export default Keyborad;
