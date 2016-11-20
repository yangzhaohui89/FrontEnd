/**
 * Created by yzh on 2016/8/29.
 */
//const {ipcRenderer} = require('electron');
function handleExcelData(tmp) {
    if (!tmp || isNaN(tmp)) {
        return 0;
    } else {
        return parseFloat(tmp);
    }
}
//判断是不是在几何区域内
function pointInPolygon(point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

    var x = point[0], y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
}
// 判断等级
function getDegree(piont,graph){
    var flag = true;
    for(i=0;i<graph.length && flag;i++){
        var polygon = graph[i];
        if(pointInPolygon(piont,polygon)){
            flag = false;
            return (i+1);
        }
    }
    if(flag){
        return "—";
    }
}
//判断最后一个图A,B,C
function isABC(x){
    if(_.isNumber(x)){
        switch (x){
            case 1:x="A";
                break;
            case 2:x="B";
                break;
            case 3:x="C";
                break;
            default:x="—";
                break;
        }
        return x;
    }else {
        return x;
    }
}
/*
//取对象keyName
function getKeyList(rowItem){
    var keyName = new Array();
    var index = 0;
    for (var key in rowItem) {
        keyName[index++]=key;
    }
    return keyName;
}
//单选取值方法
function get_radio_value( radioName ) {
    var radios = document.getElementsByName( radioName );
    for( var i = 0; i < radios.length; i++ ) {
        if( radios[i].checked || radios.length === 1 ) {
            return radios[i].value;
        }
    }
}
//记录时间处理方法2015-07-09 10:08:25
function handleDateTime(dateTime){
    var arr=dateTime.split(" ");
    return arr[0];
}
//对比日期的方法
function compareDate(a, b) {
    var arr = a.split("-");
    var starttime = new Date(arr[0], arr[1], arr[2]);
    var starttimes = starttime.getTime();

    var arrs = b.split("-");
    var lktime = new Date(arrs[0], arrs[1], arrs[2]);
    var lktimes = lktime.getTime();

    if (starttimes <= lktimes) {
        return true;
    }
    else
        return false;
}
//判断工作日--处理照度数据
function isWorkday(dateInput){
    var arr=dateInput.split("/");
    var dateType = new Date(arr[0], arr[1], arr[2]);
    if(dateType.getDay()!=0 && dateType.getDay()!=6){
        return true;
    } else {
        return false;
    }
}
//对比照度日期的方法
function compareLightDate(a, b) {
    var arr = a.split("/");
    var starttime = new Date(arr[0], arr[1], arr[2]);
    var starttimes = starttime.getTime();

    var arrs = b.split("/");
    var lktime = new Date(arrs[0], arrs[1], arrs[2]);
    var lktimes = lktime.getTime();

    if (starttimes <= lktimes) {
        return true;
    }
    else
        return false;
}
//对比照度时间的方法
function compareLightTime(t1,t2){
    var t1String = '1989/08/24 ' + t1;
    var t2String = '1989/08/24 ' + t2;
    var t1Time = new Date(t1String);
    var t2Time = new Date(t2String);
    if (t2Time>=t1Time) {
        return true;
    } else {
        return false;
    }
}
/!**
 * 上传文件解析
 * *!/
var X = XLSX;
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
function to_csv(workbook) {
    var result = [];
    workbook.SheetNames.forEach(function(sheetName) {
        var csv = X.utils.sheet_to_csv(workbook.Sheets[sheetName]);
        if(csv.length > 0){
            result.push("SHEET: " + sheetName);
            result.push("");
            result.push(csv);
        }
    });
    return result.join("\n");
}
function to_formulae(workbook) {
    var result = [];
    workbook.SheetNames.forEach(function(sheetName) {
        var formulae = X.utils.get_formulae(workbook.Sheets[sheetName]);
        if(formulae.length > 0){
            result.push("SHEET: " + sheetName);
            result.push("");
            result.push(formulae.join("\n"));
        }
    });
    return result.join("\n");
}
*/

