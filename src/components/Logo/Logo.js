import React from "react";
import Tilt from "react-tilt"

import brain from "./brain.png"
import "./Logo.css"

const Logo = () => {
    return (
        <div className='ma4 mt4'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 250, width: 250 }} >
                <div className="Tilt-inner"> <img src={brain} alt='logo' style={{width: "100px", paddingTop:"75px"}}/></div>
            </Tilt>
        </div>
    )
}

export default Logo