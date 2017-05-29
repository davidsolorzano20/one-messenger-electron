'use strict';

// Require Electron modules
const app = require('electron').app;
const shell = require('electron').shell;
const BrowserWindow = require('electron').BrowserWindow;
const Menu = require('electron').Menu;

// Require Node modules
const os = require('os');

// Get application name
const appName = app.getName();

let tpl;

// Send IPC commands to browser window
function sendAction(action) {
	const win = BrowserWindow.getAllWindows()[0];

	if (process.platform === 'darwin') {
		win.restore();

	}

	win.webContents.send(action);

}
/*
 // Template for Mac OS X
 const darwinTpl = [
 {
 label: appName,
 submenu: [
 {
 label: `About ${appName}`,
 role: 'about'
 },
 {
 type: 'separator'
 },
 {
 label: 'Preferences …',
 accelerator: 'Cmd+,',
 click: function() {
 sendAction('preferences');
 }
 },
 {
 label: 'User Profile …',
 accelerator: 'Cmd+Alt+,',
 click: function() {
 sendAction('profile');
 }
 },
 {
 type: 'separator'
 },
 {
 label: 'Services',
 role: 'services',
 submenu: []
 },
 {
 type: 'separator'
 },
 {
 label: `Hide ${appName}`,
 accelerator: 'Cmd+H',
 role: 'hide'
 },
 {
 label: 'Hide Others',
 accelerator: 'Cmd+Shift+H',
 role: 'hideothers'
 },
 {
 label: 'Show All',
 role: 'unhide'
 },
 {
 type: 'separator'
 },
 {
 label: `Quit ${appName}`,
 accelerator: 'Cmd+Q',
 click: function() {
 app.quit();
 }
 }
 ]
 },
 {
 label: 'File',
 submenu: [
 {
 label: 'New Project',
 accelerator: 'CmdOrCtrl+N',
 click: function() {
 sendAction('new-project');
 }
 },
 {
 label: 'Find …',
 accelerator: 'CmdOrCtrl+F',
 click: function() {
 sendAction('find');
 }
 },
 {
 type: 'separator'
 },
 {
 label: 'Log out',
 click: function() {
 sendAction('logout');
 }
 }
 ]
 },
 {
 label: 'Edit',
 submenu: [
 {
 label: 'Undo',
 accelerator: 'CmdOrCtrl+Z',
 role: 'undo'
 },
 {
 label: 'Redo',
 accelerator: 'Shift+CmdOrCtrl+Z',
 role: 'redo'
 },
 {
 type: 'separator'
 },
 {
 label: 'Cut',
 accelerator: 'CmdOrCtrl+X',
 role: 'cut'
 },
 {
 label: 'Copy',
 accelerator: 'CmdOrCtrl+C',
 role: 'copy'
 },
 {
 label: 'Paste',
 accelerator: 'CmdOrCtrl+V',
 role: 'paste'
 },
 {
 label: 'Select All',
 accelerator: 'CmdOrCtrl+A',
 role: 'selectall'
 }
 ]
 },
 {
 label: 'View',
 submenu: [
 {
 label: 'Projects',
 accelerator: 'CmdOrCtrl+1',
 click: function() {
 sendAction('goto-projects');
 }
 },
 {
 label: 'My Work',
 accelerator: 'CmdOrCtrl+2',
 click: function() {
 sendAction('goto-my-work');
 }
 },
 {
 label: 'Activity',
 accelerator: 'CmdOrCtrl+3',
 click: function() {
 sendAction('goto-activity');
 }
 },
 {
 label: 'Calendar',
 accelerator: 'CmdOrCtrl+4',
 click: function() {
 sendAction('goto-calendar');
 }
 },
 {
 label: 'People',
 accelerator: 'CmdOrCtrl+5',
 click: function() {
 sendAction('goto-people');
 }
 },
 {
 label: 'Invoices',
 accelerator: 'CmdOrCtrl+6',
 click: function() {
 sendAction('goto-invoices');
 }
 },
 {
 label: 'Estimates',
 accelerator: 'CmdOrCtrl+7',
 click: function() {
 sendAction('goto-estimates');
 }
 },
 {
 type: 'separator'
 },
 {
 label: 'Reports',
 accelerator: 'CmdOrCtrl+8',
 click: function() {
 sendAction('goto-reports');
 }
 },
 {
 label: 'Trash',
 accelerator: 'CmdOrCtrl+9',
 click: function() {
 sendAction('goto-trash');
 }
 },
 {
 type: 'separator'
 },
 {
 label: 'Completed Projects',
 accelerator: 'CmdOrCtrl+0',
 click: function() {
 sendAction('goto-completed-projects');
 }
 },
 {
 type: 'separator'
 },
 {
 label: 'Reload',
 accelerator: 'CmdOrCtrl+R',
 click: function() {
 const win = BrowserWindow.getAllWindows()[0];
 win.webContents.reload();
 }
 }
 ]
 },
 {
 label: 'Window',
 role: 'window',
 submenu: [
 {
 label: 'Minimize',
 accelerator: 'CmdOrCtrl+M',
 role: 'minimize'
 },
 {
 label: 'Close',
 accelerator: 'CmdOrCtrl+W',
 role: 'close'
 },
 {
 type: 'separator'
 },
 {
 label: 'Bring All to Front',
 role: 'front'
 },
 {
 label: 'Toggle Full Screen',
 accelerator: 'Ctrl+Cmd+F',
 click: function() {
 const win = BrowserWindow.getAllWindows()[0];
 win.setFullScreen(!win.isFullScreen());
 }
 }
 ]
 },
 {
 label: 'Help',
 role: 'help'
 }];
 */








