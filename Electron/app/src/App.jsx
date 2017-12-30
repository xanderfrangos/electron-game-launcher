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
import UIGamepad from './ui/Gamepad.jsx'

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


const HandleKeyDown = (e) => {
    e.persist();
    console.log(e.key);
    if (e.key == "ArrowUp") {
        global.UI.MoveFocus("up");
        e.preventDefault();
      } else if (e.key == "ArrowDown") {
        global.UI.MoveFocus("down");
        e.preventDefault();
      } else if (e.key == "ArrowLeft") {
        global.UI.MoveFocus("left");
        e.preventDefault();
      } else if (e.key == "ArrowRight") {
        global.UI.MoveFocus("right");
        e.preventDefault();
      }
      
}

const runGame = (game) => {
    console.log(game);
    const { exec } = require('child_process');
    let tst = exec('start steam://rungameid/' + game.meta.id);
    console.log(tst);
    //window.open("steam://rungameid/" + game.meta.id, 'sharer', 'toolbar=0,status=0,width=548,height=325');
}


export default class App extends Component {

    constructor(props) {
    super(props);
    
    global.Gamepad = new UIGamepad();

    global.UI = new UINavigation();

    // Build Items
    let items = [];
    let items2 = [];


    

    sortedApps.forEach(function(element) {
        let newItem = new UIItem( runGame );
        newItem.meta = element;
        items.push(newItem);
    }, this);

    sortedApps.forEach(function(element) {
        let newItem = new UIItem(null);
        newItem.meta = element;
        items2.push(newItem);
    }, this);

    // Build List w/ Items
    let lists = [new UIList(items, "All Games 1", 3), new UIList(items2, "All Games 2", 3)];

    // Build Layer w/ List
    let layer = global.UI.NewCacheLayer(lists, "Layer Title");
    global.UI.NewLayer(layer);

    this.state = { "lists":lists };

    global.AppJS = this;


  }



  


    render() {

        global.UI.MainView = this.refs.MainView;
        
        return (
            <main onKeyDown={ HandleKeyDown } tabIndex="0">
                <div id="background"></div>
                <div id="sidebar">
                    <div className="view">
                    </div>
                </div>
                <div id="main" ref="MainView">
                    <div className="view">
                        <div className="logo-top"><img src="./images/logo-white.png" /></div>    
                        <GamesGrid list={this.state.lists[0]} />
                        <GamesGrid list={this.state.lists[1]} />
                    </div>
                </div>
            </main>
        )
    }
}
