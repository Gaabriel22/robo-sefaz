const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("electron", {
  enviarMensagem: (canal, dados) => ipcRenderer.send(canal, dados),
  onProcessoConcluido: (callback) =>
    ipcRenderer.on("processo-concluido", callback),
  onProcessoErro: (callback) => ipcRenderer.on("processo-erro", callback),
})
