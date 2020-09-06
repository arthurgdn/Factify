import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


const Header = ({user }) => {
  return (
    <header className="header">
        <div className="header__content"> 
            <Link className="header__title" to='/home'>
                <h1>Factify</h1>
            </Link>
            <div className="header__profile">
                <Link className="header__user" to={'/profil/'+user._id}>
                    <img className="header__picture" src={process.env.DEV_URL+"/users/"+user._id+"/avatar"}/>
            
                    <h3 className="show-for-desktop">{user.firstName}  {user.lastName}</h3>
                </Link>
                
            </div>
            
        </div>
        <div className="header__subheader">
            
            <Link className="header__subheader-link" to="/home">Général</Link>
            <Link className="header__subheader-link" to="/tendances">Tendances</Link>
            <Link className="header__subheader-link" to="/publier">Publier</Link>
        </div>
          
    </header>
  )
};


const mapStateToProps = (state)=>({
    user : state.user
})

export default connect(mapStateToProps)(Header);