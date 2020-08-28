import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'

const FeedComponent =  ({user})=>{
    useEffect(()=>{
        console.log('loading component')
    },[])
    return (
        <div> 
            <p>Logged in!</p>
            <Link to="/publier">Publier</Link>
            <Link to={"/profil/"+user._id}>{user.firstName} {user.lastName}</Link>
        </div>
    
        )
}

const mapStateToProps = (state)=>({
    user:state.user
})

export default connect(mapStateToProps)(FeedComponent)