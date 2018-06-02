import React, {Component} from 'react'
import GamesGrid from './components/GamesGrid.jsx'
import SidebarMainItem from './components/SidebarMainItem.jsx'
//import HomePage from './pages/Home.jsx'
import GameListPage from './pages/GameList.jsx'
import UILayer from './ui/Layer.jsx'
import UIList from './ui/List.jsx'
import UIItem from './ui/Item.jsx'
import UINavigation from './ui/Navigation.jsx'
import UIInput from './ui/Input.jsx'
import UISounds from './ui/Sounds.jsx'

let fs = require('fs');
/*
let db = JSON.parse(fs.readFileSync(appDataPath + 'games.steam.json', 'utf8'));

let sortedApps = db.sort(function(a, b) {
    var textA = a.name.toLowerCase();
    var textB = b.name.toLowerCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
});
*/

export default class App extends Component {

    constructor(props) {
    super(props);
    



    //global.Sounds.Startup.play();


    global.AppJS = this;
    this.nada = false;


        // Sidebar
        let sbFavorites = new UIItem();
        






    this.state = { "UILayer":this.props.UILayer };
        console.log("UILayer", this.props)














  }

    forceRefresh() {
        this.nada = true;
        this.forceUpdate();
        this.nada = false;
        this.forceUpdate();
    }

  
    renderSidebarItem(item, itemCount) {
        let itemInfo = item 
        console.log("renderSidebarItem", item)
        return (
                <SidebarMainItem title={item.meta.Title} active={item.Active} count={item.meta.Lists.length} item={item}></SidebarMainItem>
        )
    } 

    render() {

        if(this.nada)
            return null

        global.UI.MainView = this.refs.MainView;
        
        return (
            <main>
                <div id="overlay">
                
                </div>
                <div id="base">
                
                    <div id="sidebar">
                        <div className="sidebarInner">
                            <div className="view">
                                <div className="row">
                                    <div className="item logo">DEN</div>
                                    <div className="item time">8:21</div>
                                </div> 

                                { this.props.Sidebar.map(this.renderSidebarItem) }
                                
                                <div className="row bottom">
                                    <div className="item">
                                        <img src="images/icons/add.svg" />
                                    </div>
                                    <div className="item">
                                        <img src="images/icons/fullscreen.svg" />
                                    </div>
                                    <div className="item">
                                        <img src="images/icons/settings.svg" />
                                    </div>
                                    <div className="item">
                                        <img src="images/icons/power.svg" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="main" ref="MainView">
                    <GameListPage UILayer={this.state.UILayer} />
                    </div>
                
                </div>
                
                
            </main>
        )
    }


    componentDidMount() {
        global.Sounds.UIReady.play()
    }


}


// 

/*


                                <div className="row active">
                                    <div className="item">
                                        <div className="title"><span>Favorites</span></div>
                                        <div className="count"><span>5</span></div>
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


*/