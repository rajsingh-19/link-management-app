import React from 'react'

const Progress_bar = ({ bgcolor, progress, height }) => {

    const Parentdiv = {
        height: height,
        width: '200px',
        backgroundColor: 'whitesmoke',
    }

    const Childdiv = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: bgcolor,
        textAlign: 'right'
    }

    return (
        <div style={Parentdiv}>
            <div style={Childdiv}></div>
        </div>
    )
}

export default Progress_bar;