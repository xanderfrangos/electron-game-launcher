import React, {Component} from 'react'
import {render} from 'react-dom'
import {} from './styles/global.css'
import Logo from './components/Logo.jsx'
import Link from './components/Link.jsx'

require('./js/jquery.js')
require('./js/gamepads.js')
require('./js/app.js')

const logos = [
    require('./assets/electron.png'),
    require('./assets/react.png'),
    require('./assets/webpack.png')
]


export default class App extends Component {
    render() {
        const logosRender = logos.map( (logo, index) => {
            return <Logo key = {index} src = { logo } />
        })

        return (
            <main>
                <div id="sidebar">
                    <div class="view">
                    </div>
                </div>
                <div id="main">
                    <div class="view">
                        <div class="logo-top"><img src="./images/logo-white.png" /></div>    
                        <div class="game-list"></div>
                    </div>
                </div>
            </main>
        )
    }
}
