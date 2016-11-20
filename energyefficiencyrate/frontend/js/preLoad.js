/**
 * Created by hxgqh on 16/9/11.
 */
window.require = require;
window.ipc = require('ipc');
const {ipcRenderer} = require('electron');
window.ipcRenderer = ipcRenderer;

console.log(ipcRenderer);
