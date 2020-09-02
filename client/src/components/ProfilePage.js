import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { startLogout } from '../actions/auth'
import {startSetProfile} from '../actions/profile'

import ImageUploader from 'react-images-upload'
import axios from 'axios'

const ProfilePage = ({match,startSetProfile,startLogout,profile,user})=>{
    const [stateProfile,setStateProfile]=useState({})
    const [displayImageForm,setDisplayImageForm]=useState(false)
    const [profilePicture,setProfilePicture]=useState('')
    const [error,setError]=useState()

    const savePicture = async ()=>{
        if(profilePicture!=='') {
            const imageBody = new FormData()
            
            imageBody.append('avatar',profilePicture)
            
            await axios.post('/users/me/avatar',imageBody)
        }
    }
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
                    <h3>{stateProfile.firstName} {stateProfile.lastName}</h3>
                    
                    <img className="header__picture" src={process.env.DEV_URL+"/users/"+stateProfile._id+"/avatar"}/>
                    {stateProfile._id === user._id && (
                        <div>
                            <button onClick={()=>{startLogout()}}>Se déconnecter</button>
                            <button onClick={()=>setDisplayImageForm(!displayImageForm)}>Changer d'image</button>
                            {displayImageForm && (
                                <div>
                                    <h3>Modifier la photo de profil</h3>
                                    <ImageUploader
                                        fileContainerStyle={
                                            {background: '#fafafa',
                                            boxShadow:'none'
                                        }
                                        }
                                        label={'Taille maximale : 5mb'}
                                        withIcon={false}
                                        buttonText="Choisir une image"
                                        onChange={(file)=>setProfilePicture(file[0])}
                                        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                                        maxFileSize={5242880}
                                        withPreview={true}
                                        singleImage={true}
                                    />
                                    <button onClick={savePicture}>Enregistrer</button>
                                </div>
                            )}    
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