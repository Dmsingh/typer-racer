import React from 'react'

function header({Name}) {

    return (
        <div style={{display: 'flex', justifyContent: 'space-evenly',}} > 
         <h1>{Name}</h1>
         {/* <Board/> */}
        </div>
    )
}

export default header
