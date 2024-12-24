const path = require("node:path");

const { app, BrowserWindow, ipcMain, globalShortcut } = require("electron");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, "public/logo.jfif"),
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile("./index.html");

  // globalShortcut.register("CommandOrControl+Shift+I", () => {});

  ipcMain.on("go-back", () => {
    if (mainWindow.webContents.canGoBack()) {
      mainWindow.webContents.goBack();
    }
  });

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on("will-quit", () => {
  globalShortcut.unregister("CommandOrControl+Shift+I");
  globalShortcut.unregisterAll();
});
