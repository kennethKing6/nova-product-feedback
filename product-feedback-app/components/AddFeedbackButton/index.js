import React from 'react'

export default function Index({onClick,style,}) {

    return (
        <button onClick={onClick} type="button" className=" btn btn-primary btn-lg  ms-2 me-5 align-self-end" 
        style={{ width: '100%', height: '3rem', fontSize: '1rem', maxWidth: '10rem', backgroundColor: '#AD1FEA', borderStyle: 'none' }}>Add Feedback</button>

    )
}
