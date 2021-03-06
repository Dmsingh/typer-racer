import React, { useState,useEffect}from 'react'
import './home.css'
import {Link} from 'react-router-dom';
import axios from 'axios'
function Home() {
    const [name, setname] = useState("")
    const[top,settop]=useState("")
 useEffect(() => {
     const list=async()=>{
         await axios.get(`https://wrod-race-playerdata-api.vercel.app/gettopten`)
              .then(response => {

                  settop(response.data)
              })
              .catch(err => {
           
              })
     }
     return list()
 },[])
    return (
       <div style={{margin:0, width:'100vw',height:'100vh', backgroundRepeat:'no-repeat', background: `url(https://media.idownloadblog.com/wp-content/uploads/2019/12/Keyboard-Virtuoso-Mac.jpg)`}}>
           <div style={{backgroundImage: `linear-gradient(to top, #a3bded 0%, #6991c7 100%)`,opacity:0.7,width:'100%',zIndex:1,position:'absolute',top:'0%',left:'0%',display:'flex',justifyContent:'space-evenly'}}>

               <div style={{width:'20%',height:'100vh',backgroundColor:'black',opacity:0.7,position:'relative',}}>
                       <h2 className="h2">Instruction</h2>
                       <p style={{color:'white',marginTop:'80%',fontSize:22}}>Racer, you have alloted 2 sec. Hit enter to submit your answer. If space is full with 4 words, racer game will be over.Best of luck!!!</p>

               </div>
                 <div style={{width:'50%',height:'100vh'}}>
                    
                    <input type="text" onChange={(e)=>{setname(e.target.value)}} className="input-text" placeholder="Enter your name"/>
                    <br/>
                    <Link to={`/typeracer/racername/${name}`}>
                    <input className="input-btn"  type="button" value="Submit"/>     
                    </Link>
                    <h1 className="h1">Louis Type Racer 🚗 Game</h1>
                 </div>
                 
               <div style={{width:'30%',height:'100vh',backgroundImage: `linear-gradient(to top, #c71d6f 0%, #d09693 100%)`,opacity:0.9,position:'relative',}}>
               
               <h2 className="h2l">Leader Board</h2>
               {/* number of games */}
{/* played, average score, max level reached, */}



<div style={{marginTop:'15%',marginLeft:'2%',mariginRight:'6%'}}> 
<div  style={{display: 'flex',justifyContent: 'space-between',marginTop:-4}}>
        <h3 style={{marginLeft:4}}> Racer Name</h3>
        <h3 style={{marginLeft:4}}> Number of Games </h3>
        <h3 style={{marginLeft:4}}> Average Score</h3>
        
        <h3 style={{marginLeft:4}}>Max Level</h3>
        </div>
{
       
     top && top.map((racer,i)=>(
          
        <div key={i} style={{display: 'flex',justifyContent: 'space-between',marginTop:-4}}>
        <h3 style={{marginLeft:4,width:110}}> {racer.username}</h3>
        <h3 > {racer.no_of_games_played}</h3>
        <h3 > {Math.round(racer.score_sum/racer.no_of_games_played)}</h3>
        
        <h3 style={{position:'relative',left:-16}}>{racer.max_level_reached}</h3>
        </div>
     ))
     
      }   </div>


               </div>
              
           </div>
          
          
        </div>
    )
}


export default Home
