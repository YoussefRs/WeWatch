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
    <div class="wrapper">
            <div class="hero-section"> 
                  <div class="hero-gif"></div>
                  <div class="register"><a href="register">Register</a></div>
                  <div class="popcorn"><img  src={popcorn} alt="pc"/></div>
                  <div class="hero-title">
                        <h1 class="glitch" data-text="Underrated">we watch</h1>
                        <p>Host <span>Youtube</span> Watch Party with Friends</p>
                        <div class="btn" onClick={() => history.push('/login')}>
                              get started
                        </div>
                  </div>
            </div>
            <div class="gif-overlay"></div>
            <div class="features">
                  <p className="fa fa-tv" id="box-1">Host Video in a room</p>
                  <p className="fa fa-sync" id="box-2" >Sync video with each other</p>
                  <p className="far fa-comments" id="box-3">Live chat with friends</p>
            </div>
      </div>
  )
}

export default Landing
