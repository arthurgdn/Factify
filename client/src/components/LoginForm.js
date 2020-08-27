import React,{useState, useEffect} from 'react'
import {connect} from 'react-redux'
import { startLogin} from '../actions/auth'
import { Redirect } from 'react-router-dom'
const LoginForm = ({isAuthenticated,loginError,startLogin})=>{
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [error,setError]=useState('')

    const onSubmit = async (e)=>{
        e.preventDefault()
        startLogin(email,password)
    }
    if(isAuthenticated){
        <Redirect to="/home"/>
    }
    useEffect(()=>{setError(loginError)},[loginError])
    return (
        <div>
            <h1>Se connecter</h1>
            <form onSubmit={onSubmit}>
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
                <button>Connexion</button>
            </form>
            {error&&(<p>{error}</p>)}
        </div>
        )
}

const mapStateToProps = (state)=>({
    isAuthenticated: state.auth.isAuthenticated,
    loginError: state.auth.loginError
})
const mapDispatchToProps = (dispatch)=>({
    startLogin:(email,password)=>dispatch(startLogin(email,password))
})
export default connect(mapStateToProps,mapDispatchToProps)(LoginForm)