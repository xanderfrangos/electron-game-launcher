
import React from 'react'
import {render} from 'react-dom'
import App from './App.jsx'
import UILayer from './ui/Layer.jsx'
import UIList from './ui/List.jsx'
import UIItem from './ui/Item.jsx'
import UINavigation from './ui/Navigation.jsx'
import UIInput from './ui/Input.jsx'
import UISounds from './ui/Sounds.jsx'

var { ipcRenderer, remote, webview } = require('electron');


let navItems = [];

const addListToNav = (layerID) => {
    const list = global.UI.LayerCache[layerID]

    const newItem = new UIItem( () => {
        console.log("nav click", list)
        global.UI.NewLayer(layerID)
        global.UI.SetCurrentListIndex(0);
        global.AppJS.setState({"UILayer": list})
        //global.AppJS.forceRefresh();
    } );



        newItem.FocusAction = () => {
            //global.AppJS.setState({"UILayer": []})
            global.AppJS.setState({"UILayer": list})
            //global.AppJS.forceRefresh();
            //global.AppJS.forceUpdate();
        }
        newItem.meta = list;
        navItems.push(newItem);
}

ipcRenderer.on('appStart', (event, args) => {

    // Don't change these. They reference each other.
    global.UI = new UINavigation();
    global.Input = new UIInput();
    global.Sounds = new UISounds();
    //global.Sounds.Mute()

    // Build Items
    let items = [];
    let items2 = [];
    let items3 = [];


    let list1Items = [];
    let list1AItems = [];
    let list2Items = [];

    let db = gamesDB.steam;
    let dbArr = Object.values(gamesDB.steam)

    console.log(dbArr)

    let sortedApps = dbArr.sort(function(a, b) {
        var textA = a.name.toLowerCase();
        var textB = b.name.toLowerCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    


    // Home
    sortedApps.forEach(function(element) {
        let newItem = new UIItem( global.Input.RunGame );
        newItem.BackAction = () => {
            global.UI.PreviousLayer()
        }
        newItem.meta = element;
        items.push(newItem);
    }, this);

    sortedApps.forEach(function(element) {
        let newItem = new UIItem(global.Input.RunGame);
        newItem.BackAction = () => {
            global.UI.PreviousLayer()
        }
        newItem.meta = element;
        items2.push(newItem);
    }, this);

    sortedApps.forEach(function(element) {
        let newItem = new UIItem(global.Input.RunGame);
        newItem.BackAction = () => {
            global.UI.PreviousLayer()
        }
        newItem.meta = element;
        items3.push(newItem);
    }, this);


    // Test Lists
    sortedApps.forEach(function(element) {
        let newItem = new UIItem(global.Input.RunGame);
        newItem.BackAction = () => {
            global.UI.PreviousLayer()
        }
        newItem.meta = element;
        list1Items.push(newItem);
    }, this);

    sortedApps.forEach(function(element) {
        let newItem = new UIItem(global.Input.RunGame);
        newItem.BackAction = () => {
            global.UI.PreviousLayer()
        }
        newItem.meta = element;
        list1AItems.push(newItem);
    }, this);

    sortedApps.forEach(function(element) {
        let newItem = new UIItem(global.Input.RunGame);
        newItem.BackAction = () => {
            global.UI.PreviousLayer()
        }
        newItem.meta = element;
        list2Items.push(newItem);
    }, this);

    // Build List w/ Items

    let allList = new UIList(items, "All Games", 3);
    let recentList = new UIList([items2[8], items2[12], items2[21]], "Recently Played", 3);
    let favoritesList = new UIList([items3[7], items3[16], items3[22], items3[27], items3[23]], "Favorites", 3);

    let tL1 = new UIList([list1Items[9], list1Items[10], list1Items[11], list1Items[12], list1Items[13], list1Items[14], list1Items[15], list1Items[16]], "Test List 1", 3);
    let tL1A = new UIList([list1Items[39], list1Items[40], list1Items[41]], "Recent from TL1", 3);
    let tL2 = new UIList([list2Items[23], list2Items[33], list2Items[42], list2Items[45], list2Items[7]], "Test List 2", 3);

    // Build Layer w/ List
    let homeID = global.UI.NewCacheLayer([favoritesList, recentList, allList], "Home");
    addListToNav(homeID)

    let list1ID = global.UI.NewCacheLayer([tL1, tL1A], "Test List 1");
    addListToNav(list1ID);

    let list2ID = global.UI.NewCacheLayer(tL2, "Test List 2");
    addListToNav(list2ID);
    



    const addItem = new UIItem();
    const fullscreenItem = new UIItem();
    const settingsItem = new UIItem();
    const exitItem = new UIItem();

    const navBottomList = new UIList([addItem, fullscreenItem, settingsItem, exitItem], "Bottom Options", 4);


    let navList = new UIList(navItems, "Game Lists", 1);
    let navID = global.UI.NewCacheLayer([navList, navBottomList], "Navigation");
    //global.UI.NewLayer(navID);
    global.UI.ChangeLayer(navID)

    render(
        <App Sidebar={global.UI.LayerCache[global.UI.Layers[0]].Lists} UILayer={global.UI.LayerCache[global.UI.Layers[0]].Lists[0].Items[0].meta}/>,
        document.getElementById('app')
    )
});

