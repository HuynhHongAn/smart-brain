import React from "react";

import "./FaceRecognition.css";

const FaceRecognition = ({imageURL, box}) => {
    return (
        <div className='center ma'>
            <div className={'absolute mt2'} style={{left: "auto", right: "auto"}}>
                <img id={'inputImage'} src={imageURL} alt={'Face'} width={'500px'} height={'auto'}/>
                <div className={'bounding-box'} style={{top: box.topRow, left: box.leftCol, right: box.rightCol, bottom: box.bottomRow}}></div>
            </div>
        </div>
    )
}

export default FaceRecognition