$(function () {
    //监听上传按钮并保存数据
    //第一步按钮保存表单基础数据
    $("#step1").click(function(){
        //window.localStorage.setItem("info",info);
        //var temp =localStorage.getItem("info");
        //console.log(JSON.stringify());
        //建筑基础信息
        var projectName=$("#projectName").val();
        var jianZhuLeiXing = $("#jzlx option:selected").text();
        var qiHouFenQu = $("#qhfq option:selected").text();
        //jianZhuDiDian
        var province=$("#province option:selected").text();
        var city=$("#city option:selected").text();
        var county=$("#county option:selected").text();
        var jianChengNianDai=$("#jianChengNianDai").val();
        var zongJianZhuMianJi=$("#zongJianZhuMianJi").val();
        var jianZhuMianJi=$("#jianZhuMianJi").val();
        //jianZhuCengShu
        var up=$("#up").val();
        var down=$("#down").val();
        //能耗数据
        var zongNengHao=$("#zongNengHao").val();
        var caiNuanNengHao=$("#caiNuanNengHao").val();
        var kongTiaoNengHao=$("#kongTiaoNengHao").val();
        var zhaoMingNengHao=$("#zhaoMingNengHao").val();
        //保存本地存储
        //建筑基础信息
        window.localStorage.setItem("projectName",projectName);
        window.localStorage.setItem("jianZhuLeiXing",jianZhuLeiXing);
        window.localStorage.setItem("qiHouFenQu",qiHouFenQu);
        window.localStorage.setItem("province",province);
        window.localStorage.setItem("city",city);
        window.localStorage.setItem("county",county);
        window.localStorage.setItem("jianChengNianDai",jianChengNianDai);
        window.localStorage.setItem("zongJianZhuMianJi",zongJianZhuMianJi);
        window.localStorage.setItem("jianZhuMianJi",jianZhuMianJi);
        window.localStorage.setItem("up",up);
        window.localStorage.setItem("down",down);
        //能耗数据
        window.localStorage.setItem("zongNengHao",zongNengHao);
        window.localStorage.setItem("caiNuanNengHao",caiNuanNengHao);
        window.localStorage.setItem("kongTiaoNengHao",kongTiaoNengHao);
        window.localStorage.setItem("zhaoMingNengHao",zhaoMingNengHao);
        //loadDataFlag
        window.localStorage.setItem("loadPage1Flag","1");
    });

    //第二步按钮
    $("#step2").click(function(){
        var jianZhuMianJi 	=	parseFloat(window.localStorage.getItem("jianZhuMianJi"));
        //单位面积采暖能耗
        var dwmjcnnh=_.round(($("#dwmjcnnh").val()/jianZhuMianJi),1);
        //单位面积空调能耗
        var dwmjktnh=_.round(($("#dwmjktnh").val()/jianZhuMianJi),1);
        //单位面积照明能耗
        var dwmjzmhn=_.round(($("#dwmjzmhn").val()/jianZhuMianJi),1);
        //其他环境质量/其他能耗(Q/L)s评价
        //其他单位面积能耗
        var qtdwmjhn =_.round(($("#qtdwmjhn").val()/jianZhuMianJi),1);
        //单位面积总能耗
        var dwmjznh = _.round((dwmjcnnh + dwmjktnh + dwmjzmhn + qtdwmjhn),1);

        window.localStorage.setItem("nh1",$("#dwmjcnnh").val());
        window.localStorage.setItem("nh2",$("#dwmjktnh").val());
        window.localStorage.setItem("nh3",$("#dwmjzmhn").val());
        window.localStorage.setItem("nh4",$("#qtdwmjhn").val());

        //保存本地存储
        //室内温度/采暖能耗(Q/L)h评价
        //单位面积采暖能耗
        window.localStorage.setItem("dwmjcnnh",dwmjcnnh);
        //室内温度/空调能耗(Q/L)c评价
        //单位面积空调能耗
        window.localStorage.setItem("dwmjktnh",dwmjktnh);
        //室内照度/照明能耗(Q/L)i评价
        //工作日或者全周
        //单位面积照明能耗
        window.localStorage.setItem("dwmjzmhn",dwmjzmhn);
        //其他环境质量/其他能耗(Q/L)s评价
        //其他单位面积能耗
        window.localStorage.setItem("qtdwmjhn",qtdwmjhn);
        //单位面积总能耗
        window.localStorage.setItem("dwmjznh",dwmjznh);

        //excel 数据计算
        var aveWinterTemperature 	=	parseFloat(window.localStorage.getItem("aveWinterTemperature"));
        var aveSummerTemperature 	=	parseFloat(window.localStorage.getItem("aveSummerTemperature"));
        var aveLightData 	=	parseFloat(window.localStorage.getItem("aveLightData"));
        var aveMyd 	=	parseFloat(window.localStorage.getItem("aveMyd"));

        //处理图表等级
        //图一加权等级判断
        var graph1 =[
            [[26,42],[20,15],[20,0],[26,0]],
            [[26,49],[18,13],[18,0],[20,0],[20,15],[26,42]],
            [[26,50],[25.1,50],[17,13.5],[17,0],[18,0],[18,13],[26,49]],
            [[25.1,50],[17,13.5],[17,0],[16,0],[16,14],[24,50]],
            [[24,50],[16,14],[16,0],[15,0],[15,14.5],[22.9,50]],
            [[22.9,50],[15,14.5],[15,0],[14,0],[14,15],[21.8,50]],
            [[26,60],[14,60],[14,15],[21.8,50],[26,50]]
        ];
        var piont1 =[aveWinterTemperature, dwmjcnnh];
        console.log("图一数据"+aveWinterTemperature+"||"+dwmjcnnh);
        var resultTmp1 =getDegree(piont1,graph1);
        console.log("图一数据评级"+resultTmp1);
        window.localStorage.setItem("resultTmp1",resultTmp1);

        //图二数据处理
        var graph2 = [
            [[23,10],[25,10],[26,5],[26,0],[23,0]],
            [[23,15],[25,15],[27,5],[27,0],[26,0],[26,5],[25,10],[23,10]],
            [[23,17.5],[25,17.5],[27.5,5],[27,0],[27.5,0],[27,5],[25,15],[23,15]],
            [[23,20],[25,20],[28,5],[28,0], [27.5,0],[27.5,5],[25,17.5],[23,17.5]],
            [[23,22.5],[25,22.5],[29,2.5],[29,0],[28,0],[28,5],[25,20],[23,20]],
            [[23,25],[25,25],[29,5],[29,2.5],[25,22.5],[23,22.5]],
            [[23,30],[29,30],[29,5],[25,25],[23,25]]
        ];
        var piont2 =[aveSummerTemperature, dwmjktnh];
        var resultTmp2 =getDegree(piont2,graph2);
        window.localStorage.setItem("resultTmp2",resultTmp2);
        //图三数据处理
        var graph3=[
            [[460,8],[400,8],[300,5],[300,0],[460,0]],
            [[460,9],[400,9],[300,6],[300,5],[400,8],[460,8]],
            [[460,10],[400, 10],[250,5.5],[250,0],[300,0],[300,6],[400,9],[460,9]],
            [[460,11],[400,11],[250,6.5],[250,5.5], [400,10],[460,10]],
            [[460,12],[400,12],[200,6],[200,0],[250,0],[250,6.5],[400,11],[460,11]],
            [[460,13],[400,13],[200,7],[200,6],[400,12],[460,12]],
            [[460,15],[160,15],[160,0],[200,0],[200,7],[400,13],[460,13]]

        ];
        var piont3 =[aveLightData, dwmjzmhn];
        var resultTmp3 =getDegree(piont3,graph3);
        window.localStorage.setItem("resultTmp3",resultTmp3);
        //图四数据处理
        var graph4=[
            [[5,40],[2.5,0],[5,0]],
            [[4,40],[1.5,0],[2.5,0],[5,40]],
            [[3,40],[0.5,0],[1.5,0],[4,40]],
            [[2,40],[-0.5,0],[0.5,0],[3,40]],
            [[1,40],[-1.5,0],[-0.5,0],[2,40]],
            [[0,40],[-2.5,0],[-1.5,0],[1,40]],
            [[0,40],[-2.5,0],[-5,0],[-5,40]]

        ];
        var piont4 =[aveMyd, qtdwmjhn];
        var resultTmp4 =getDegree(piont4,graph4);
        window.localStorage.setItem("resultTmp4",resultTmp4);
        //图五数据处理
        var graph5=[
            [[1,100],[2,100],[4,60],[4,20],[1,20]],
            [[1,120],[2,120],[5,60],[5,20],[4,20],[4,60],[2,100],[1,100]],
            [[1,140],[2,140],[6,60],[6,20],[5,20],[5,60],[2,120],[1,120]]
        ];
        // 放到本地存储
        var result5X =(_.isNumber(resultTmp1)&&_.isNumber(resultTmp2)&&_.isNumber(resultTmp3)&&_.isNumber(resultTmp4))?_.round((0.4*resultTmp1+0.2*resultTmp2+0.1*resultTmp3+0.3*resultTmp4),1):'—';
        window.localStorage.setItem("result5X",result5X);
        if(_.isNumber(result5X)){
            var point5=[result5X,dwmjznh];
            var resultTmp =getDegree(point5,graph5);
            var resultTmp5=isABC(resultTmp);
            window.localStorage.setItem("resultTmp5",resultTmp5);
        }else {
            window.localStorage.setItem("resultTmp5",'—');
        }

        window.localStorage.setItem("loadPage2Flag","1");
    });

    //温湿度数据1
/*    $("#wsd1").change(function(e){
        //传输数据到main
        var wsdSummerDto={};

        //室内温度/采暖能耗(Q/L)h评价
        console.log("室内温度/采暖能耗(Q/L)h评价");
        var wdcnStart=$("#wdcnStart").val();
        var wdcnEnd=$("#wdcnEnd").val();

        var files = this.files;
        var f = files[0];
        var reader = new FileReader();
        reader.readAsBinaryString(f);
        reader.onload = function(e) {
            var data = e.target.result;

            //封装成对象传送
            wsdSummerDto.wdcnStart =wdcnStart;
            wsdSummerDto.wdcnEnd =wdcnEnd;
            wsdSummerDto.data =data;

            var aveWinterTemperature = ipcRenderer.sendSync('wsdSummer-message', wsdSummerDto);
            console.log('aveWinterTemperature:'+aveWinterTemperature);
            window.localStorage.setItem("aveWinterTemperature",aveWinterTemperature);
        }
    });*/
  /*  var finalResult = 0;
    function keep2piont(numberTmp){
        finalResult = parseFloat(finalResult) + parseFloat(numberTmp);
        alert(finalResult);
    }
    function handleWsd2(f,wdktStart,wdktEnd,callback){
        var reader = new FileReader();
        reader.readAsBinaryString(f);
        reader.onload = function(e) {
            var data = e.target.result;
            var wb = X.read(data, {type: 'binary'});
            var sheetName = wb.SheetNames[0];
            var workbook = to_json(wb);
            console.log(workbook[sheetName]);
            var dataList =workbook[sheetName];
            var sum=0;//求和
            var number=0;//计算个数
            //取出列名字
            var tmpRow=dataList[0];
            var keyNames=getKeyList(tmpRow);
            console.log(tmpRow[keyNames[0]]+"|"+tmpRow[keyNames[1]]+"|"+tmpRow[keyNames[2]]+"|"+tmpRow[keyNames[3]]);
            for(var i=0;i<dataList.length;i++){
                var rowItem = dataList[i];
                console.log(rowItem);
                console.log(rowItem[keyNames[2]]);
                //日期范围内的温度就叠加
                if(compareDate( wdktStart,handleDateTime(rowItem[keyNames[1]]) ) && compareDate( handleDateTime(rowItem[keyNames[1]]),wdktEnd )){
                    sum = sum + parseFloat(rowItem[keyNames[2]]);
                    number=number+1;
                }
            }
            var aveSummerTemperature = sum/number;
            callback(aveSummerTemperature.toFixed(1));
            console.log(aveSummerTemperature);
        }
    }
    //温湿度数据2
    $("#wsd2").change(function(e){
        //室内温度/空调能耗(Q/L)c评价
        console.log("室内温度/空调能耗(Q/L)c评价");
        var wdktStart=$("#wdktStart").val();
        var wdktEnd=$("#wdktEnd").val();
        //var wdktStart="2015-07-09";
        //var wdktEnd="2015-07-09";
        var wsd2Result=0;
        var files = this.files;
        for(var num=0;num<files.length;num++){
            var f = files[num];
            wsd2Result=wsd2Result+handleWsd2(f,wdktStart,wdktEnd,keep2piont);
            //window.localStorage.setItem("aveSummerTemperature",aveSummerTemperature.toFixed(1));
        };
        console.log("wsd2Result"+wsd2Result);
    });*/
    //照度数据--逻辑需要进一步处理
    /*$("#zdsj").change(function(e){
        //室内照度/照明能耗(Q/L)i评价
        console.log("/室内照度/照明能耗(Q/L)i评价");
        var zdzmStart=$("#zdzmStart").val();
        var zdzmEnd=$("#zdzmEnd").val();
        //工作日或者全周
        var workdayOrWeek =get_radio_value("workdayOrWeek");
        var timeStart=$("#timeStart").val();
        var timeEnd=$("#timeEnd").val();
        //var zdzmStart="2015/07/07";
        //var zdzmEnd="2015/07/17";
        //var timeStart="13:20:00";
        //var timeEnd="16:40:00";

        var files = this.files;
        var f = files[0];
        var reader = new FileReader();
        reader.readAsBinaryString(f);
        reader.onload = function(e) {
            var data = e.target.result;
            var wb = X.read(data, {type: 'binary'});
            var sheetName = wb.SheetNames[0];
            var workbook = to_json(wb);
            console.log(workbook[sheetName]);
            var dataList =workbook[sheetName];
            var sum=0;//求和
            var number=0;//计算个数
            //取出列名字
            var tmpRow=dataList[0];
            var keyNames=getKeyList(tmpRow);
            console.log(tmpRow[keyNames[0]]+"|"+tmpRow[keyNames[1]]+"|"+tmpRow[keyNames[2]]+"|"+tmpRow[keyNames[3]]);
            for(var i=0;i<dataList.length;i++){
                var rowItem = dataList[i];
                console.log(rowItem[keyNames[3]]);
                //是否过滤工作日
                if("工作日"==workdayOrWeek){
                    if(isWorkday(rowItem[keyNames[1]])){
                        //指定日期范围--Excel 日期格式影响比较严重
                        if(compareLightDate( zdzmStart,rowItem[keyNames[1]]) && compareLightDate( rowItem[keyNames[1]],zdzmEnd )){
                            //判断是否指定日期
                            if(compareLightTime( timeStart,rowItem[keyNames[2]]) && compareLightTime( rowItem[keyNames[2]],timeEnd )){
                                //判断值是否为NULL
                                if("NULL"!=rowItem[keyNames[3]]){
                                    sum = sum + parseFloat(rowItem[keyNames[3]]);
                                    number=number+1;
                                }
                            }
                        }
                    }
                }else{
                    //全周计算
                    //指定日期范围
                    if(compareLightDate( zdzmStart,rowItem[keyNames[1]]) && compareLightDate( rowItem[keyNames[1]],zdzmEnd )){
                        //判断是否指定日期
                        if(compareLightTime( timeStart,rowItem[keyNames[2]]) && compareLightTime( rowItem[keyNames[2]],timeEnd )){
                            //判断值是否为NULL
                            if("NULL"!=rowItem[keyNames[3]]){
                                sum = sum + parseFloat(rowItem[keyNames[3]]);
                                number=number+1;
                            }
                        }
                    }
                }
            }
            var aveLightData = sum/number;
            console.log(sum+"|"+number+"|"+aveLightData);
            window.localStorage.setItem("aveLightData",aveLightData.toFixed(1));
        };
    });*/
    //满意度数据
/*    $("#mydsj").change(function(e){
        console.log("满意度数据");
        var files = this.files;
        var f = files[0];
        var reader = new FileReader();
        reader.readAsBinaryString(f);
        reader.onload = function(e) {
            var data = e.target.result;
            var wb = X.read(data, {type: 'binary'});
            var sheetName = wb.SheetNames[0];//取第一个sheet
            var workbook = to_json(wb);
            console.log(workbook[sheetName]);
            var dataList =workbook[sheetName];
            var sum=0;//求和
            var number=0;//计算个数
            //取出列名字
            var tmpRow=dataList[0];
            var keyNames=getKeyList(tmpRow);
            console.log(tmpRow);
            console.log(tmpRow[keyNames[0]]+"|"+tmpRow[keyNames[1]]+"|"+tmpRow[keyNames[2]]+"|"+tmpRow[keyNames[3]]);
            for(var i=0;i<dataList.length;i++){
                var rowItem = dataList[i];
                console.log(rowItem);
                console.log(rowItem[keyNames[2]]);
                //满意度数据处理
                sum = sum +( parseFloat(rowItem[keyNames[3]])+parseFloat(rowItem[keyNames[5]])+parseFloat(rowItem[keyNames[6]])+
                             parseFloat(rowItem[keyNames[8]])+parseFloat(rowItem[keyNames[10]])+parseFloat(rowItem[keyNames[11]])+
                             parseFloat(rowItem[keyNames[13]])+parseFloat(rowItem[keyNames[15]])+parseFloat(rowItem[keyNames[17]])+
                             parseFloat(rowItem[keyNames[18]])+parseFloat(rowItem[keyNames[19]])+parseFloat(rowItem[keyNames[20]])+
                             parseFloat(rowItem[keyNames[21]])+parseFloat(rowItem[keyNames[22]])+parseFloat(rowItem[keyNames[23]])+
                             parseFloat(rowItem[keyNames[24]])+parseFloat(rowItem[keyNames[25]]) )/17;
                number=number+1;
            }
            var aveMyd = sum/number;
            console.log(aveMyd);
            window.localStorage.setItem("aveMyd",aveMyd.toFixed(1));
        };
    });*/
});
