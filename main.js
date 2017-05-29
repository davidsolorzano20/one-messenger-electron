'use strict';
const app           = require('electron').app;
const shell         = require('electron').shell;
const ipc           = require('electron').ipcMain;
const BrowserWindow = require('electron').BrowserWindow;
const Menu          = require('electron').Menu;

// Require Node modules
const path          = require('path');
const fs            = require('fs');
const storage       = require('./storage');

const acURL         = storage.get('acURL') || 'http://www.nicaraguacraftbrewing.com/';
//const acURL         = storage.get('acURL') || 'http://social.dev/';

let locale;
let mainWindow;
let isQuitting = false;

function createMainWindow()
{
	const lastWindowState = storage.get('lastWindowState') || {width: 1024, height: 768};
	const isFullscreen = storage.get('isFullscreen') || false;

	const win = new BrowserWindow(
	{
		title: app.getName(),
		show: false,
		x: lastWindowState.x,
		y: lastWindowState.y,
		width: lastWindowState.width,
		height: lastWindowState.height,
		icon: process.platform === 'linux' && path.join(__dirname, 'assets/Icons/icon.png'),
		minWidth: 1300,
		minHeight: 600,
		titleBarStyle: 'default',
		webPreferences:
		{
			nodeIntegration: true,
			preload: path.join(__dirname, 'browser.js'),
			webSecurity: true,
			plugins: true,
			effectAllowed: true,
			allowpopups: true
		}

	});

	win.maximize();
	//win.setResizable(false);

	// Window close callback
	win.on('close', function(e)
	{
		if (process.platform == 'darwin' && !isQuitting)
		{
			e.preventDefault();
    		win.hide();
  		}
		else
		{
			app.quit();

		}

	});

	win.loadURL(acURL);
	win.setFullScreen(isFullscreen);
	return win;

}

app.on('ready', function()
{
	locale = app.getLocale();
	mainWindow = createMainWindow();

	const page = mainWindow.webContents;
	switch (locale)
	{
		case 'de':
			Menu.setApplicationMenu(require('./menus/en'));
			break;

		default:
			Menu.setApplicationMenu(require('./menus/en'));

	}

	page.on('dom-ready', function()
	{
		mainWindow.show();

	});
});

app.on('activate', function()
{
	mainWindow.show();

});

app.on('before-quit', function()
{
	isQuitting = true;

	if (!mainWindow.isFullScreen())
	{
		storage.set('lastWindowState', mainWindow.getBounds());
		storage.set('isFullscreen', false);

	}
	else
	{
		storage.set('isFullscreen', true);

	}

});
