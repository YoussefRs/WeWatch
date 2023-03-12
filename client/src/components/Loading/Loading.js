import React from 'react'
import loading from './Loading.gif'
import './Loading.css'
function Loading() {
  return (
    <div >
        <div className='ct'>
          <img src={loading} alt=''/>
          <h1>wating for host approval ..</h1>
        </div>

    </div>
  )
}

export default Loading
