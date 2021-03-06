import React from 'react'
import {connect } from 'react-redux'
import {Route,Redirect} from 'react-router-dom'
import ErrorBoundary from '../components/ErrorBoundary'
import Header from '../components/Header'


export const PrivateRoute = ({isAuthenticated,component:Component,...rest})=>(
    <Route {...rest} component={(props)=>(
        isAuthenticated ? (
            <div>
                <ErrorBoundary>
                    <Header/>
                    <Component {...props} />
                </ErrorBoundary>    
            </div>
            
        ):(
            <Redirect to="/"/>
        )
    )}/>
)
const mapStateToProps = (state)=>({
    isAuthenticated : !!state.auth.isAuthenticated

})
export default connect(mapStateToProps)(PrivateRoute)