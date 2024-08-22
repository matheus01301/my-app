require('dotenv').config();
const { app, ipcMain, BrowserWindow, protocol } = require('electron');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'http://127.0.0.1:8000';

protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }]);

let mainWindow;
let pvtWindow;
let indicatorsData = [];

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    frame: false,
    icon: path.join(__dirname, '..', 'renderer', 'public', 'images', 'icon.png'),
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  const port = process.argv[2] || 3000;
  if (process.env.NODE_ENV === 'production') {
    mainWindow.loadURL('app://./login.html').catch(err => console.error('Failed to load URL', err));
  } else {
    mainWindow.loadURL(`http://localhost:${port}/login`);
  }
}

ipcMain.handle('request-close', async () => {
  try {
    return true;
  } catch (error) {
    console.error('Failed to save data before closing:', error);
    return false;
  }
});

app.on('ready', () => {
  protocol.registerFileProtocol('app', (request, callback) => {
    const url = request.url.substr(6);
    const filePath = path.join(__dirname, url);
    callback({ path: filePath });
  }, (error) => {
    if (error) console.error('Failed to register protocol', error);
  });

  createMainWindow();

});

ipcMain.on('load-main', (event, permission) => {
  if (process.env.NODE_ENV === 'production') {
    mainWindow.loadURL('app://./home.html').catch(err => console.error('Failed to load URL', err));
  } else {
    const port = process.argv[2] || 3000;
    mainWindow.loadURL(`http://localhost:${port}/home`);
  }
});

ipcMain.handle('close', () => {
  mainWindow.close();
  app.quit();
});

app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

ipcMain.on('maximize', () => {
  mainWindow.maximize();
});

ipcMain.on('unmaximize', () => {
  mainWindow.unmaximize();
});

ipcMain.on('minimize', () => {
  mainWindow.minimize();
});

ipcMain.handle('isMaximized', () => {
  return mainWindow.isMaximized();
});

ipcMain.handle('getBounds', () => {
  return mainWindow.getBounds();
});
