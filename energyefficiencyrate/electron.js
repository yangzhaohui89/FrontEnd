/**
 * Created by hxgqh on 16/6/12.
 */
const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const _ = require('lodash');
const moment = require('moment');
const X = require('xlsx');
const {ipcMain} = require('electron');
const fs = require('fs');
const DocxGen = require("docxtemplater");
const ImageModule=require('docxtemplater-image-module');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
	// Create the browser window.
	//mainWindow = new BrowserWindow({width: 800, height: 600});
	mainWindow = new BrowserWindow({
		webPreferences: {
			nodeIntegration: true
			//preload: "frontend/js/preLoad.js"
		}
	});
	mainWindow.maximize();
	//app.dock.hide();
	// and load the index.html of the app.
	mainWindow.loadURL(`file://${__dirname}/frontend/pages/0.html`);
	// Open the DevTools.
	mainWindow.webContents.openDevTools();
	// Emitted when the window is closed.
	mainWindow.on('closed', function () {
		mainWindow = null
	});
	//加载完成处理
	mainWindow.webContents.once('did-finish-load', () => {
		mainWindow.webContents.send('init', 'init');
	});
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
});

app.on('activate', function () {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow()
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
function saveBase64AsPng(fileName,imgData){
	if (typeof(imgData) == "undefined" || imgData==null || imgData=='') {
		console.log("the data is null");
	}else{
		var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
		var dataBuffer = new Buffer(base64Data, 'base64');
		fs.writeFileSync(fileName, dataBuffer);
	}
}

function formatDateToString(){
	var myDate = new Date();
	return ""+myDate.getFullYear()+(myDate.getMonth()+1)+myDate.getDate()+'_'+myDate.getHours()+myDate.getMinutes()+myDate.getSeconds();
}

ipcMain.on('synchronous-message', (event, arg) => {
	console.log(process.cwd());
	var pathCurrent = process.cwd();
	//模版文件
	//var content = fs.readFileSync("./frontend/js/template/report.docx", "binary");
	//var content = fs.readFileSync("./resources/app/frontend/js/template/report.docx", "binary");
	var content = fs.readFileSync(pathCurrent+"/frontend/js/template/report.docx", "binary");
	//创建文件夹
	var timeNow = formatDateToString();
	//var pathPrefix='project/tmp'+timeNow+'/';
	//var pathPrefix='./resources/app/project/tmp'+timeNow+'/';
	var pathPrefix=pathCurrent+'/project/tmp'+timeNow+'/';
	if (!fs.existsSync(pathPrefix)) {
		fs.mkdirSync(pathPrefix);
	}

	var opts = {};
	opts.centered = false;
	//var tagValue="./frontend/images/" + "image001.png";
	//var tagValue="../resources/app/frontend/images/" + "image001.png";
	//var tagValue=pathCurrent+"/frontend/images/" + "image001.png";
	opts.getImage=function(tagValue, tagName) {
		return fs.readFileSync(tagValue,'binary');
	}
	opts.getSize=function(img,tagValue,tagName) {
		var tmpPrefix = _.words(tagName)[0];
		console.log("getSize|tagValue:"+tmpPrefix);
		//建筑外观图片大小控制
		if(tmpPrefix=="jzwg"){
			//第一张照片
			if(_.endsWith(tagName, "0")){
				var tmpRatio = arg.jzwgRatio1;
				//宽>长
				if(tmpRatio>1){
					return [260,260/tmpRatio];
				}
				//宽<长
				if(tmpRatio<1){
					return [340*tmpRatio,340];
				}
				//宽==长
				if(tmpRatio==1){
					return [260,260];
				}
			}
			//第二张照片
			if(_.endsWith(tagName, "1")){
				var tmpRatio = arg.jzwgRatio2;
				//宽>长
				if(tmpRatio>1){
					return [260,260/tmpRatio];
				}
				//宽<长
				if(tmpRatio<1){
					return [340*tmpRatio,340];
				}
				//宽==长
				if(tmpRatio==1){
					return [260,260];
				}
			}
			return [260,260];
		}
		//典型平面图片大小控制
		if(tmpPrefix=="dxpm"){
			//第一张照片
			if(_.endsWith(tagName, "0")){
				var tmpRatio = arg.dxpmRatio1;
				//宽>长
				if(tmpRatio>1){
					return [470,470/tmpRatio];
				}
				//宽<长
				if(tmpRatio<1){
					return [380*tmpRatio,380];
				}
				//宽==长
				if(tmpRatio==1){
					return [380,380];
				}
			}
			return [380,380];
		}
		//测点位置图片大小控制
		if(tmpPrefix=="image"){
			//第一张照片
			if(_.endsWith(tagName, "2")){
				var tmpRatio = arg.cdtRatio1;
				console.log("cdt:"+tmpRatio);
				//宽>长
				if(tmpRatio>1){
					return [220,200/tmpRatio];
				}
				//宽<长
				if(tmpRatio<1){
					return [165*tmpRatio,165];
				}
				//宽==长
				if(tmpRatio==1){
					return [165,165];
				}
			}
			if(_.endsWith(tagName, "3")){
				var tmpRatio = arg.cdtRatio2;
				console.log("cdt:"+tmpRatio);
				//宽>长
				if(tmpRatio>1){
					return [220,200/tmpRatio];
				}
				//宽<长
				if(tmpRatio<1){
					return [165*tmpRatio,165];
				}
				//宽==长
				if(tmpRatio==1){
					return [165,165];
				}
			}
			if(_.endsWith(tagName, "4")){
				var tmpRatio = arg.cdtRatio3;
				console.log("cdt:"+tmpRatio);
				//宽>长
				if(tmpRatio>1){
					return [220,200/tmpRatio];
				}
				//宽<长
				if(tmpRatio<1){
					return [165*tmpRatio,165];
				}
				//宽==长
				if(tmpRatio==1){
					return [165,165];
				}
			}
			if(_.endsWith(tagName, "5")){
				var tmpRatio = arg.cdtRatio4;
				console.log("cdt:"+tmpRatio);
				//宽>长
				if(tmpRatio>1){
					return [220,200/tmpRatio];
				}
				//宽<长
				if(tmpRatio<1){
					return [165*tmpRatio,165];
				}
				//宽==长
				if(tmpRatio==1){
					return [165,165];
				}
			}
			if(_.endsWith(tagName, "6")){
				var tmpRatio = arg.cdtRatio5;
				console.log("cdt:"+tmpRatio);
				//宽>长
				if(tmpRatio>1){
					return [220,200/tmpRatio];
				}
				//宽<长
				if(tmpRatio<1){
					return [165*tmpRatio,165];
				}
				//宽==长
				if(tmpRatio==1){
					return [165,165];
				}
			}
			if(_.endsWith(tagName, "7")){
				var tmpRatio = arg.cdtRatio6;
				console.log("cdt:"+tmpRatio);
				//宽>长
				if(tmpRatio>1){
					return [220,200/tmpRatio];
				}
				//宽<长
				if(tmpRatio<1){
					return [165*tmpRatio,165];
				}
				//宽==长
				if(tmpRatio==1){
					return [165,165];
				}
			}
			if(_.endsWith(tagName, "8")){
				var tmpRatio = arg.cdtRatio7;
				console.log("cdt:"+tmpRatio);
				//宽>长
				if(tmpRatio>1){
					return [220,200/tmpRatio];
				}
				//宽<长
				if(tmpRatio<1){
					return [165*tmpRatio,165];
				}
				//宽==长
				if(tmpRatio==1){
					return [165,165];
				}
			}
			if(_.endsWith(tagName, "9")){
				var tmpRatio = arg.cdtRatio8;
				//宽>长
				if(tmpRatio>1){
					return [220,200/tmpRatio];
				}
				//宽<长
				if(tmpRatio<1){
					return [165*tmpRatio,165];
				}
				//宽==长
				if(tmpRatio==1){
					return [165,165];
				}
			}
			if(_.endsWith(tagName, "10")){
				var tmpRatio = arg.cdtRatio9;
				//宽>长
				if(tmpRatio>1){
					return [220,200/tmpRatio];
				}
				//宽<长
				if(tmpRatio<1){
					return [165*tmpRatio,165];
				}
				//宽==长
				if(tmpRatio==1){
					return [165,165];
				}
			}
			if(_.endsWith(tagName, "11")){
				var tmpRatio = arg.cdtRatio10;
				//宽>长
				if(tmpRatio>1){
					return [220,200/tmpRatio];
				}
				//宽<长
				if(tmpRatio<1){
					return [165*tmpRatio,165];
				}
				//宽==长
				if(tmpRatio==1){
					return [165,165];
				}
			}
			if(_.endsWith(tagName, "12")){
				var tmpRatio = arg.cdtRatio11;
				//宽>长
				if(tmpRatio>1){
					return [220,200/tmpRatio];
				}
				//宽<长
				if(tmpRatio<1){
					return [165*tmpRatio,165];
				}
				//宽==长
				if(tmpRatio==1){
					return [165,165];
				}
			}
			return [165,165];
		}
		//生成图片大小控制
		return [200,200];
	}
	var imageModule=new ImageModule(opts);
	var data = {
		projectName:arg.projectName,
		jianZhuLeiXing:arg.jianZhuLeiXing,
		qiHouFenQu:arg.qiHouFenQu,
		sheng:arg.province,
		shi:arg.city,
		qu:arg.county,
		jianChengNianDai:arg.jianChengNianDai,
		zongJianZhuMianJi:arg.zongJianZhuMianJi,
		jianZhuMianJi:arg.jianZhuMianJi,
		up:arg.up,
		down:arg.down,
		zongNengHao:arg.zongNengHao,
		caiNuanNengHao:arg.caiNuanNengHao,
		kongTiaoNengHao:arg.kongTiaoNengHao,
		zhaoMingNengHao:arg.zhaoMingNengHao,
		dtwd:arg.aveWinterTemperature,
		cnnh:arg.dwmjcnnh,
		pj1:arg.resultTmp1,
		xtwd:arg.aveSummerTemperature,
		ktnh:arg.dwmjktnh,
		pj2:arg.resultTmp2,
		aveGz:arg.aveLightData,
		zmhn:arg.dwmjzmhn,
		pj3:arg.resultTmp3,
		aveMyd:arg.aveMyd,
		qthn:arg.qtdwmjhn,
		pj4:arg.resultTmp4,
		pj5:arg.result5X,
		znh:arg.dwmjznh,
		pj6:arg.resultTmp5
	};
	//外观
	data.jzwg0 = pathPrefix+ "jzwg000.png";
	data.jzwg1 = pathPrefix+ "jzwg001.png";
	data.jzwg2 = pathPrefix+ "jzwg002.png";
	data.jzwg3 = pathPrefix+ "jzwg003.png";
	data.jzwg4 = pathPrefix+ "jzwg004.png";
	//典型平面
	data.dxpm0 = pathPrefix+ "dxpm000.png";
	data.dxpm1 = pathPrefix+ "dxpm001.png";
	data.dxpm2 = pathPrefix+ "dxpm002.png";
	data.dxpm3 = pathPrefix+ "dxpm003.png";
	data.dxpm4 = pathPrefix+ "dxpm004.png";
	//多个位置信息处理
	data.image2 = pathPrefix + "image003.png";
	data.image3 = pathPrefix + "image004.png";
	data.image4 = pathPrefix + "image005.png";
	data.image5 = pathPrefix + "image006.png";
	data.image6 = pathPrefix + "image007.png";
	data.image7 = pathPrefix + "image008.png";
	data.image8 = pathPrefix + "image009.png";
	data.image9 = pathPrefix + "image0010.png";
	data.image10 = pathPrefix + "image011.png";
	data.image11 = pathPrefix + "image012.png";
	//5个图表
	data.chart1 = pathPrefix + "image013.png";
	data.chart2 = pathPrefix + "image014.png";
	data.chart3 = pathPrefix + "image015.png";
	data.chart4 = pathPrefix + "image016.png";
	data.chart5 = pathPrefix + "image017.png";
	//处理图片数据
	//建筑外观
	for(i=0;i<arg.jzwgNum;i++){
		var tmpKey = "jzwg"+(i+1);
		var tmpfileName = pathPrefix + "jzwg00"+i+".png";
		saveBase64AsPng(tmpfileName,arg[tmpKey]);
	}
	//典型平面
	for(i=0;i<arg.dxpmNum;i++){
		var tmpKey = "dxpm"+(i+1);
		var tmpfileName = pathPrefix + "dxpm00"+i+".png";
		saveBase64AsPng(tmpfileName,arg[tmpKey]);
	}
	//位置数据
	for(i=0;i<arg.cdtNum;i++){
		var tmpKey = "cdt"+(i+1);
		var tmpfileName = pathPrefix + "image00"+(i+3)+".png";
		saveBase64AsPng(tmpfileName,arg[tmpKey]);
	}
	//图表
	saveBase64AsPng(data.chart1,arg.chart);
	saveBase64AsPng(data.chart2,arg.chart1);
	saveBase64AsPng(data.chart3,arg.chart2);
	saveBase64AsPng(data.chart4,arg.chart3);
	saveBase64AsPng(data.chart5,arg.chart4);
	var docx=new DocxGen().attachModule(imageModule).load(content).setData(data);
	docx.render();
	var buffer= docx.getZip().generate({type:"nodebuffer"});
	var reportName ='report'+formatDateToString()+'.docx';
	var tmpPath = pathPrefix+reportName;
	fs.writeFile(tmpPath,buffer);
	//将报告路径返回回来
	event.sender.send('synchronous-reply',tmpPath);
});

/**
 * 上传文件解析
 * */

function to_json(workbook) {
	var result = {};
	workbook.SheetNames.forEach(function(sheetName) {
		var roa = X.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
		if(roa.length > 0){
			result[sheetName] = roa;
		}
	});
	return result;
}

//温度计算
/*ipcMain.on('wsdWinter-message', (event, arg) => {
 //前台传送的数据
 var wdcnStart=arg.wdcnStart;
 console.log("wdcnStart"+typeof(wdcnStart));
 var wdcnEnd=arg.wdcnEnd;
 var data = arg.data;
 //数据进行处理
 var wb = X.read(data, {type: 'binary'});
 var sheetName = wb.SheetNames[0];
 var worksheet = wb.Sheets[sheetName];
 var B=[];
 var C=[];
 //取B，C列
 for (var z in worksheet) {
 if(z[0] === '!') continue;
 //取B列
 if(_.startsWith(z,'B')) {
 //去首行-表头
 if(parseInt(_.trimStart(z,'B'))!=1){
 var tmp = {};
 tmp['key']=z;
 tmp['lineNum']=parseInt(_.trimStart(z,'B'));
 //顺便将时间处理
 tmp['value']=_.split(worksheet[z].w,' ',1)[0];
 B.push(tmp);
 }
 }
 //取C列
 if(_.startsWith(z,'C')){
 if(parseInt(_.trimStart(z,'C'))!=1){
 var tmp = {};
 tmp['key']=z;
 tmp['lineNum']=parseInt(_.trimStart(z,'C'));
 tmp['value']=worksheet[z].v;
 C.push(tmp);
 }
 }
 }
 //过滤B列
 var handleB=_.reject(B, function(n) {
 return moment(n.value)<moment(wdcnStart) || moment(n.value)>moment(wdcnEnd);
 });
 //过滤C列
 var handleC=_.reject(C, function(n) {
 return n.lineNum<_.minBy(handleB,'lineNum').lineNum|| n.lineNum>_.maxBy(handleB,'lineNum').lineNum;
 });
 var aveWinterTemperature = _.sumBy(handleC, 'value')/handleC.length;
 if(_.isNaN(aveWinterTemperature)) aveWinterTemperature=0;
 console.log('aveWinterTemperature:'+aveWinterTemperature);
 //输出反馈结果
 event.sender.send('wsdWinter-reply',_.round(aveWinterTemperature,1));
 });*/
//温度计算
ipcMain.on('wsdWinter-message', (event, arg) => {
	//前台传送的数据
	var wdcnStart=arg.wdcnStart;
	var wdcnEnd=arg.wdcnEnd;
	var data = arg.data;
	//数据进行处理
	var wb = X.read(data, {type: 'binary'});
	var sheetName = wb.SheetNames[0];
	var workbook = to_json(wb);
	var dataList =workbook[sheetName];
	var arrayNum=[];
	//取出列名字
	var tmpRow=dataList[0];
	var keyNames=_.keys(tmpRow);
	console.log('keyNames:'+keyNames);
	for(var i=0;i<dataList.length;i++){
		var rowItem = dataList[i];
		//日期范围内的温度就叠加
		if(moment(wdcnStart)<=moment(_.split(rowItem[keyNames[1]],' ',1)[0]) && moment(_.split(rowItem[keyNames[1]],' ',1)[0])<=moment(wdcnEnd)){
			arrayNum.push(parseFloat(rowItem[keyNames[2]]));
		}
		if( moment(_.split(rowItem[keyNames[1]],' ',1)[0])>moment(wdcnEnd)) break;
	}
	var aveWinterTemperature = arrayNum.reduce(function(pv, cv) { return pv + parseFloat(cv); }, 0)/arrayNum.length;
	if(_.isNaN(aveWinterTemperature)) aveWinterTemperature=0;
	console.log('aveWinterTemperature:'+aveWinterTemperature);
	//输出反馈结果
	event.sender.send('wsdWinter-reply',aveWinterTemperature);
});
//温度计算
ipcMain.on('wsdSummer-message', (event, arg) => {
	//前台传送的数据
	var wdktStart=arg.wdktStart;
	var wdktEnd=arg.wdktEnd;
	var data = arg.data;
	//数据进行处理
	var wb = X.read(data, {type: 'binary'});
	var sheetName = wb.SheetNames[0];
	var workbook = to_json(wb);
	var dataList =workbook[sheetName];
	var arrayNum=[];
	//取出列名字
	var tmpRow=dataList[0];
	var keyNames=_.keys(tmpRow);
	console.log('keyNames:'+keyNames);
	for(var i=0;i<dataList.length;i++){
		var rowItem = dataList[i];
		//日期范围内的温度就叠加
		if(moment(wdktStart)<=moment(_.split(rowItem[keyNames[1]],' ',1)[0]) && moment(_.split(rowItem[keyNames[1]],' ',1)[0])<=moment(wdktEnd)){
			arrayNum.push(parseFloat(rowItem[keyNames[2]]));
		}
		if( moment(_.split(rowItem[keyNames[1]],' ',1)[0])>moment(wdktEnd)) break;
	}
	var aveSummerTemperature  = arrayNum.reduce(function(pv, cv) { return pv + parseFloat(cv); }, 0)/arrayNum.length;
	if(_.isNaN(aveSummerTemperature)) aveSummerTemperature=0;
	console.log('aveSummerTemperature:'+aveSummerTemperature);
	//输出反馈结果
	event.sender.send('wsdSummer-reply',aveSummerTemperature);
});
//照度计算
ipcMain.on('aveLight-message', (event, arg) => {
	var zdzmStart=arg.zdzmStart;
	var zdzmEnd=arg.zdzmEnd;
	//工作日或者全周
	var workdayOrWeek =arg.workdayOrWeek;
	var timeStart=arg.timeStart;
	var timeEnd=arg.timeEnd;
	var data = arg.data;
	//解析excel
	var wb = X.read(data, {type: 'binary'});
	var sheetName = wb.SheetNames[0];
	var workbook = to_json(wb);
	var dataList =workbook[sheetName];
	var arrayNum=[];
	//取出列名字
	var tmpRow=dataList[0];
	var keyNames=_.keys(tmpRow);
	for(var i=0;i<dataList.length;i++){
		var rowItem = dataList[i];
		//是否过滤工作日
		if("工作日"==workdayOrWeek){
			if(moment(rowItem[keyNames[1]],'M/D/YY').day()!=0 && moment(rowItem[keyNames[1]],'M/D/YY').day()!=6){
				//指定日期范围--Excel 日期格式影响比较严重
				if(moment(zdzmStart)<=moment(rowItem[keyNames[1]],'M/D/YY') && moment( rowItem[keyNames[1]],'M/D/YY')<=moment(zdzmEnd) ){
					//判断是否指定日期
					if(moment(timeStart,'HH:mm:ss')<=moment(rowItem[keyNames[2]],'HH:mm:ss') && moment( rowItem[keyNames[2]],'HH:mm:ss')<=moment(timeEnd,'HH:mm:ss')){
						//判断值是否为NULL
						if("NULL"!=rowItem[keyNames[3]]){
							arrayNum.push(parseFloat(rowItem[keyNames[3]]));
						}
					}
				}
			}
		}else{
			//全周计算
			//指定日期范围--Excel 日期格式影响比较严重
			if(moment(zdzmStart)<=moment(rowItem[keyNames[1]],'M/D/YY') && moment( rowItem[keyNames[1]],'M/D/YY')<=moment(zdzmEnd) ){
				//判断是否指定日期
				if(moment(timeStart,'HH:mm:ss')<=moment(rowItem[keyNames[2]],'HH:mm:ss') && moment( rowItem[keyNames[2]],'HH:mm:ss')<=moment(timeEnd,'HH:mm:ss')){
					//判断值是否为NULL
					if("NULL"!=rowItem[keyNames[3]]){
						arrayNum.push(parseFloat(rowItem[keyNames[3]]));
					}
				}
			}
		}
		if(moment( rowItem[keyNames[1]],'M/D/YY')>moment(zdzmEnd))break;
	}
	var aveLightData = arrayNum.reduce(function(pv, cv) { return pv + parseFloat(cv); }, 0)/arrayNum.length;
	if(_.isNaN(aveLightData)) aveLightData=0;
	console.log('aveLightData-reply:'+aveLightData);
	event.sender.send('aveLightData-reply',aveLightData);
});
//满意度计算
function handleNaN(a){
	return _.isNaN(a)?0:a;
}
ipcMain.on('aveMyd-message', (event, arg) => {
	var data = arg;
	var wb = X.read(data, {type: 'binary'});
	var sheetName = wb.SheetNames[0];//取第一个sheet
	var workbook = to_json(wb);
	var dataList =workbook[sheetName];
	var arrayNum=[];
	//取出列名字
	var tmpRow=dataList[0];
	var keyNames=_.keys(tmpRow);
	console.log(keyNames);
	for(var i=0;i<dataList.length;i++){
		var rowItem = dataList[i];
		//满意度数据处理
		arrayNum.push(( handleNaN(parseFloat(rowItem[keyNames[3]]))+handleNaN(parseFloat(rowItem[keyNames[5]]))+handleNaN(parseFloat(rowItem[keyNames[6]]))+
			handleNaN(parseFloat(rowItem[keyNames[8]]))+handleNaN(parseFloat(rowItem[keyNames[10]]))+handleNaN(parseFloat(rowItem[keyNames[11]]))+
			handleNaN(parseFloat(rowItem[keyNames[13]]))+handleNaN(parseFloat(rowItem[keyNames[15]]))+handleNaN(parseFloat(rowItem[keyNames[17]]))+
			handleNaN(parseFloat(rowItem[keyNames[18]]))+handleNaN(parseFloat(rowItem[keyNames[19]]))+handleNaN(parseFloat(rowItem[keyNames[20]]))+
			handleNaN(parseFloat(rowItem[keyNames[21]]))+handleNaN(parseFloat(rowItem[keyNames[22]]))+handleNaN(parseFloat(rowItem[keyNames[23]]))+
			handleNaN(parseFloat(rowItem[keyNames[24]]))+handleNaN(parseFloat(rowItem[keyNames[25]])) )/17);
	}
	console.log('arrayNum.reduce(function(pv, cv) { return pv + parseFloat(cv); }, 0):'+arrayNum.reduce(function(pv, cv) { return pv + parseFloat(cv); }, 0));
	var aveMyd = arrayNum.reduce(function(pv, cv) { return pv + parseFloat(cv); }, 0)/arrayNum.length;
	if(_.isNaN(aveMyd)) aveMyd=0;
	event.sender.send('aveMyd-reply',aveMyd);
});

