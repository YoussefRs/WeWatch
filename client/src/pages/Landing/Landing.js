import React, { useEffect } from 'react'
import './Landing.css'
import { animateTitle, animateBoxes } from './Tweencfg'
import { useHistory } from 'react-router-dom'
import popcorn from "./popcorn.png"

function Landing() {
    const history = useHistory();
 
    useEffect(() => {
        animateTitle();
        animateBoxes();
    },[])
  return (
    <div className="wrapper">
            <div className="hero-section"> 
                  <div className="hero-gif"></div>
                  <div className="register"><a href="register">Register</a></div>
                  <div className="popcorn"><img  src={popcorn} alt="pc"/></div>
                  <div className="hero-title">
                        <h1 className="glitch" data-text="Underrated">we watch</h1>
                        <p>Host <span>Youtube</span> Watch Party with Friends</p>
                        <div className="btn" onClick={() => history.push('/login')}>
                              get started
                        </div>
                  </div>
            </div>
            <div className="gif-overlay"></div>
            <div className="features">
                  <p className="fa fa-tv" id="box-1">Host Video in a room</p>
                  <p className="fa fa-sync" id="box-2" >Sync video with each other</p>
                  <p className="far fa-comments" id="box-3">Live chat with friends</p>
            </div>
      </div>
  )
}

export default Landing
