'use strict';

const ipc = require('electron').ipcRenderer;
const shell = require('electron').shell;

// Trigger for "gmail"
ipc.on('gmail', function () {
	document.querySelector('a[ng-href="#gmail"], a[href="#gmail"]').click();

});

// Trigger for "facebook"
ipc.on('facebook', function () {
	document.querySelector('a[ng-href="#facebook"], a[href="#facebook"]').click();

});

// Trigger for "messenger"
ipc.on('messenger', function () {
	document.querySelector('a[ng-href="#messenger"], a[href="#messenger"]').click();

});

// Trigger for "whatsapp"
ipc.on('whatsapp', function () {
	document.querySelector('a[ng-href="#whatsapp"], a[href="#whatsapp"]').click();

});

// Trigger for "telegram"
ipc.on('telegram', function () {
	document.querySelector('a[ng-href="#telegram"], a[href="#telegram"]').click();

});

// Trigger for "twitter"
ipc.on('twitter', function () {
	document.querySelector('a[ng-href="#twitter"], a[href="#twitter"]').click();

});

// Trigger for "youtube"
ipc.on('youtube', function () {
	document.querySelector('a[ng-href="#youtube"], a[href="#youtube"]').click();

});
