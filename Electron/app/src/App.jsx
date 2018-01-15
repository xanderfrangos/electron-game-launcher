import React, {Component} from 'react'
import GamesGrid from './components/GamesGrid.jsx'
import HomePage from './pages/Home.jsx'
import UILayer from './ui/Layer.jsx'
import UIList from './ui/List.jsx'
import UIItem from './ui/Item.jsx'
import UINavigation from './ui/Navigation.jsx'
import UIInput from './ui/Input.jsx'
import UISounds from './ui/Sounds.jsx'

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
    

    // Don't change these. They reference each other.
    global.UI = new UINavigation();
    global.Input = new UIInput();
    global.Sounds = new UISounds();

    global.Sounds.Startup.play();


    global.AppJS = this;


  }



  


    render() {

        global.UI.MainView = this.refs.MainView;
        
        return (
            <main>
                
                <div id="sidebar">
                    <div className="view">
                        <div className="row">
                            <div className="logo"><img src="./images/logo-white.png" /></div>
                            <div className="time">7:09 PM</div>
                        </div> 
                        <div className="row active">
                            <div className="item">
                                <div className="title">Favorites</div>
                                <div className="count">5</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="item">
                                <div className="title">Recent Games</div>
                                <div className="count">3</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="item">
                                <div className="title">All Games</div>
                                <div className="count">107</div>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="item">
                                <div className="title">Co-op</div>
                                <div className="count">10</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="item">
                                <div className="title">Racing</div>
                                <div className="count">7</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="item">
                                <div className="title">Shooter</div>
                                <div className="count">22</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="item">
                                <div className="title">Haven't Started</div>
                                <div className="count">32</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="item">
                                <div className="title">Need to finish</div>
                                <div className="count">64</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="main" ref="MainView">
                    <HomePage />
                </div>
            </main>
        )
    }


    componentDidMount() {
        global.Sounds.UIReady.play()
    }


}
