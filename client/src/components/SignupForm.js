import React,{useState, useEffect} from 'react'
import {connect} from 'react-redux'
import { startRegister } from '../actions/auth'
import { Redirect } from 'react-router-dom'
const SignupForm = (isAuthenticated,registerError,startRegister,history)=>{
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
    const onSubmit = async (e)=>{
        e.preventDefault()
        if(password!==confirmPassword){
            setError('Les deux mots de passe doivent correspondre')
        }else{
            startRegister({email,password,firstName,lastName})
        }
    }
    if(isAuthenticated){
        <Redirect to="/home"/>
    }
    return (
        <div>
            <h1>S'inscire</h1>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e)=>setFirstName(e.target.value)}
                    placeholder="Prénom"
                />
                <input
                    type="text"
                    value={lastName}
                    onChange={(e)=>setLastName(e.target.value)}
                    placeholder="Nom"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder="Mot de passe"
                />
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    placeholder="Confirmer mot de passe"
                />
                <button>Inscription</button>
            </form>
            
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