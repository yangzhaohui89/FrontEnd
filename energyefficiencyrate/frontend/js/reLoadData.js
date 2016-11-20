/**
 * Created by yzh on 2016/9/28.
 */
$(function(){
    var loadPage1Flag =  window.localStorage.getItem("loadPage1Flag");
    var loadPage2Flag =  window.localStorage.getItem("loadPage2Flag");
    var tmp = _.last(_.split(window.location.pathname, '/'));
    console.log(tmp);

    //加载第一页数据
    if(loadPage1Flag =="1" && tmp =="1.html"){
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

        //建筑基础信息
        $("#projectName").val(projectName);
        $("#jzlx").find("option[text="+jianZhuLeiXing+"]").attr("selected",true);
        $("#jzlx option:selected").text(jianZhuLeiXing);
        $("#qhfq").find("option[text="+qiHouFenQu+"]").attr("selected",true);
        $("#qhfq option:selected").text(qiHouFenQu);
        new PCAS("province","city","county",province,city,county);
        $("#jianChengNianDai").val(jianChengNianDai);
        $("#zongJianZhuMianJi").val(zongJianZhuMianJi);
        $("#jianZhuMianJi").val(jianZhuMianJi);
        //jianZhuCengShu
        $("#up").val(up);
        $("#down").val(down);
        //能耗数据
        $("#zongNengHao").val(zongNengHao);
        $("#caiNuanNengHao").val(caiNuanNengHao);
        $("#kongTiaoNengHao").val(kongTiaoNengHao);
        $("#zhaoMingNengHao").val(zhaoMingNengHao);

    }
    //加载第二页数据
    if(loadPage2Flag =="1" && tmp =="2.html"){
        //能耗数据
        var nh1 = window.localStorage.getItem("nh1");
        var nh2 = window.localStorage.getItem("nh2");
        var nh3 = window.localStorage.getItem("nh3");
        var nh4 = window.localStorage.getItem("nh4");

        $("#dwmjcnnh").val(nh1);
        $("#dwmjktnh").val(nh2);
        $("#dwmjzmhn").val(nh3);
        $("#qtdwmjhn").val(nh4);

        //采暖
        var wdcnStart=window.localStorage.getItem("wdcnStart");
        var wdcnEnd=window.localStorage.getItem("wdcnEnd");
        //空调
        var wdktStart=window.localStorage.getItem("wdktStart");
        var wdktEnd=window.localStorage.getItem("wdktEnd");
        //照度
        var zdzmStart=window.localStorage.getItem("zdzmStart");
        var zdzmEnd=window.localStorage.getItem("zdzmEnd");
        //工作日或者全周
        var workdayOrWeek=window.localStorage.getItem("workdayOrWeek");
        var timeStart=window.localStorage.getItem("timeStart");
        var timeEnd=window.localStorage.getItem("timeEnd");

        $("#wdcnStart").val(wdcnStart);
        $("#wdcnEnd").val(wdcnEnd);
        $("#wdktStart").val(wdktStart);
        $("#wdktEnd").val(wdktEnd);
        $("#zdzmStart").val(zdzmStart);
        $("#zdzmEnd").val(zdzmEnd);
        $("input[type=radio][name=workdayOrWeek][value="+workdayOrWeek+"]").attr("checked",'checked')
        $("#timeStart").val(timeStart);
        $("#timeEnd").val(timeEnd);

    }
});