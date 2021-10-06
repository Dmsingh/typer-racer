import React from 'react'
import './labels.css'
function labels({level,speed,score}) {
    return (
        <div className="mainDiv">
            <div className="oval" style={{display: 'flex', flexDirection: 'col',justifyContent: 'center'}}>
              <h2  style={{position: 'relative',top:-23 ,left:21}} >
                {level}
              </h2>
              <p style={{position: 'relative',top:33 ,left:-8,fontWeight: 100,fontSize:'large'}}>LEVEL</p>
            </div>
            <div className="trapezoid" style={{display: 'flex', flexDirection: 'col',justifyContent: 'center'}}>
            <h2  style={{position: 'relative',top:-17 ,left:32}} >
                {score}
              </h2>
              <p style={{position: 'relative',top:46 ,left:-20,fontWeight: 100,fontSize:'large'}}>SCORE</p>
             
            </div>
            <div className="diamond" >
                <h2 style={{zIndex: 1,position: 'absolute',top:20}} >
                {speed}x
                </h2>
</div>
            
        </div>
    )
}

export default labels
