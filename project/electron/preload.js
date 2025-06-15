const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  selectDownloadFolder: () => ipcRenderer.invoke('select-download-folder'),
  openFile: (filePath) => ipcRenderer.invoke('open-file', filePath),
  openFolder: (folderPath) => ipcRenderer.invoke('open-folder', folderPath),
  startRecording: (options) => ipcRenderer.invoke('start-recording', options),
  stopRecording: (recordingId) => ipcRenderer.invoke('stop-recording', recordingId),
  
  // Settings
  getSettings: () => ipcRenderer.invoke('get-settings'),
  saveSettings: (settings) => ipcRenderer.invoke('save-settings', settings),
});