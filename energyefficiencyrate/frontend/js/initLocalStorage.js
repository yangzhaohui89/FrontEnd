/**
 * Created by yzh on 2016/9/26.
 */
require('electron').ipcRenderer.once('init', (event, message) => {
    console.log(message);  // Prints 'init!'
    if(message=="init"){
        window.localStorage.clear();
    }
});
