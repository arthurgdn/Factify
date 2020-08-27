import React,{useLayoutEffect} from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import axios from 'axios'
import 'normalize.css/normalize.css'
import './styles/styles.scss'

import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore'
import LoadingPage from './components/LoadingPage'
import {login, startLoadUser} from './actions/auth'



const store = configureStore()




const renderApp = ()=>{
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.baseURL = process.env.DEV_URL
        
        if (localStorage.getItem('factify_token')) {
            
            const token = localStorage.getItem('factify_token')
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
            store.dispatch(login(token))
            store.dispatch(startLoadUser())
          } else {
           
                delete axios.defaults.headers.common['Authorization'];
            
          }
          console.log('rendering')
          ReactDOM.render((
            <Provider store={store}>
                <AppRouter/>
            </Provider>
            
        ),document.getElementById('app'))

        
}


const App = ()=>{
    console.log('firstRendering')
    useLayoutEffect(renderApp,[])
     return (<LoadingPage/>)

 }

ReactDOM.render(<App/>,document.getElementById('app'))




