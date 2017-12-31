import React, {Component} from 'react'
import {render} from 'react-dom'
import GamesGrid from './components/GamesGrid.jsx'
import UILayer from './ui/Layer.jsx'
import UIList from './ui/List.jsx'
import UIItem from './ui/Item.jsx'
import UINavigation from './ui/Navigation.jsx'
import UIInput from './ui/Input.jsx'

let fs = require('fs');

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
    global.Input = new UIInput();

    // Build Items
    let items = [];
    let items2 = [];


    

    sortedApps.forEach(function(element) {
        let newItem = new UIItem( global.Input.runGame );
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
            <main>
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
