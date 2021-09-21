const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('app', {
  dropFiles(files) { ipcRenderer.invoke("dropFiles", files); },
});
