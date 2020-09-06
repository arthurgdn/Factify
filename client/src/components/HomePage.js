import React from 'react'
import  {Link} from 'react-router-dom'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import Promotion from './Promotion'
export default ()=>(
    <div>
        <header className="showcase__header">
            <div className="showcase__header-content"> 
                <Link className="header__title" to='/'>
                    <h1>Factify</h1>
                </Link>
                <div className="header__profile">
                    <LoginForm/>
                </div>
            </div> 
        </header>
        <div className="showcase__main-area">
                <Promotion/>
                <SignupForm/>
            </div>
    </div>
)