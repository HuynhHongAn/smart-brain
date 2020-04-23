import React from "react";

const FaceRecognition = ({imageURL}) => {
    return (
        <div className='center ma'>
            <div className={'mt2'}>
                <img src={imageURL} alt={'Face'} width={'500px'} height={'auto'}/>
            </div>
        </div>
    )
}

export default FaceRecognition