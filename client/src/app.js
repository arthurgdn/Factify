import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import 'normalize.css/normalize.css'
import './styles/styles.scss'

import AppRouter, {history} from './routers/AppRouter'
import configureStore from './store/configureStore'
import HomePage from './components/HomePage'



const store = configureStore()


ReactDOM.render(<HomePage/>,document.getElementById('app'))



