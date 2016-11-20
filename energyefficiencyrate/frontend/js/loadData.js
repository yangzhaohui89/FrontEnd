const {ipcRenderer} = require('electron');
$(function (){
    //第一页数据信息
    //建筑外观图片
    var jzwgNum =  parseInt(window.localStorage.getItem("jzwgNum"));
    for(i=0;i<jzwgNum;i++){
        var tmpKey = "jzwg"+(i+1);
        var tmpImage =  window.localStorage.getItem(tmpKey);
        $("#"+tmpKey).html('<img src="' + tmpImage +'" alt="" />');
    }
    //典型平面
    var dxpmNum =  parseInt(window.localStorage.getItem("dxpmNum"));
    for(i=0;i<dxpmNum;i++){
        var tmpKey = "dxpm"+(i+1);
        var tmpImage =  window.localStorage.getItem(tmpKey);
        $("#"+tmpKey).html('<img src="' + tmpImage +'" alt="" />');
    }

    //温湿度测点(多幅图片)
    var cdtNum =  parseInt(window.localStorage.getItem("cdtNum"));
    for(i=0;i<cdtNum;i++){
        var tmpKey = "cdt"+(i+1);
        var tmpImage =  window.localStorage.getItem(tmpKey);
        $("#"+tmpKey).html('<img src="' + tmpImage +'" alt="" />');
    }
    //建筑基础信息
    var projectName=window.localStorage.getItem("projectName");
    var jianZhuLeiXing=window.localStorage.getItem("jianZhuLeiXing");
    var qiHouFenQu=window.localStorage.getItem("qiHouFenQu");
    var province=window.localStorage.getItem("province");
    var city=window.localStorage.getItem("city");
    var county=window.localStorage.getItem("county");
    var jianChengNianDai=window.localStorage.getItem("jianChengNianDai");
    var zongJianZhuMianJi=window.localStorage.getItem("zongJianZhuMianJi");
    var jianZhuMianJi=window.localStorage.getItem("jianZhuMianJi");
    var up=window.localStorage.getItem("up");
    var down=window.localStorage.getItem("down");
    //能耗数据
    var zongNengHao	=window.localStorage.getItem("zongNengHao");
    var caiNuanNengHao	=window.localStorage.getItem("caiNuanNengHao");
    var kongTiaoNengHao	=window.localStorage.getItem("kongTiaoNengHao");
    var zhaoMingNengHao	=window.localStorage.getItem("zhaoMingNengHao");
    // 页面赋值
    $("#projectName").html(projectName);
    $("#jzlx").html(jianZhuLeiXing);
    $("#qhfq").html(qiHouFenQu);
    $("#province").html(province);
    $("#city").html(city);
    $("#county").html(county);
    $("#jianChengNianDai").html(jianChengNianDai);
    $("#zongJianZhuMianJi").html(zongJianZhuMianJi);
    $("#jianZhuMianJi").html(jianZhuMianJi);
    $("#up").html(up);
    $("#down").html(down);
    $("#zongNengHao").html(zongNengHao);
    $("#caiNuanNengHao").html(caiNuanNengHao);
    $("#kongTiaoNengHao").html(kongTiaoNengHao);
    $("#zhaoMingNengHao").html(zhaoMingNengHao);

    //第二页数据信息
    //室内温度/采暖能耗(Q/L)h评价
    //单位面积采暖能耗
    var dwmjcnnh = parseFloat(window.localStorage.getItem("dwmjcnnh"));
    //室内温度/空调能耗(Q/L)c评价
    //单位面积空调能耗
    var dwmjktnh = parseFloat(window.localStorage.getItem("dwmjktnh"));
    //室内照度/照明能耗(Q/L)i评价
    //单位面积照明能耗
    var dwmjzmhn = parseFloat(window.localStorage.getItem("dwmjzmhn"));
    //其他环境质量/其他能耗(Q/L)s评价
    //其他单位面积能耗
    var qtdwmjhn = parseFloat(window.localStorage.getItem("qtdwmjhn"));
    //单位面积总耗能
    var dwmjznh =	parseFloat(window.localStorage.getItem("dwmjznh"));

    //excel 数据计算
    var aveWinterTemperature = parseFloat(window.localStorage.getItem("aveWinterTemperature"));
    var aveSummerTemperature = parseFloat(window.localStorage.getItem("aveSummerTemperature"));
    var aveLightData = parseFloat(window.localStorage.getItem("aveLightData"));
    var aveMyd = parseFloat(window.localStorage.getItem("aveMyd"));

    //能耗数据
    $("#dwmjcnnh").html(dwmjcnnh);
    $("#dwmjktnh").html(dwmjktnh);
    $("#dwmjzmhn").html(dwmjzmhn);
    $("#qtdwmjhn").html(qtdwmjhn);
    $("#dwmjznh").html(dwmjznh);
    //excel数据
    $("#aveWinterTemperature").html(aveWinterTemperature);
    $("#aveSummerTemperature").html(aveSummerTemperature);
    $("#aveLightData").html(aveLightData);
    $("#aveMyd").html(aveMyd);

    function handleGrade(dataString){
        var tmp = parseInt(dataString);
        if(_.isNaN(tmp)){
            return dataString;
        } else {
            return dataString+"级";
        }
    }
    //评级结果
    var resultTmp1 	=	handleGrade(window.localStorage.getItem("resultTmp1"));
    var resultTmp2 	=	handleGrade(window.localStorage.getItem("resultTmp2"));
    var resultTmp3 	=	handleGrade(window.localStorage.getItem("resultTmp3"));
    var resultTmp4 	=	handleGrade(window.localStorage.getItem("resultTmp4"));
    var result5X 	=	handleGrade(window.localStorage.getItem("result5X"));
    var resultTmp5 	=	handleGrade(window.localStorage.getItem("resultTmp5"));

    $("#resultTmp1").html(resultTmp1);
    $("#resultTmp2").html(resultTmp2);
    $("#resultTmp3").html(resultTmp3);
    $("#resultTmp4").html(resultTmp4);
    $("#result5X").html(result5X);
    $("#resultTmp5").html(resultTmp5);


    //图表数据
    var container = $("#container").highcharts();
    var container1 = $("#container1").highcharts();
    var container2 = $("#container2").highcharts();
    var container3 = $("#container3").highcharts();
    var container4 = $("#container4").highcharts();


    //数据传输
    var dataTrans ={};
    //第一页数据
    dataTrans.projectName	=	projectName	;
    dataTrans.jianZhuLeiXing	=	jianZhuLeiXing	;
    dataTrans.qiHouFenQu	=	qiHouFenQu	;
    dataTrans.province	=	province	;
    dataTrans.city	=	city	;
    dataTrans.county	=	county	;
    dataTrans.jianChengNianDai	=	jianChengNianDai	;
    dataTrans.zongJianZhuMianJi	=	zongJianZhuMianJi	;
    dataTrans.jianZhuMianJi	=	jianZhuMianJi	;
    dataTrans.up	=	up	;
    dataTrans.down	=	down	;

    dataTrans.zongNengHao	=	zongNengHao	;
    dataTrans.caiNuanNengHao	=	caiNuanNengHao	;
    dataTrans.kongTiaoNengHao	=	kongTiaoNengHao	;
    dataTrans.zhaoMingNengHao	=	zhaoMingNengHao	;
    //第二页数据
    dataTrans.dwmjcnnh	=	dwmjcnnh	;
    dataTrans.dwmjktnh	=	dwmjktnh	;
    dataTrans.dwmjzmhn	=	dwmjzmhn	;
    dataTrans.qtdwmjhn	=	qtdwmjhn	;
    dataTrans.dwmjznh	=	dwmjznh	;
    dataTrans.aveWinterTemperature	=	aveWinterTemperature	;
    dataTrans.aveSummerTemperature	=	aveSummerTemperature	;
    dataTrans.aveLightData	=	aveLightData	;
    dataTrans.aveMyd	=	aveMyd	;
    //评级数据
    dataTrans.resultTmp1	=	resultTmp1	;
    dataTrans.resultTmp2	=	resultTmp2	;
    dataTrans.resultTmp3	=	resultTmp3	;
    dataTrans.resultTmp4	=	resultTmp4	;
    dataTrans.result5X	=	result5X	;
    dataTrans.resultTmp5	=	resultTmp5	;
    //图片数据
    //建筑外观
    var jzwgNum =  parseInt(window.localStorage.getItem("jzwgNum"));
    for(i=0;i<jzwgNum;i++){
        var tmpKey = "jzwg"+(i+1);
        var tmpImage =  window.localStorage.getItem(tmpKey);
        dataTrans[tmpKey] =tmpImage;
    }
    //存储照片宽长比
    for(i=0;i<jzwgNum;i++){
        var tmpKey = "jzwgRatio"+(i+1);
        var tmpImage =  window.localStorage.getItem(tmpKey);
        dataTrans[tmpKey] =tmpImage;
    }

    dataTrans.jzwgNum	=	jzwgNum	;
    //典型平面
    var dxpmNum =  parseInt(window.localStorage.getItem("dxpmNum"));
    for(i=0;i<dxpmNum;i++){
        var tmpKey = "dxpm"+(i+1);
        var tmpImage =  window.localStorage.getItem(tmpKey);
        dataTrans[tmpKey] =tmpImage;
    }
    //存储照片宽长比
    for(i=0;i<dxpmNum;i++){
        var tmpKey = "dxpmRatio"+(i+1);
        var tmpImage =  window.localStorage.getItem(tmpKey);
        dataTrans[tmpKey] =tmpImage;
    }
    dataTrans.dxpmNum	=	dxpmNum	;
    //多个位置图
    //温湿度测点(多幅图片)
    var cdtNum =  parseInt(window.localStorage.getItem("cdtNum"));
    for(i=0;i<cdtNum;i++){
        var tmpKey = "cdt"+(i+1);
        var tmpImage =  window.localStorage.getItem(tmpKey);
        dataTrans[tmpKey] =tmpImage;
    }
    //存储照片宽长比
    for(i=0;i<cdtNum;i++){
        var tmpKey = "cdtRatio"+(i+1);
        var tmpImage =  window.localStorage.getItem(tmpKey);
        dataTrans[tmpKey] =tmpImage;
    }
    //位置图数量
    dataTrans.cdtNum	=	cdtNum	;
    //图表图片
    var svg_container = container.getSVG();
    var svg_container1 = container1.getSVG();
    var svg_container2 = container2.getSVG();
    var svg_container3 = container3.getSVG();
    var svg_container4 = container4.getSVG();
    //图表
    $('#hiddenContainer').html(svg_container);
    var chart=document.getElementById("hiddenContainer").getElementsByTagName("svg")[0];
    svgAsPngUri(chart, {}, function(uri) {
        dataTrans.chart = uri;
    });
    //图表1
    $('#hiddenContainer1').html(svg_container1);
    var chart1=document.getElementById("hiddenContainer1").getElementsByTagName("svg")[0];
    svgAsPngUri(chart1, {}, function(uri) {
        dataTrans.chart1 = uri;
    });
    //图表2
    $('#hiddenContainer2').html(svg_container2);
    var chart2=document.getElementById("hiddenContainer2").getElementsByTagName("svg")[0];
    svgAsPngUri(chart2, {}, function(uri) {
        dataTrans.chart2 = uri;
    });
    //图表3
    $('#hiddenContainer3').html(svg_container3);
    var chart3=document.getElementById("hiddenContainer3").getElementsByTagName("svg")[0];
    svgAsPngUri(chart3, {}, function(uri) {
        dataTrans.chart3 = uri;
    });
    //图表4
    $('#hiddenContainer4').html(svg_container4);
    var chart4=document.getElementById("hiddenContainer4").getElementsByTagName("svg")[0];
    svgAsPngUri(chart4, {}, function(uri) {
        dataTrans.chart4 = uri;
    });

    $('#clickFunc').click(function(){
        ipcRenderer.send('synchronous-message', dataTrans);
        //获取数据
        ipcRenderer.on('synchronous-reply', (event, arg) => {
            $('#myModal .modal-body').html('<a href="'+arg+'">'+"报告"+'</a>');
            $('#myModal').modal('show');
        });
    });
});
