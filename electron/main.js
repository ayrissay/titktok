const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

// Keep a global reference of the window object
let mainWindow;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    },
    titleBarStyle: 'hiddenInset',
    show: false
  });

  // Load the app
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile('dist/index.html');
  }

  // Show window when ready to prevent visual flash
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Emitted when the window is closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// This method will be called when Electron has finished initialization
app.whenReady().then(createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// IPC handlers for TikTok recording functionality
ipcMain.handle('select-download-folder', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  });
  
  if (!result.canceled) {
    return result.filePaths[0];
  }
  return null;
});

ipcMain.handle('open-file', async (event, filePath) => {
  shell.openPath(filePath);
});

ipcMain.handle('open-folder', async (event, folderPath) => {
  shell.openPath(folderPath);
});

// TikTok video recording handlers would go here
// This would integrate with libraries like ytdl-core or similar
ipcMain.handle('start-recording', async (event, { url, duration, quality }) => {
  try {
    // Implement actual TikTok video recording logic here
    // This would use libraries to extract and record the video
    console.log('Starting recording:', { url, duration, quality });
    
    // Return recording session ID
    return { success: true, recordingId: Date.now().toString() };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('stop-recording', async (event, recordingId) => {
  try {
    // Implement stopping recording logic
    console.log('Stopping recording:', recordingId);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});