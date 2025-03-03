import { app, BrowserWindow, ipcMain } from "electron"
import path from "path"

function criarJanela() {
  const janelaPrincipal = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "../src/preload.js"),
    },
  })

  janelaPrincipal.loadFile(path.join(__dirname, "../public/index.html"))
}

app.whenReady().then(() => {
  criarJanela()

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      criarJanela()
    }
  })
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

ipcMain.on("iniciar-processo", async (event) => {
  console.log("Processo iniciado!")

  try {
    const { main } = await import("./index")
    const resultados = await main()

    event.reply("processo-concluido", resultados)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erro ao executar o processo:", error.message)
      event.reply("processo-erro", error.message)
    } else {
      console.error("Erro desconhecido:", error)
      event.reply("processo-erro", "Erro desconhecido")
    }
  }
})
