const electron = require('electron')
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let win = null

function createWindow () {
    win = new BrowserWindow({width: 800, height: 600, frame: false, show: false})
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'pokedex.html'),
        protocol: 'file:',
        slashes: true
    }))
    win.on('ready-to-show', () => {
        win.show()
    })
}

app.on('ready', () => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('active', () => {
    if (win == null){
        createWindow()
    }
})