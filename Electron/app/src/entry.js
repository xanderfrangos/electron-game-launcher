
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
    let list = global.UI.LayerCache[layerID]

    let newItem = new UIItem( () => {
        console.log("nav click", list)
    }, () => {
        //global.AppJS.setState({"UILayer": []})
        global.AppJS.setState({"UILayer": list})
        global.AppJS.forceRefresh();
    } );
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

    let db = gamesDB.steam;
    let dbArr = Object.values(gamesDB.steam)

    console.log(dbArr)

    let sortedApps = dbArr.sort(function(a, b) {
        var textA = a.name.toLowerCase();
        var textB = b.name.toLowerCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    

    sortedApps.forEach(function(element) {
        let newItem = new UIItem( global.Input.RunGame );
        newItem.meta = element;
        items.push(newItem);
    }, this);

    sortedApps.forEach(function(element) {
        let newItem = new UIItem(global.Input.RunGame);
        newItem.meta = element;
        items2.push(newItem);
    }, this);

    sortedApps.forEach(function(element) {
        let newItem = new UIItem(global.Input.RunGame);
        newItem.meta = element;
        items3.push(newItem);
    }, this);

    // Build List w/ Items

    let allList = new UIList(items, "All Games", 3);
    let recentList = new UIList([items2[8], items2[12], items2[21]], "Recently Played", 3);
    let favoritesList = new UIList([items3[7], items3[16], items3[22], items3[27], items3[23]], "Favorites", 3);

    let HomeList = [favoritesList, recentList, allList];

    let TestList1 = [favoritesList];
    let TestList2 = [recentList];
    let TestList3 = [recentList, favoritesList];
    let TestList4 = [favoritesList, recentList];

    // Build Layer w/ List
    let homeID = global.UI.NewCacheLayer(HomeList, "Home");
    addListToNav(homeID)

    let list1ID = global.UI.NewCacheLayer(TestList1, "Test List 1");
    addListToNav(list1ID);

    let list2ID = global.UI.NewCacheLayer(TestList2, "Test List 2");
    addListToNav(list2ID);
    
    let list3ID = global.UI.NewCacheLayer(TestList3, "Test List 3");
    addListToNav(list3ID);

    let list4ID = global.UI.NewCacheLayer(TestList4, "Test List 4");
    addListToNav(list4ID);

    let navList = new UIList(navItems, "Game Lists", 1);
    let navID = global.UI.NewCacheLayer(navList, "Navigation");
    //global.UI.NewLayer(navID);
    global.UI.ChangeLayer(navID)

    render(
        <App Sidebar={global.UI.LayerCache[global.UI.Layers[0]].Lists[0].Items} UILayer={global.UI.LayerCache[homeID]}/>,
        document.getElementById('app')
    )
});

