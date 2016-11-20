/**
 * Created by hxgqh on 16/8/27.
 * 本文件定义了跟后台的接口
 */

var FileKeys = {
	WenShiDuCeDian: 1,
	ZhaoDuCeDian: 2
};

/*const electron = require('electron');
const ipcRenderer = electron['ipcRenderer'];*/

function Api(){
	this.project = {};	// 保存项目的数据
}

// ====== 存储数据的接口 ======

/**
 * @Deprecated 上传文件
 * @param key 支持的文件的key，例如key = FileKeys.WenShiDuCeDian
 * @returns {Promise} 注意：返回的结果为文件保存的名称，路径等信息，格式如下：
 * {
 * 		fileName: 'xxx.xlsx',
 * 		filePath: 'C:\Windows32\'
 * }
 */
Api.prototype.uploadFile = function(key){
	return new Promise(function(resolve, reject){

	});
};

/**
 * 保存建筑基本信息
 * @param info，格式为：
 * {
 * 		jianZhuLeiXing: '机关办公建筑',
 * 		qiHouFenQu: '寒冷地区',
 * 		jianZhuDiDian: {
 * 				province: '北京',
 	* 			city: '北京',
 	* 		  county: '朝阳'
 * 	  },
 * 	  jianChengNianDai: 1989,
 * 	  zongJianZhuMianJi: 230,
 * 	  jianZhuMianJi: 220,
 * 	  jianZhuCengShu: {
 * 	  		up: 21,
 * 	  	  down: 3
 * 	  }
 * }
 */
Api.prototype.storeBasicInfo = function(info){
	ipcRenderer.send('basicInfo', info);
};

/**
 * 存储能耗总数据来源
 * @param nengHao 格式为：
 * {
 * 		zongNengHao: 100,
 * 		caiNuanNengHao: 10,
 *		kongTiaoNengHao: 30,
 *		zhaoMingNengHao: 60
 * }
 */
Api.prototype.storeNengHaoData = function(nengHao){
	ipcRenderer.send('nengHaoData', nengHao);
};

/**
 * 室内温度/采暖能耗(Q/L)h评价
 * @param data 格式为：{
 *
 * }
 */
Api.prototype.storeShiNeiWenduAndCaiNuan = function(data){
	ipcRenderer.send('shiNeiWenduAndCaiNuan', data);
};

/**
 * 室内温度/空调能耗(Q/L)c评价
 * @param data 格式为：
 */
Api.prototype.storeShiNeiWenduAndKongTiao = function(data){
	ipcRenderer.send('shiNeiWenduAndKongTiao', data);
};

/**
 * 室内照度/照明能耗(Q/L)i评价
 * @param data 格式为：
 */
Api.prototype.storeShiNeiWenduAndZhaoMing = function(data){
	ipcRenderer.send('shiNeiWenduAndZhaoMing', data);
};

/**
 * 其他环境质量/其他能耗(Q/L)s评价
 * @param data 格式为：
 */
Api.prototype.storeOtherZhiLiangAndNengHao = function(data){
	ipcRenderer.send('otherZhiLiangAndNengHao', data);
};


// ====== 获取图数据的接口 ======

/**
 * 下载Word报告. 前台向后台发送消息：downloadDocx；后台生成完报告之后，向前台发送消息
 */
Api.prototype.downloadDocx = function(){

};

/**
 * 室内温度/采暖能耗(Q/L)h评价
 * @return {object} 如下格式的对象：
 * [
 * 	{
 * 		x: 10
 * 	 	y: 20
 * 	}
 * ]
 */
Api.prototype.getShiNeiWenDuAndCaiNuanData = function(){
	return [{x:10, y:20}];
};

/**
 * 室内温度/空调能耗(Q/L)c评价
 * @return {object} 如下格式的对象：
 * [
 * 	{
 * 		x: 10
 * 	 	y: 20
 * 	}
 * ]
 */
Api.prototype.getShiNeiWenDuAndCaiNuanData = function(){
	return [{x:10, y:20}];
};

/**
 * 室内照度/照明能耗(Q/L)i评价
 * @return {object} 如下格式的对象：
 * [
 * 	{
 * 		x: 10
 * 	 	y: 20
 * 	}
 * ]
 */
Api.prototype.getShiNeiWenDuAndCaiNuanData = function(){
	return [{x:10, y:20}];
};

/**
 * 其他环境质量/其他能耗(Q/L)s评价
 * @return {object} 如下格式的对象：
 * [
 * 	{
 * 		x: 10
 * 	 	y: 20
 * 	}
 * ]
 */
Api.prototype.getShiNeiWenDuAndCaiNuanData = function(){
	return [{x:10, y:20}];
};

/**
 * 环境能源效率/总能耗(Q/L)评价
 * @return {object} 如下格式的对象：
 * [
 * 	{
 * 		x: 10
 * 	 	y: 20
 * 	}
 * ]
 */
Api.prototype.getShiNeiWenDuAndCaiNuanData = function(){
	return [{x:10, y:20}];
};

/**
 * 环境能源效率综合量化评价报告
 * @return {object} 如下格式的对象：
 * {
 *
 * }
 */
Api.prototype.getReportData = function(){
	return {};
};

// ====== 计算所在区域的Api ======

