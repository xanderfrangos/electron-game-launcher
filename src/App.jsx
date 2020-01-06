import React, { PureComponent } from 'react'
import GamesGrid from './components/GamesGrid.jsx'
//import HomePage from './pages/Home.jsx'
import GameListPage from './pages/GameList.jsx'
import UILayer from './ui/Layer.jsx'
import UIList from './ui/List.jsx'
import UIItem from './ui/Item.jsx'
import UINavigation from './ui/Navigation.jsx'
import UIInput from './ui/Input.jsx'
import UISounds from './ui/Sounds.jsx'
import DialogBox from './components/DialogBox.jsx'
import Item from './components/Item.jsx'


/*
let db = JSON.parse(fs.readFileSync(appDataPath + 'games.steam.json', 'utf8'));

let sortedApps = db.sort(function(a, b) {
    var textA = a.name.toLowerCase();
    var textB = b.name.toLowerCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
});
*/

export default class App extends PureComponent {

    constructor(props) {
        super(props);

        //global.Sounds.Startup.play();

        global.AppJS = this;
        this.nada = false;

        this.state = {
            "UILayer": this.props.UILayer,
            "showQuit": false
        };

    }



    forceRefresh() {
        this.nada = true;
        this.forceUpdate();
        this.nada = false;
        this.forceUpdate();
    }

    showQuit() {
        if (this.state.showQuit) {

            const quitBack = () => {global.UI.PreviousLayer(); this.setState({"showQuit":false})}

            let itemYes = new UIItem(() => {
                // Quit App
                //ipcRenderer.send('sidebarExit', 1);
            })
            let itemNo = new UIItem(quitBack)

            itemYes.meta.label = "Yes"
            itemNo.meta.label = "No"

            itemYes.BackAction = quitBack
            itemNo.BackAction = quitBack

            let quitLayer = new UILayer(new UIList([itemYes, itemNo], "Quit Den", 2), "Quit Den")
            global.UI.NewLayer(quitLayer.ID)

            return (<DialogBox layer={ quitLayer }
                      title="Close Den"
                      options={ quitLayer.Lists[0].Items }>
                      <p>Would you like to close Den?</p>
                      </DialogBox>)
        }
    }

    triggerLaunchScreen(game) {
        this.setState({"showLaunchGame":true, "launchGame": game})
    }

    showLaunchGame() {
        if (this.state.showLaunchGame) {

            const launchBack = () => {global.UI.PreviousLayer(); this.setState({"showLaunchGame":false})}

            let itemYes = new UIItem(() => {
                // Launch Game
                //const { exec } = require('child_process');
                const exec = () => {}
                //let launch = exec(path)
                let launch = exec('start steam://rungameid/' + this.state.launchGame.meta.id);

            })
            let itemNo = new UIItem(launchBack)

            itemYes.meta.label = "Yes"
            itemNo.meta.label = "No"

            let launchLayer = new UILayer(new UIList([itemYes, itemNo], "Launch Game", 2), "Launch Game")
            launchLayer.defaultBackAction = launchBack
            global.UI.NewLayer(launchLayer.ID)

            let coverSRC = window.appDataPath + 'cache/SteamGraphics/' + this.state.launchGame.meta.id + '/header.jpg?t=' + Date.now();

            return (<DialogBox layer={ launchLayer }
                      title={this.state.launchGame.meta.name}
                      options={ launchLayer.Lists[0].Items }
                      cover={ coverSRC }>
                      <p>Would you like to start {this.state.launchGame.meta.name}?</p>
                      </DialogBox>)
        }
    }



    render() {

        if (this.nada)
            return null

        global.UI.MainView = this.refs.MainView;

        return (
            <main>
              <div id="overlay">
                { this.showQuit() }
                { this.showLaunchGame() }
              </div>
              <div id="base">
                <div data-active={ this.props.Sidebar[0].Active } id="sidebar">
                  <div className="sidebarInner">
                    <div className="view">
                      <div className="row">
                        <div className="item logo">DEN</div>
                        <div id="clock" className="item time">
                          { window.global.getCurrentTime() }
                        </div>
                      </div>
                      { this.props.Sidebar[0].Items.map((item, itemIndex) => {
                            let itemInfo = item
                        
                            let count = 0;
                            for (let list of item.meta.Lists) {
                                count += list.Items.length;
                            }

                                    return (
                                        <Item key={item.ID}
                                            active={this.props.Sidebar[0].ActiveIndex == itemIndex}
                                            item={item}
                                            className="row">
                                                <div className="title"><span>{item.meta.Title}</span></div>
                                                <div className="count"><span>{count}</span></div>
                                        </Item>
                                    )
                        }) }
                      <div className="row bottom">
                      {this.props.Sidebar[1].Items.map((item) => {
                          return(
                              <Item active={ item.Active } key={ item.ID } item={item}>
                                  <img src={item.meta.src} />
                              </Item>
                          )
                      })}

                      </div>
                    </div>
                  </div>
                </div>
                <div id="main" ref="MainView">
                  <GameListPage layerID={ this.state.UILayer.ID }
                    activeIndex={ this.state.UILayer.ActiveIndex }
                    active={ this.state.UILayer.Active }
                    UILayer={ this.state.UILayer } />
                </div>
              </div>
            </main>
        )
    }


    componentDidMount() {
        //global.Sounds.UIReady.play()
    }


}

