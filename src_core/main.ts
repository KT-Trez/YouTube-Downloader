import 'dotenv/config';
import {app} from 'electron';
import * as path from 'path';
import CustomBrowserWindow, {CustomBrowserWindowOptions} from './classes/CustomBrowserWindow';
import {mountIpcMainHandlers} from './classes/Messenger';
import BrowserWindowConstructorOptions = Electron.BrowserWindowConstructorOptions;
import WebPreferences = Electron.WebPreferences;


const options: CustomBrowserWindowOptions = {
	height: 600,
	minHeight: 600,
	minWidth: 900,
	width: 900
};

const win = new CustomBrowserWindow(options);


app.on('ready', () => {
	const options: BrowserWindowConstructorOptions = {
		autoHideMenuBar: app.isPackaged,
		backgroundColor: '#333',
		center: true,
		//thickFrame: true,
		title: app.getName() + ' v' + app.getVersion(),
		//titleBarStyle: 'hidden'
	};

	const preferences: WebPreferences = {
		devTools: !app.isPackaged,
		webSecurity: !app.isPackaged
	};

	mountIpcMainHandlers();

	win.create(options, preferences, path.join(__dirname, 'preload', 'main_preload.js'));
	win.loadContent();
});

export {
	win
};