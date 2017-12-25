import React, {Component} from 'react'
import {render} from 'react-dom'
import {} from './styles/global.css'
import Logo from './components/Logo.jsx'
import Link from './components/Link.jsx'
import GamesGrid from './components/GamesGrid.jsx'
import UILayer from './ui/Layer.jsx'
import UIList from './ui/List.jsx'
import UIItem from './ui/Item.jsx'
import UINavigation from './ui/Navigation.jsx'

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

    constructor(props) {
    super(props);
    
    global.UI = new UINavigation();


    // Build Items
    let items = [];

    sortedApps.forEach(function(element) {
        let newItem = new UIItem(null);
        newItem.meta = element;
        items.push(newItem);
    }, this);

    // Build List w/ Items
    let lists = [new UIList(items, "All Games", 3)];

    // Build Layer w/ List
    let layer = global.UI.NewCacheLayer(lists, "Layer Title");
    global.UI.NewLayer(layer);

    this.state = { "lists":lists };
  }

    render() {
        
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
                        <GamesGrid list={this.state.lists[0]} />
                        
                    </div>
                </div>
            </main>
        )
    }
}
