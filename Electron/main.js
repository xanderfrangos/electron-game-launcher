//import { exec } from 'child_process';




// Basic init
const electron = require('electron')
const {app, BrowserWindow, ipcMain} = electron
const path = require('path');


//const electronAcrylic = require('electron-acrylic');

const { execSync } = require('child_process');


module.exports = {
    // Hack for loading from den-launcher
}

// Let electron reloads by itself when webpack watches changes in ./app/
//require('electron-reload')(__dirname)
const fs = require('fs');

// To avoid being garbage collected
let mainWindow
let splashWindow

let config = {}
let appDataPath = stringEscape(app.getPath("appData")) + "\\Den Game Launcher\\"
let appFilesPath = "${__dirname}";
let games = {
    steam: {},
    steamRAW: [],
    manual: []
}

runSteamCrawler = (includeImages = false, callback = () => { console.log("Steam crawler done!")} ) => {
    const crawler = execSync('"' + app.getAppPath() + '\\app\\util\\steam-console.exe'+'" -dbPath "' + appDataPath + 'games.steam.json"' + (includeImages ? ' -imagesDirectory "' + appDataPath + 'cache\\SteamGraphics"' : '') + '', {}, (error, stdout, stderr) => {
        if (error) {
            console.log(error);
        }
        console.log(stdout);
        callback()
      });



}


app.on('ready', () => {
    appFilesPath = "C:\\Projects\\electron-game-launcher\\Electron\\";


    splashWindow = new BrowserWindow( {width: 480, height: 300, show:false , frame: false, transparent:true, webPreferences: {blinkFeatures: 'CSSBackdropFilter'} } )


    mainWindow = new BrowserWindow({width: 1280, height: 720, show:false, frame: false, transparent:false, webPreferences: {blinkFeatures: 'CSSBackdropFilter'} })
    

    ipcMain.on('MainThreadMessage', (event, arg) => {MainThreadMessage(arg)})
    


    app.on('window-all-closed', function() {
          app.quit();
      });

    mainWindow.on('ready', () => {
        console.log("Main Browser Ready")
    })
    mainWindow.on('close', () => {
        console.log("Main Browser Closing")
        console.log(mainWindow.getSize(), mainWindow.getPosition())

        let size = mainWindow.getSize()
        let pos = mainWindow.getPosition()
        config.windowSizeX = size[0]
        config.windowSizeY = size[1]
        config.windowPosX = pos[0]
        config.windowPoxY = pos[1]

        saveConfig(config)

        app.quit()
    })

    splashWindow.on('close', () => {
        console.log("Splash Browser Closing")
        app.quit()
    })

    
    splashWindow.webContents.once('did-finish-load', splashScreenReady)   
    splashWindow.loadURL('file://' + appFilesPath + '/app/splash.html')
    splashWindow.show()

    
    //runSteamCrawler(true);
    //showMainScreen()
})



splashScreenReady = () => {
    
    splashWindow.show();
    splashWindow.webContents.send("setLoadingText", "Loading config files")
    loadConfig()
    splashWindow.webContents.send("setLoadingText", "Updating Steam games")
    runSteamCrawler(false);
    splashWindow.webContents.send("setLoadingText", "Loading databases")
    games.steamRAW = JSON.parse(fs.readFileSync(appDataPath + 'games.steam.json', 'utf8'))

    for(let game of games.steamRAW) {
        games.steam[game.id] = game;
    }


    showMainScreen()
    mainWindow.webContents.openDevTools()
    setTimeout(() => {mainWindow.focus()}, 750);
}




showMainScreen = () => {
    splashWindow.hide() 

    if(config.windowPosX && config.windowPoxY)
        mainWindow.setPosition(config.windowPosX, config.windowPoxY)

    if(config.windowSizeX && config.windowSizeY)
        mainWindow.setSize(config.windowSizeX, config.windowSizeY)

    mainWindow.loadURL('file://' + appFilesPath + '/app/index.html')

    mainWindow.webContents.once('did-finish-load', () => {
        mainWindow.webContents.send("appPath", appFilesPath);
        mainWindow.webContents.send("appConfig", {"appDataPath": appDataPath, "config": config, "games": games})
        mainWindow.webContents.send("appStart", appFilesPath);
        mainWindow.show()
        
    });

    ipcMain.on('sidebarExit', () => {
        console.log("sidebarExit")
        mainWindow.close()
    });

    ipcMain.on('sidebarFullscreen', () => {
        console.log("sidebarFullscreen")
        if(mainWindow.isFullScreen()) {
            mainWindow.setFullScreen(false)
            mainWindow.webContents.send("fullscreenMode", false)
        } else {
            mainWindow.setFullScreen(true)
            mainWindow.webContents.send("fullscreenMode", true)
        }
        
    });
    
    
}




loadConfig = () => {

    if(!fs.existsSync(appDataPath)) {
        fs.mkdirSync(appDataPath)
    }

    if(!fs.existsSync(appDataPath + "config.json")) {
        saveConfig({})
    }

    config = JSON.parse(fs.readFileSync(appDataPath + "config.json", 'utf8'))
    console.log("Config loaded: ", config)

}


saveConfig = (settingsJSON) => {
    fs.writeFileSync(appDataPath + "config.json", JSON.stringify(settingsJSON))
}


MainThreadMessage = (message) => {
    console.log(message)
}


function stringEscape(s) {
    return s ? s.replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/\t/g,'\\t').replace(/\v/g,'\\v').replace(/'/g,"\\'").replace(/"/g,'\\"').replace(/[\x00-\x1F\x80-\x9F]/g,hex) : s;
    function hex(c) { var v = '0'+c.charCodeAt(0).toString(16); return '\\x'+v.substr(v.length-2); }
}