/**
 * 计算两点间的距离
 * @param p1
 * @param p2
 */
var calcPointDistance = function(p1, p2){
	return Math.sqrt((p2[0] - p1[0])*(p2[0] - p1[0]) + (p2[1] - p1[1])*(p2[1] - p1[1]));
};

/**
 * 计算两条平行直线的距离
 * @param l1
 * @param l2
 */
var calcLineDistance = function(l1, l2){
	if(l1[0][1] == l1[1][1]){	// 平行于X轴
		return Math.abs(l2[0][1] - l1[0][1]);
	}
	else if(l1[0][0] == l1[1][0]){	// 平行于y轴
		return Math.abs(l2[0][0] - l1[0][0]);
	}
	else{	// y=kx+b1, y=kx+b2
		var k = (l1[1][1] - l1[0][1])/(l1[1][0] - l1[0][0]);	// 斜率
		var b1 = l1[0][1] - k*l1[0][0];
		var b2 = l2[0][1] - k*l2[0][0];
		return Math.abs(b2 - b1)/Math.sqrt(k*k + 1);
	}
};

/**
 * 计算点和线的距离
 * 直线公式：y = kx + b
 */
var calcPoint2LineDistance = function(p, l){
	if(l[0][1] == l[1][1]){	// l平行于x轴
		return Math.abs(p[1] - l[0][1]);
	}
	else if(l[0][0] == l[1][0]){	// l平行于y轴
		return Math.abs(p[0] - l[0][0]);
	}
	else{	// 直线公式
		var k = (l[1][1] - l[0][1])/(l[1][0] - l[0][0]);	// 斜率
		var b = l[0][1] - k*l[0][0];
		return Math.abs(-k*p[0] + p[1] + b)/Math.sqrt(k*k + 1);
	}
};

/**
 * 判断一个数组是否已经按照顺序排序
 * @param array
 * @param order - 可以为'asc'或者'desc'。asc为升序，desc为降序。
 */
var isArrayInOrder = function(array, order){
	var flag = true;
	if(order ==='asc'){
		for(var i=0;i<array.length - 1;i++){
			if(array[i+1] < array[i]){
				flag = false;
				break;
			}
		}
	}
	else{
		for(var i=0;i<array.length - 1;i++){
			if(array[i+1] > array[i]){
				flag = false;
				break;
			}
		}
	}

	return flag;
};

/**
 * 判断是会否在左上角的区域
 * @param point
 * @param lines
 */
var isInArea1 = function(point, lines){
	var distanceSumList = _.map(lines, function(line){
		return _.sum(_.map(line, function(p){
			return calcPointDistance(p, point);
		}));
	});

	return isArrayInOrder(distanceSumList, 'asc');
};

/**
 * 判断是否在两条折线之间。当一个点，与两个折线的对应线段之间的距离之和为对应线段之间的距离时，则在折线间区域内。
 * @param point
 * @param lines
 */
var isBetweenAreas = function(point, lines){
	var result = false;
	var delta = 0.000000001;
	for(var i=0;i<lines.length - 1;i++){
		var l1 = lines[i];
		var l2 = lines[i + 1];
		if(Math.abs(calcPoint2LineDistance(point, l1) + calcPoint2LineDistance(point, l2) - calcLineDistance(l1, l2)) < delta){
			result = true;
			break;
		}
	}

	return result;
};

/**
 * 当在两条折线之间时，返回这两条折线的index
 * @param point
 * @param lines
 * @return {Array} - 形如[2, 3]的数组
 */
var getBetweenAreaLineIndexes = function(point, lines){
	var result = [];
	var delta = 0.000000001;
	for(var i=0;i<lines.length - 1;i++){
		var l1 = lines[i];
		var l2 = lines[i + 1];
		if(Math.abs(calcPoint2LineDistance(point, l1) + calcPoint2LineDistance(point, l2) - calcLineDistance(l1, l2)) < delta){
			result = [i, i+1];
			break;
		}
	}
	return result;
};

/**
 * 返回某条折线的所有线段
 * @param points
 * @return {Array} - 形如[[[x1, y2], [x2, y2]], [[x2, y2], [x3, y3]]]
 */
var getLines = function(points){
	var lines = [];
	for(var i=0;i<points.length - 1;i++){
		lines.push(
			[points[i], points[i+1]]
		);
	}

	return lines;
};

/**
 * @desc 计算所在区域
 * @param {array} point - 形如[x, y]的点坐标
 * @param {array} points - 形如[[[x11, y11], [x12, y12], [x13, y13]], [[x21, y21], [x22, y22], [x23, y23]], [...]]
 * 												注意：所有的折线，点的数量数必须相同。不相同的情况下，补充折线的点。
 * @return {number} 区域的数字
 */
Api.prototype.getArea = function(point, points){
	var lines = getLines(points);

	if(isInArea1(point, lines)){	// 左上角的区域
		return 1;
	}
	else if(isBetweenAreas(point, lines)){
		return getBetweenAreaLineIndexes(point, lines)[1];
	}
	else{
		return lines.length + 1;	// 右下角的区域
	}
};

/**
 * @todo: 下载docx文档
 */
Api.prototype.downloadDocx = function(){
	// 先将前台的数据发送给后台

	// 然后根据后台的消息，下载链接
};

