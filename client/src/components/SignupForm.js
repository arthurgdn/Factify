import React,{useState, useEffect} from 'react'
import {connect} from 'react-redux'
import { startRegister } from '../actions/auth'
import { Redirect } from 'react-router-dom'
const SignupForm = ({isAuthenticated,registerError,startRegister,history})=>{
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [firstName,setFirstName]=useState('')
    const [lastName,setLastName]=useState('')
    const [error,setError]=useState('')

    useEffect(()=>{
        setError(registerError)
        console.log(registerError)
    },[registerError])
    const onSubmit = async  (e)=>{
        e.preventDefault()
        if(password!==confirmPassword){
            setError('Les deux mots de passe doivent correspondre')
        }else{
            const formData = {email,password,firstName,lastName}
            startRegister(formData)
        }
    }
    if(isAuthenticated){
        <Redirect to="/home"/>
    }
    return (
        <div className="showcase__signup">
            <div className="signup__container">
                <h1 className='signup__text'>Créer un compte</h1>
            <form className="signup__form" onSubmit={onSubmit}>
            <div className='signup__form-group'>
                <input
                    type="text"
                    className="signup__input"
                    value={firstName}
                    onChange={(e)=>setFirstName(e.target.value)}
                    placeholder="Prénom"
                />
            </div>
            <div className='signup__form-group'>
                <input
                    type="text"
                    value={lastName}
                    className="signup__input"
                    onChange={(e)=>setLastName(e.target.value)}
                    placeholder="Nom"
                />
            </div>
            <div className='signup__form-group'>
                <input
                    type="email"
                    className="signup__input"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder="Email"
                />
            </div>
            <div className='signup__form-group'>
                <input
                    type="password"
                    className="signup__input"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder="Mot de passe"
                />
            </div>
            <div className='signup__form-group'>
                <input
                    type="password"
                    className="signup__input"
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    placeholder="Confirmer mot de passe"
                />
            </div>
                
                
                
                
                
            {error && (<p>{error}</p>)}
            <div className="signup__form-group">
              <input type='submit' className="signup__button"  value="Inscription" />
            </div>
            </form>
            
        </div>
        </div>
        )
}

const mapStateToProps = (state)=>({
    isAuthenticated:state.auth.isAuthenticated,
    registerError:state.auth.registerError
})
const mapDispatchToProps = (dispatch)=>({
    startRegister : (formData)=> dispatch(startRegister(formData))
})
export default connect(mapStateToProps,mapDispatchToProps)(SignupForm)