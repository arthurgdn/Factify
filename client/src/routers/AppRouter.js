import React from 'react'

import HomePage from '../components/HomePage'
import FeedComponent from '../components/FeedComponent'
import {createBrowserHistory} from "history"
import NotFoundPage from '../components/NotFoundPage'
import {Router,Switch,Route} from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import NewFactForm from '../components/NewFactForm'
import ProfilePage from '../components/ProfilePage'
import PopularComponent from '../components/PopularComponent'
const history = createBrowserHistory()
const AppRouter = ()=>(
    <Router history={history}>
        <div>
            
            <Switch>
                <PublicRoute path='/' component={HomePage} exact={true}/>
                <PrivateRoute path="/home" component={FeedComponent} exact={true}/>
                <PrivateRoute path="/publier" component={NewFactForm} exact={true}/>
                <PrivateRoute path="/profil/:id" component={ProfilePage} exact={true}/>
                <PrivateRoute path="/tendances" component={PopularComponent} exact={true}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
        
        
    </Router>
)

export default AppRouter