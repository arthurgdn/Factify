import React, { useEffect } from 'react'

export default ()=>{
    useEffect(()=>{
        console.log('loading component')
    },[])
    return (
    <p>Logged in!</p>
)
    }