import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { startLogout } from '../actions/auth'
import {startSetProfile} from '../actions/profile'

import ImageUploader from 'react-images-upload'
import axios from 'axios'
import PostsList from './PostsList'
import { startUpvote, startDownvote } from '../actions/popularFeed'

const ProfilePage = ({match,startSetProfile,startLogout,profile,user,history,startDownvote,startUpvote})=>{
    const [stateProfile,setStateProfile]=useState({})
    const [displayImageForm,setDisplayImageForm]=useState(false)
    const [profilePicture,setProfilePicture]=useState('')
    const [error,setError]=useState()

    const savePicture = async ()=>{
        if(profilePicture!=='') {
            const imageBody = new FormData()
            
            imageBody.append('avatar',profilePicture)
            
            await axios.post('/users/me/avatar',imageBody)
            history.push('/profil/'+user._id)
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
        console.log(profile,'profil')
    },[startSetProfile,profile])


    return (
        <div className="content-container">
            {(stateProfile._id && stateProfile._id ===match.params.id)&& (
                <div>
                    <div className="profile__title">
                        <h3 className="form__title">{stateProfile.firstName} {stateProfile.lastName}</h3>
                        <div>{stateProfile._id ===user._id && (<button className="form__button" onClick={()=>{startLogout()}}>Se déconnecter</button>)}</div>
                    </div>
                   <div className="profile__section-divider">
                        <img className="profile__picture" src={process.env.DEV_URL+"/users/"+stateProfile._id+"/avatar"}/>
                        <div className="profile__stats">
                            <p>Nombre de fun facts publiés : {stateProfile.userPosts.length}</p>
                            <p>Nombre de votes + reçus : {stateProfile.upvotesReceived}</p>
                            <p>Nombre de votes - reçus : {stateProfile.downvotesReceived}</p>
                            <p>Score moyen : {stateProfile.averageScore.toFixed(2)}</p>
                        </div>
                    </div>
                    
                    {stateProfile._id === user._id && (
                        <div>
                            
                            <button className="form__button profile__button" onClick={()=>setDisplayImageForm(!displayImageForm)}>Changer de photo</button>
                            {displayImageForm && (
                                <div className="profile__form-section">
                                    <h3 className="form__title">Modifier la photo de profil</h3>
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
                                    <button className="form__button" onClick={savePicture}>Enregistrer</button>
                                </div>
                            
                            )} </div> )} 
                            {stateProfile.userPosts.length>0 && (<h3 className="form__title">Fun facts publiés : </h3>)}
                            <PostsList displayVote={false} startUpvote={startUpvote} startDownvote={startDownvote} postsList={stateProfile.userPosts}/>  
                        
                    

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
    startLogout : ()=>dispatch(startLogout()),
    startUpvote : (id)=>dispatch(startUpvote(id)),
    startDownvote : (id)=>dispatch(startDownvote(id))
})

export default connect(mapStateToProps,mapDispatchToProps)(ProfilePage)