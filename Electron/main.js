// Basic init
const electron = require('electron')
const {app, BrowserWindow, ipcMain} = electron

// Let electron reloads by itself when webpack watches changes in ./app/
require('electron-reload')(__dirname)
const fs = require('fs');

// To avoid being garbage collected
let mainWindow

let config = {}
let appDataPath = app.getPath("userData") + "\\Den Data\\"


app.on('ready', () => {


    let splashWindow = new BrowserWindow({width: 480, height: 300, frame: false})

    splashWindow.loadURL(`file://${__dirname}/app/splash.html`)

    let mainWindow = new BrowserWindow({width: 1280, height: 720, frame: false})
    //mainWindow.maximize();
    
    
    //mainWindow.setMenu(null);
    
    ipcMain.on('ready', function() {
        console.log("Page ready")
        mainWindow.webContents.send("appPath", app.getAppPath());
    });

    //mainWindow.on('message', MainThreadMessage);

    mainWindow.loadURL(`file://${__dirname}/app/index.html`)
    //mainWindow.setFullScreen(true);
    loadConfig()

    mainWindow.on('ready', () => {
        console.log("Main Browser Ready")
    })

    mainWindow.webContents.send("config", {"appDataPath": appDataPath, "config": config})
})




loadConfig = () => {

    if(!fs.existsSync(appDataPath)) {
        fs.mkdirSync(appDataPath)
    }

    if(!fs.existsSync(appDataPath + "config.json")) {
        saveConfig({})
    }

    config = JSON.parse(fs.readFileSync(appDataPath + "config.json", 'utf8'))
    console.log(config)

}


saveConfig = (settingsJSON) => {
    fs.writeFileSync(appDataPath + "config.json", JSON.stringify(settingsJSON))
}


MainThreadMessage = (message) => {
    console.log(message)
}