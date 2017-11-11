import React, {Component} from 'react'
import {render} from 'react-dom'
import {} from './styles/global.css'
import Logo from './components/Logo.jsx'
import Link from './components/Link.jsx'
import GamesGrid from './components/GamesGrid.jsx'

let fs = require('fs');

//require('./js/app.js')

const logos = [
    require('./assets/electron.png'),
    require('./assets/react.png'),
    require('./assets/webpack.png')
]

let db = JSON.parse(fs.readFileSync('./apps.json', 'utf8'));

let sortedApps = db.sort(function(a, b) {
    var textA = a.name.toLowerCase();
    var textB = b.name.toLowerCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
});

export default class App extends Component {
    render() {
        const logosRender = logos.map( (logo, index) => {
            return <Logo key = {index} src = { logo } />
        })
        
        
        
        return (
            <main>
                <div id="background"></div>
                <div id="sidebar">
                    <div className="view">
                    </div>
                </div>
                <div id="main">
                    <div className="view">
                        <div className="logo-top"><img src="./images/logo-white.png" /></div>    
                        <GamesGrid games={sortedApps} />
                        
                    </div>
                </div>
            </main>
        )
    }
}