// Template for Linux/Windows
const linuxTpl = [
	{
		label: 'Aplications',
		submenu: [
			{
				label: 'Quit',
				accelerator: 'Alt+F4',
				click: function () {
					app.quit();
				}
			}
		]
	},
	{
		label: 'Edit',
		submenu: [
			{
				label: 'Cut',
				accelerator: 'CmdOrCtrl+X',
				role: 'cut'
			},
			{
				label: 'Copy',
				accelerator: 'CmdOrCtrl+C',
				role: 'copy'
			},
			{
				label: 'Paste',
				accelerator: 'CmdOrCtrl+V',
				role: 'paste'
			}
		]
	},{
		label: 'View',
		submenu: [
			{
				label: 'Undo',
				accelerator: 'CmdOrCtrl+N',
				click: function () {
					const win = BrowserWindow.getAllWindows()[0];
					win.webContents.undo();
				}
			},
			{
				label: 'Redo',
				accelerator: 'CmdOrCtrl+B',
				click: function () {
					const win = BrowserWindow.getAllWindows()[0];
					win.webContents.redo();
				}
			},
			{
				label: 'Reload',
				accelerator: 'CmdOrCtrl+R',
				click: function () {
					const win = BrowserWindow.getAllWindows()[0];
					win.webContents.reload();
				}
			}
		]
	},
	{
		label: 'Services',
		submenu: [
			{
				label: 'Gmail',
				accelerator: 'CmdOrCtrl+1',
				click: function () {
					sendAction('gmail');
				}
			},
			{
				label: 'Facebook',
				accelerator: 'CmdOrCtrl+2',
				click: function() {
				 sendAction('facebook');
				 }
			},
			{
				label: 'Messenger',
				accelerator: 'CmdOrCtrl+3',
				click: function() {
				 sendAction('messenger');
				 }
			},
			{
				label: 'Whatsapp',
				accelerator: 'CmdOrCtrl+4',
				click: function() {
				 sendAction('whatsapp');
				 }
			},
			{
				label: 'Telegram',
				accelerator: 'CmdOrCtrl+5',
				click: function() {
				 sendAction('telegram');
				 }
			},
			{
				label: 'Twitter',
				accelerator: 'CmdOrCtrl+6',
				click: function() {
				 sendAction('twitter');
				 }
			},
			{
				label: 'Youtube',
				accelerator: 'CmdOrCtrl+7',
				click: function() {
				 sendAction('youtube');
				 }
			}
		]
	},
	{
		label: 'Develop Team',
		click: function () {
			shell.openExternal('https://join.slack.com/developteams/shared_invite/MTg3MDIyMTEzMDI5LTE0OTU1NTkwMjQtNDRlYWRjY2U5MQ');
		}
	},
	{
		label: 'Help',
		role: 'help'
	}
];

// Help submenu
const helpSubmenu = [
	{
		label: 'One Messenger Website …',
		click: function () {
			shell.openExternal('https://www.facebook.com/luis.solorzanop.9');
		}
	},
	{
		label: 'Report an Issue …',
		click: function () {
			shell.openExternal('https://www.facebook.com/luis.solorzanop.9');
		}
	},
	{
		type: 'separator'
	},
	{
		label: 'About One Messenger',
		click: function() {
		 /*const win = new BrowserWindow({width: 800, height: 600, frame: false});
			win.loadURL('https://www.google.com.mi');
		 win.show()*/
		 }
	},{
		label: 'Dev. Luis Solorzano ',
		click: function() {
		 shell.openExternal('https://www.facebook.com/luis.solorzanop.9');
		 }
	}];

// Distinguish between Mac OS X and Linux/Windows
if (process.platform == 'darwin') {
	tpl = darwinTpl;

}
else {
	tpl = linuxTpl;

}

// Add help submenu to template
tpl[tpl.length - 1].submenu = helpSubmenu;

// Export finished/built template
module.exports = Menu.buildFromTemplate(tpl);
