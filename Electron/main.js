// Basic init
const electron = require('electron')
const {app, BrowserWindow, ipcMain} = electron

// Let electron reloads by itself when webpack watches changes in ./app/
require('electron-reload')(__dirname)

// To avoid being garbage collected
let mainWindow



app.on('ready', () => {


    let mainWindow = new BrowserWindow({width: 1280, height: 720, frame: true})
    //mainWindow.maximize();
    
    
    //mainWindow.setMenu(null);
    
    ipcMain.on('ready', function() {
        console.log("Page ready")
        mainWindow.webContents.send("appPath", app.getAppPath());
    });

    mainWindow.loadURL(`file://${__dirname}/app/index.html`)
    //mainWindow.setFullScreen(true);

})




