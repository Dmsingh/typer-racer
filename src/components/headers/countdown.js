import React,{useState,useEffect} from 'react'
import './count.css'

const SVGCircle = ({ radius }) => (
    <svg className='countdown-svg'>
        <path fill="none" stroke="#333" stroke-width="4" d={describeArc(50, 50, 48, 0, radius)}/>
    </svg>
);
function Countdown({counter,getTimer}) {
  
const[state,setState]=useState({
    seconds:counter,
    
})


    const secondsRadius = mapNumber(state.seconds, 60, 0, 0, 360);

// useEffect(() =>{

//     const sub=()=>{
//         if(state.seconds===0) {
//             setState({seconds:counter})
//         }
//     }
//    sub()
// },)   
useEffect(() => {
const interval=  setInterval(() => {
     
        if(state.seconds>0){
            getTimer(state.seconds)
            
      
            const countdown = state.seconds-1;
            
            const seconds = countdown;
             
            setState({ seconds: seconds});
          
        }
        if(state.seconds===0) {
           setState({seconds:counter})
            getTimer(state.seconds)
            
        }
    
        
    }, 1000);
    return () => {
        clearInterval(interval); //This is important
    
    }
},[state.seconds])
return (
    <div>
   {
       counter===0 ? "" :
   
        <div className='countdown-wrapper' style={{height:144}}>
    
            {state.seconds && (
                <div className='countdown-item'>
                    <SVGCircle radius={secondsRadius} />
                    {state.seconds} 
                    <span>seconds</span>
                </div>
            )}
   
        </div>
}
    </div>
)
}

export default Countdown







// From stackoverflow: https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x, y, radius, startAngle, endAngle){

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;       
}

// Stackoverflow: https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
function mapNumber(number, in_min, in_max, out_min, out_max) {
  return (number - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}