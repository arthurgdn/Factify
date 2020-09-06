import React,{useState, useEffect} from 'react'
import {connect} from 'react-redux'
import { startLogin} from '../actions/auth'
import { Redirect } from 'react-router-dom'
import {FaRegUserCircle} from 'react-icons/fa'
import {RiLockPasswordLine} from 'react-icons/ri'
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
            <div className="login__fieldset" >
              <form className="login__form" onSubmit={onSubmit}>
                <div className="login__item">
                  <FaRegUserCircle/>
                  <input
                    className="login__input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    focus="true"
                  />
                </div>
                
                <div className="login__item">
                  <RiLockPasswordLine/>
                  <input
                    
                    type="password"
                    className="login__input"
                    placeholder="Mot de passe"
                    required
                    
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    minLength="6"
                  />
                </div>
                
              
                <input type="submit" className="login__button"  value="Connexion" />
              </form>
            <div className="login__footer">
              {error && (<p className="login__form__error">{error}</p>)}
            </div>  
          </div>    
        </div>)
}

const mapStateToProps = (state)=>({
    isAuthenticated: state.auth.isAuthenticated,
    loginError: state.auth.loginError
})
const mapDispatchToProps = (dispatch)=>({
    startLogin:(email,password)=>dispatch(startLogin(email,password))
})
export default connect(mapStateToProps,mapDispatchToProps)(LoginForm)