import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { startLogout } from '../actions/auth'
import {startSetProfile} from '../actions/profile'

const ProfilePage = ({match,startSetProfile,startLogout,profile,user})=>{
    const [stateProfile,setStateProfile]=useState({})
    const [error,setError]=useState()
    useEffect(()=>{
        if(!stateProfile._id || stateProfile._id !==match.params.id){
            console.log('settingProfile')
            startSetProfile(match.params.id)
        }
    },[])
    useEffect(()=>{
        setError(profile.setProfileError)
    },[profile.setProfileError])

    useEffect(()=>{
        setStateProfile(profile)
    },[startSetProfile,profile])

    return (
        <div>
            {(stateProfile._id && stateProfile._id ===match.params.id)&& (
                <div>
                    <h3>{profile.firstName} {profile.lastName}</h3>
                    {profile._id === user._id && (
                        <div>
                            <button onClick={()=>{startLogout()}}>Se déconnecter</button>
                            <button>Changer d'image</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

const mapStateToProps = (state)=>({
    profile: state.profile,
    user: state.user
})

const mapDispatchToProps = (dispatch)=>({
    startSetProfile: (id)=>dispatch(startSetProfile(id)),
    startLogout : ()=>dispatch(startLogout())
})

export default connect(mapStateToProps,mapDispatchToProps)(ProfilePage)