function handleExcelData(tmp) {
	if (!tmp || isNaN(tmp)) {
		return 0;
	} else {
		return parseFloat(tmp);
	}
}
function getMin(a, b) {
	if (a < b && a >= 1) {
		return a;
	} else {
		return b;
	}
}
$(function () {
	//test
	function resetContainer(name) {
		//var divWidth = $('#').width();
		//var divHeight = $('#' + name).height() / 4 * 2;

		//$('#' + name).css({'height': divWidth});
		//if (divWidth > divHeight) {
		//	if (divHeight <= 0) {
		//		$('#' + name).css({'height': divWidth});
		//	} else {
		//		$('#' + name).css({'width': divHeight});
		//	}
		//} else if (divWidth < divHeight) {
		//	if (divWidth <= 0) {
		//		$('#' + name).css({'width': divHeight});
		//	} else {
		//		$('#' + name).css({'height': divWidth});
		//	}
		//}
		$('#'+name).css('width', $(window).width()/2);
		$('#'+name).css('height', $(window).width()/2 - 47);
	}
	function resetContainer1(name) {
		//var divWidth = $('#').width();
		//var divHeight = $('#' + name).height() / 4 * 2;

		//$('#' + name).css({'height': divWidth});
		//if (divWidth > divHeight) {
		//	if (divHeight <= 0) {
		//		$('#' + name).css({'height': divWidth});
		//	} else {
		//		$('#' + name).css({'width': divHeight});
		//	}
		//} else if (divWidth < divHeight) {
		//	if (divWidth <= 0) {
		//		$('#' + name).css({'width': divHeight});
		//	} else {
		//		$('#' + name).css({'height': divWidth});
		//	}
		//}
		$('#'+name).css('width', $(window).width()/3);
		$('#'+name).css('height', $(window).width()/3 - 47);
	}

	resetContainer("container");
	resetContainer("container1");
	resetContainer("container2");
	resetContainer("container3");
	resetContainer("container4");

	resetContainer1("container01");
	resetContainer1("container11");
	resetContainer1("container22");
	resetContainer1("container33");
	resetContainer1("container44");

});
$(function () {
	//室内温度/采暖能耗(Q/L)h评价
	//单位面积采暖能耗
	var dwmjcnnh = handleExcelData(window.localStorage.getItem("dwmjcnnh"));
	//室内温度/空调能耗(Q/L)c评价
	//单位面积空调能耗
	var dwmjktnh = handleExcelData(window.localStorage.getItem("dwmjktnh"));
	//室内照度/照明能耗(Q/L)i评价
	//单位面积照明能耗
	var dwmjzmhn = handleExcelData(window.localStorage.getItem("dwmjzmhn"));
	//其他环境质量/其他能耗(Q/L)s评价
	//其他单位面积能耗
	var qtdwmjhn = handleExcelData(window.localStorage.getItem("qtdwmjhn"));
	//单位面积总耗能
	var dwmjznh =	handleExcelData(window.localStorage.getItem("dwmjznh"));

	//excel 数据计算
	var aveWinterTemperature = handleExcelData(window.localStorage.getItem("aveWinterTemperature"));
	var aveSummerTemperature = handleExcelData(window.localStorage.getItem("aveSummerTemperature"));
	var aveLightData = handleExcelData(window.localStorage.getItem("aveLightData"));
	var aveMyd = handleExcelData(window.localStorage.getItem("aveMyd"));
	var result5X 	=	handleExcelData(window.localStorage.getItem("result5X"));

	//图表展示
	$('#container').highcharts({
		chart: {
			plotBorderColor: 'red',
			plotBorderWidth: 2,
			marginRight: 30
		},
		legend: {
			enabled: false
		},
		tooltip: {
			enabled: false
		},
		credits: {
			enabled: false
		},
		plotOptions: {
			series: {
				lineWidth: 4,
				states: {
					hover: {
						enabled: false
					}
				}
			}
		},
		exporting: {
			enabled: true
		},
		xAxis: {
			min: 14,
			max: 26,
			tickInterval: 2,
			reversed: true,
			labels: {
				style: {
					fontSize: '18px'
				},
				formatter: function () {
					return this.value + '°C';
				}
			},
			minTickInterval: 1,
			minorTickWidth: 1,
			gridLineWidth: 1,
			gridLineColor: 'red',
			lineColor: '#C0D0E0',
			title: {
				text: null
			},
			minorGridLineColor: 'red',
			minorGridLineWidth: 1,
			minorTickInterval: 1
		},
		yAxis: {
			min: 0,
			max: 60,
			tickInterval: 10,
			reversed: true,
			labels: {
				style: {
					fontSize: '18px'
				},
				formatter: function () {
					return this.value + 'kWh/㎡a';
				}
			},
			title: {
				text: null
			},
			lineColor: '#C0D0E0',
			gridLineWidth: 1,
			gridLineColor: 'red',
			minorGridLineColor: 'red',
			minorGridLineWidth: 1,
			minorTickInterval: 5
		},
		title: {
			text: '室内温度/采暖能耗(Q/L)<sub>h</sub>评价',
			useHTML: true
		},
		series: [
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				data: [[aveWinterTemperature, dwmjcnnh]],
				marker: {
					radius: 7
				},
				zIndex: 2,
				lineWidth: 0
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						fontSize: '18px'
					},
					formatter: function () {
						return '1';
					}
				},
				data: [[20.5, 1]],
				marker: {
					enabled: false,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						fontSize: '18px'
					},
					formatter: function () {
						return '2';
					}
				},
				data: [[18.5, 1]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						fontSize: '18px'
					},
					formatter: function () {
						return '3';
					}
				},
				data: [[17.5, 1]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						fontSize: '18px'
					},
					formatter: function () {
						return '4';
					}
				},
				data: [[16.5, 1]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						fontSize: '18px'
					},
					formatter: function () {
						return '5';
					}
				},
				data: [[15.5, 1]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						fontSize: '18px'
					},
					formatter: function () {
						return '6';
					}
				},
				data: [[14.5, 1]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						fontSize: '18px'
					},
					formatter: function () {
						return '7';
					}
				},
				data: [[14.5, 25]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						color: '#888',
						fontWeight: "bold",
						fontSize: '24px',
						textShadow: "0 0 0px contrast, 0 0 0px contrast"
					},
					formatter: function () {
						return 'A';
					}
				},
				data: [[21, 23]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						color: '#888',
						fontWeight: "bold",
						fontSize: '24px',
						textShadow: "0 0 0px contrast, 0 0 0px contrast",
						fontfamily: "Microsoft YaHei"
					},
					formatter: function () {
						return 'B';
					}
				},
				data: [[19.5, 28]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						color: '#888',
						fontWeight: "bold",
						fontSize: '24px',
						textShadow: "0 0 0px contrast, 0 0 0px contrast"
					},
					formatter: function () {
						return 'C';
					}
				},
				data: [[18.5, 33]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'line',
				name: '基准线1',
				dashStyle: 'LongDash',
				color: '#7cb5ec',
				data: [[26, 42], [20, 15], [20, 0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},
			{
				type: 'line',
				name: '基准线2',
				zones: [{
					color: '#434348'
				}],
				data: [[26,49],[18,13],[18,0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},
			{
				type: 'line',
				name: '基准线3',
				zones: [{
					color: '#7cb5ec',
					dashStyle: 'LongDash',
				}],
				data: [[26,50],[25.1,50],[17,13.5],[17,0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},

			{
				type: 'line',
				name: '基准线4',
				zones: [{
					color: '#434348'
				}],
				data: [[26,50],[24,50],[16,14],[16,0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},
			{
				type: 'line',
				name: '基准线5',
				zones: [{
					color: '#7cb5ec',
					dashStyle: 'LongDash'
				}],
				data: [[26,50], [22.9,50],[15,14.5],[15,0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},
			{
				type: 'line',
				name: '基准线6',
				zones: [{
					color: '#434348'
				}],
				data: [[26,50],[21.8,50],[14,15],[14,0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			}]
	});
	$('#container1').highcharts({
		chart: {
			plotBorderColor: 'red',
			plotBorderWidth: 2,
			marginRight: 30
		},
		legend: {
			enabled: false
		},
		tooltip: {
			enabled: false
		},
		credits: {
			enabled: false
		},
		plotOptions: {
			series: {
				lineWidth: 4,
				states: {
					hover: {
						enabled: false
					}
				}
			}
		},
		exporting: {
			enabled: true
		},
		xAxis: {
			min: 23,
			max: 29,
			tickInterval: 1,
			labels: {
				style: {
					fontSize: '18px'
				},
				formatter: function () {
					return this.value + '°C';
				}
			},
			minTickInterval: 1,
			minorTickWidth: 1,
			gridLineWidth: 1,
			gridLineColor: 'red',
			lineColor: '#C0D0E0',
			title: {
				text: null
			},
			minorGridLineColor: 'red',
			minorGridLineWidth: 1,
			minorTickInterval: 0.5
		},
		yAxis: {
			min: 0,
			max: 30,
			tickInterval: 5,
			reversed: true,
			labels: {
				style: {
					fontSize: '18px'
				},
				formatter: function () {
					return this.value + 'kWh/㎡a';
				}
			},
			title: {
				text: null
			},
			lineColor: '#C0D0E0',
			gridLineWidth: 1,
			gridLineColor: 'red',
			minorGridLineColor: 'red',
			minorGridLineWidth: 1,
			minorTickInterval: 2.5
		},
		title: {
			text: '室内温度/空调能耗(Q/L)<sub>c</sub>评价',
			useHTML: true
		},
		series: [
			{
				type: 'scatter',
				name: 'Observations',
				zones: [{
					color: '#50B432'
				}],
				data: [[aveSummerTemperature, dwmjktnh]],
				marker: {
					radius: 7
				},
				zIndex: 20,
				lineWidth: 0
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						fontSize: '18px'
					},
					formatter: function () {
						return '1';
					}
				},
				data: [[23.75, 6, 25]],
				marker: {
					enabled: false,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						fontSize: '18px'
					},
					formatter: function () {
						return '2';
					}
				},
				data: [[23.75, 13.5]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						fontSize: '18px'
					},
					formatter: function () {
						return '3';
					}
				},
				data: [[23.75, 17.75]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						fontSize: '18px'
					},
					formatter: function () {
						return '4';
					}
				},
				data: [[23.75, 19.75]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						fontSize: '18px'
					},
					formatter: function () {
						return '5';
					}
				},
				data: [[23.75, 22.25]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						fontSize: '18px'
					},
					formatter: function () {
						return '6';
					}
				},
				data: [[23.75, 24.75]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						fontSize: '18px'
					},
					formatter: function () {
						return '7';
					}
				},
				data: [[23.75, 27.5]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						color: '#888',
						fontWeight: "bold",
						fontSize: '24px',
						textShadow: "0 0 0px contrast, 0 0 0px contrast"
					},
					formatter: function () {
						return 'A';
					}
				},
				data: [[25.25, 10]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						color: '#888',
						fontWeight: "bold",
						fontSize: '24px',
						textShadow: "0 0 0px contrast, 0 0 0px contrast"
					},
					formatter: function () {
						return 'B';
					}
				},
				data: [[26.25, 12.5]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						color: '#888',
						fontWeight: "bold",
						fontSize: '24px',
						textShadow: "0 0 0px contrast, 0 0 0px contrast"
					},
					formatter: function () {
						return 'C';
					}
				},
				data: [[26.75, 15]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'line',
				name: '基准线1',
				dashStyle: 'LongDash',
				color: '#7cb5ec',
				data: [[23, 10], [25, 10], [26, 5], [26, 0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},
			{
				type: 'line',
				name: '基准线2',
				zones: [{
					color: '#434348'
				}],
				data: [[23, 15], [25, 15], [27, 5], [27, 0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},
			{
				type: 'line',
				name: '基准线3',
				dashStyle: 'LongDash',
				color: '#7cb5ec',
				data: [[23, 17.5], [25, 17.5], [27.5, 5], [27.5, 0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},
			{
				type: 'line',
				name: '基准线4',
				zones: [{
					color: '#434348'
				}],
				data: [[23, 20], [25, 20], [28, 5], [28, 0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},
			{
				type: 'line',
				name: '基准线5',
				dashStyle: 'LongDash',
				color: '#7cb5ec',
				data: [[23, 22.5], [25, 22.5], [29, 2.5]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},
			{
				type: 'line',
				name: '基准线6',
				zones: [{
					color: '#434348'
				}],
				data: [[23, 25], [25, 25], [29, 5]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			}]
	});
	$('#container2').highcharts({
		chart: {
			plotBorderColor: 'red',
			plotBorderWidth: 2,
			marginRight: 30
		},
		legend: {
			enabled: false
		},
		tooltip: {
			enabled: false
		},
		credits: {
			enabled: false
		},
		plotOptions: {
			series: {
				lineWidth: 4,
				states: {
					hover: {
						enabled: false
					}
				}
			}
		},
		exporting: {
			enabled: true
		},
		xAxis: {
			min: 160,
			max: 460,
			tickInterval: 100,
			reversed: true,
			labels: {
				style: {
					fontSize: '18px'
				},
				formatter: function () {
					return this.value + 'lx';
				}
			},
			minTickInterval: 1,
			minorTickWidth: 1,
			gridLineWidth: 1,
			gridLineColor: 'red',
			lineColor: '#C0D0E0',
			title: {
				text: null
			},
			minorGridLineColor: 'red',
			minorGridLineWidth: 1,
			minorTickInterval:20
		},
		yAxis: {
			min: 0,
			max: 15,
			tickInterval: 5,
			reversed: true,
			labels: {
				style: {
					fontSize: '18px'
				},
				formatter: function () {
					return this.value + 'kWh/㎡a';
				}
			},
			title: {
				text: null
			},
			lineColor: '#C0D0E0',
			gridLineWidth: 1,
			gridLineColor: 'red',
			minorGridLineColor: 'red',
			minorGridLineWidth: 1,
			minorTickInterval: 1
		},
		title: {
			text: '室内照度/照明能耗(Q/L)<sub>i</sub>评价',
			useHTML: true
		},
		series: [
			{
				type: 'scatter',
				name: 'Observations',
				zones: [{
					color: '#50B432'
				}],
				data: [[aveLightData, dwmjzmhn]],
				marker: {
					radius: 7
				},
				zIndex: 2,
				lineWidth: 0
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						fontSize: '18px'
					},
					formatter: function () {
						return '1';
					}
				},
				data: [[430, 8]],
				marker: {
					enabled: false,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						fontSize: '18px'
					},
					formatter: function () {
						return '2';
					}
				},
				data: [[430, 9]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						fontSize: '18px'
					},
					formatter: function () {
						return '3';
					}
				},
				data: [[430, 10]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						fontSize: '18px'
					},
					formatter: function () {
						return '4';
					}
				},
				data: [[430, 11]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						fontSize: '18px'
					},
					formatter: function () {
						return '5';
					}
				},
				data: [[430, 12]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						fontSize: '18px'
					},
					formatter: function () {
						return '6';
					}
				},
				data: [[430, 13]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						fontSize: '18px'
					},
					formatter: function () {
						return '7';
					}
				},
				data: [[430, 14]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						color: '#888',
						fontWeight: "bold",
						fontSize: '24px',
						textShadow: "0 0 0px contrast, 0 0 0px contrast"
					},
					formatter: function () {
						return 'A';
					}
				},
				data: [[340,7]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						color: '#888',
						fontWeight: "bold",
						fontSize: '24px',
						textShadow: "0 0 0px contrast, 0 0 0px contrast"
					},
					formatter: function () {
						return 'B';
					}
				},
				data: [[310, 8]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						color: '#888',
						fontWeight: "bold",
						fontSize: '24px',
						textShadow: "0 0 0px contrast, 0 0 0px contrast"
					},
					formatter: function () {
						return 'C';
					}
				},
				data: [[290, 9.5]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'line',
				name: '基准线1',
				dashStyle: 'LongDash',
				color: '#7cb5ec',
				data: [[460, 8], [400, 8], [300, 5], [300, 0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},
			{
				type: 'line',
				name: '基准线2',
				zones: [{
					color: '#434348'
				}],
				data: [[460, 9], [400, 9], [300, 6], [300, 0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},
			{
				type: 'line',
				name: '基准线3',
				dashStyle: 'LongDash',
				color: '#7cb5ec',
				data: [[460, 10], [400, 10], [250, 5.5], [250, 0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},
			{
				type: 'line',
				name: '基准线4',
				zones: [{
					color: '#434348'
				}],
				data: [[460, 11], [400, 11], [250, 6.5], [250, 0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},
			{
				type: 'line',
				name: '基准线5',
				zones: [{
					color: '#7cb5ec',
					dashStyle: 'LongDash'
				}],
				data: [[460, 12], [400, 12], [200, 6], [200, 0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},
			{
				type: 'line',
				name: '基准线6',
				zones: [{
					color: '#434348'
				}],
				data: [[460, 13], [400, 13], [200, 7], [200, 0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			}]
	});
	$('#container3').highcharts({
		chart: {
			plotBorderColor: 'red',
			plotBorderWidth: 2,
			marginRight: 30
		},
		legend: {
			enabled: false
		},
		tooltip: {
			enabled: false
		},
		credits: {
			enabled: false
		},
		plotOptions: {
			series: {
				lineWidth: 4,
				states: {
					hover: {
						enabled: false
					}
				}
			}
		},
		exporting: {
			enabled: true
		},
		xAxis: {
			min: -5,
			max: 5,
			tickInterval: 5,
			reversed: true,
			labels: {
				style: {
					fontSize: '18px'
				},
				formatter: function () {
					return this.value;
				}
			},
			minTickInterval: 1,
			minorTickWidth: 1,
			gridLineWidth: 1,
			gridLineColor: 'red',
			lineColor: '#C0D0E0',
			title: {
				text: null
			},
			minorGridLineColor: 'red',
			minorGridLineWidth: 1,
			minorTickInterval: 1
		},
		yAxis: {
			min: 0,
			max: 40,
			tickInterval: 10,
			reversed: true,
			labels: {
				style: {
					fontSize: '18px'
				},
				formatter: function () {
					return this.value + 'kWh/㎡a';
				}
			},
			minTickInterval: 1,
			minorTickWidth: 1,
			gridLineWidth: 1,
			gridLineColor: 'red',
			lineColor: '#C0D0E0',
			title: {
				text: null
			},
			minorGridLineColor: 'red',
			minorGridLineWidth: 1,
			minorTickInterval: 5
		},
		title: {
			text: '其他环境质量/其他能耗(Q/L)<sub>s</sub>评价',
			useHTML: true
		},
		series: [
			{
				type: 'scatter',
				name: 'Observations',
				zones: [{
					color: '#50B432'
				}],
				data: [[aveMyd, qtdwmjhn]],
				marker: {
					radius: 7
				},
				zIndex: 2,
				lineWidth: 0
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						fontSize: '18px'
					},
					formatter: function () {
						return '1';
					}
				},
				data: [[3.5, 3.5]],
				marker: {
					enabled: false,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						fontSize: '18px'
					},
					formatter: function () {
						return '2';
					}
				},
				data: [[2.25, 3.5]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						fontSize: '18px'
					},
					formatter: function () {
						return '3';
					}
				},
				data: [[1.25, 3.5]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						fontSize: '18px'
					},
					formatter: function () {
						return '4';
					}
				},
				data: [[0.25, 3.5]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						fontSize: '18px'
					},
					formatter: function () {
						return '5';
					}
				},
				data: [[-0.75, 3.5]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						fontSize: '18px'
					},
					formatter: function () {
						return '6';
					}
				},
				data: [[-1.75, 3.5]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						fontSize: '18px'
					},
					formatter: function () {
						return '7';
					}
				},
				data: [[-3.5, 3.5]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						color: '#888',
						fontWeight: "bold",
						fontSize: '24px',
						textShadow: "0 0 0px contrast, 0 0 0px contrast"
					},
					formatter: function () {
						return 'A';
					}
				},
				data: [[3.5, 17]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						color: '#888',
						fontWeight: "bold",
						fontSize: '24px',
						textShadow: "0 0 0px contrast, 0 0 0px contrast"
					},
					formatter: function () {
						return 'B';
					}
				},
				data: [[1.5, 18.5]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						color: '#888',
						fontWeight: "bold",
						fontSize: '24px',
						textShadow: "0 0 0px contrast, 0 0 0px contrast"
					},
					formatter: function () {
						return 'C';
					}
				},
				data: [[-0.5, 19]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'line',
				name: '基准线1',
				dashStyle: 'LongDash',
				color: '#7cb5ec',
				data: [[5, 40], [2.5, 0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},
			{
				type: 'line',
				name: '基准线2',
				zones: [{
					color: '#434348'
				}],
				data: [[4, 40], [1.5, 0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},
			{
				type: 'line',
				name: '基准线3',
				dashStyle: 'LongDash',
				color: '#7cb5ec',
				data: [[3, 40], [0.5, 0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},
			{
				type: 'line',
				name: '基准线4',
				zones: [{
					color: '#434348'
				}],
				data: [[2, 40], [-0.5, 0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},
			{
				type: 'line',
				name: '基准线5',
				dashStyle: 'LongDash',
				color: '#7cb5ec',
				data: [[1, 40], [-1.5, 0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},
			{
				type: 'line',
				name: '基准线6',
				zones: [{
					color: '#434348'
				}],
				data: [[0, 40], [-2.5, 0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			}]
	});
	$('#container4').highcharts({
		chart: {
			plotBorderColor: 'red',
			plotBorderWidth: 2,
			marginRight: 30
		},
		legend: {
			enabled: false
		},
		tooltip: {
			enabled: false
		},
		credits: {
			enabled: false
		},
		plotOptions: {
			series: {
				lineWidth: 4,
				states: {
					hover: {
						enabled: false
					}
				}
			}
		},
		exporting: {
			enabled: true
		},
		xAxis: {
			min: 1,
			max: 7,
			tickInterval: 1,
			labels: {
				style: {
					fontSize: '18px'
				},
				formatter: function () {
					return this.value + '级';
				}
			},
			minTickInterval: 1,
			minorTickWidth: 1,
			gridLineWidth: 1,
			gridLineColor: 'red',
			lineColor: '#C0D0E0',
			title: {
				text: null
			},
			minorGridLineColor: 'red',
			minorGridLineWidth: 1,
			minorTickInterval: 0.5
		},
		yAxis: {
			min: 20,
			max: 140,
			tickInterval: 20,
			reversed: true,
			labels: {
				style: {
					fontSize: '18px'
				},
				formatter: function () {
					return this.value + 'kWh/㎡a';
				}
			},
			title: {
				text: null
			},
			lineColor: '#C0D0E0',
			gridLineWidth: 1,
			gridLineColor: 'red',
			minorGridLineColor: 'red',
			minorGridLineWidth: 1,
			minorTickInterval: 10
		},
		title: {
			text: '环境能源效率/总能耗(Q/L)评价',
			useHTML: true
		},
		series: [
			{
				type: 'scatter',
				name: 'Observations',
				data: [[result5X,dwmjznh]],
				zones: [{
					color: '#50B432'
				}],
				marker: {
					radius: 7
				},
				zIndex: 2,
				lineWidth: 0
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						color: '#888',
						fontWeight: "bold",
						fontSize: '24px',
						textShadow: "0 0 0px contrast, 0 0 0px contrast"
					},
					formatter: function () {
						return 'A';
					}
				},
				data: [[3.25, 50]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						color: '#888',
						fontWeight: "bold",
						fontSize: '24px',
						textShadow: "0 0 0px contrast, 0 0 0px contrast"
					},
					formatter: function () {
						return 'B';
					}
				},
				data: [[4.25, 70]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						color: '#888',
						fontWeight: "bold",
						fontSize: '24px',
						textShadow: "0 0 0px contrast, 0 0 0px contrast"
					},
					formatter: function () {
						return 'C';
					}
				},
				data: [[4.75, 80]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'line',
				name: '基准线1',
				color: '#434348',
				data: [[1, 100], [2, 100], [4, 60], [4, 20]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},
			{
				type: 'line',
				name: '基准线2',
				color: '#434348',
				data: [[1, 120], [2, 120], [5, 60], [5, 20]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},
			{
				type: 'line',
				name: '基准线3',
				color: '#434348',
				data: [[2, 140], [6, 60], [6, 20]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			}]
	});

	$('#container01').highcharts({
		chart: {
			plotBorderColor: 'red',
			plotBorderWidth: 2,
			marginRight: 30
		},
		legend: {
			enabled: false
		},
		tooltip: {
			enabled: false
		},
		credits: {
			enabled: false
		},
		plotOptions: {
			series: {
				//lineWidth: 4,
				states: {
					hover: {
						enabled: false
					}
				}
			}
		},
		exporting: {
			enabled: true
		},
		xAxis: {
			min: 14,
			max: 26,
			tickInterval: 2,
			reversed: true,
			labels: {
				//style: {
				//    fontSize: '18px'
				//},
				formatter: function () {
					return this.value + '°C';
				}
			},
			minTickInterval: 1,
			minorTickWidth: 1,
			gridLineWidth: 1,
			gridLineColor: 'red',
			lineColor: '#C0D0E0',
			title: {
				text: null
			},
			minorGridLineColor: 'red',
			minorGridLineWidth: 1,
			minorTickInterval: 1
		},
		yAxis: {
			min: 0,
			max: 60,
			tickInterval: 10,
			reversed: true,
			labels: {
				//style: {
				//    fontSize: '18px'
				//},
				formatter: function () {
					return this.value + 'kWh/㎡a';
				}
			},
			title: {
				text: null
			},
			lineColor: '#C0D0E0',
			gridLineWidth: 1,
			gridLineColor: 'red',
			minorGridLineColor: 'red',
			minorGridLineWidth: 1,
			minorTickInterval: 5
		},
		title: {
			text: '室内温度/采暖能耗(Q/L)<sub>h</sub>评价',
			useHTML: true
		},
		series: [
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				data: [[aveWinterTemperature, dwmjcnnh]],
				marker: {
					radius: 4
				},
				zIndex: 2,
				lineWidth: 0
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						//fontSize: '18px'
						fontWeight: "bold"
					},
					formatter: function () {
						return '1';
					}
				},
				data: [[20.5, 1]],
				marker: {
					enabled: false,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						//fontSize: '18px'
						fontWeight: "bold"
					},
					formatter: function () {
						return '2';
					}
				},
				data: [[18.5, 1]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						//fontSize: '18px'
						fontWeight: "bold"
					},
					formatter: function () {
						return '3';
					}
				},
				data: [[17.5, 1]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						//fontSize: '18px'
						fontWeight: "bold"
					},
					formatter: function () {
						return '4';
					}
				},
				data: [[16.5, 1]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						//fontSize: '18px'
						fontWeight: "bold"
					},
					formatter: function () {
						return '5';
					}
				},
				data: [[15.5, 1]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						//fontSize: '18px'
						fontWeight: "bold"
					},
					formatter: function () {
						return '6';
					}
				},
				data: [[14.5, 1]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						//fontSize: '18px'
						fontWeight: "bold"
					},
					formatter: function () {
						return '7';
					}
				},
				data: [[14.5, 25]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						color: '#888',
						fontWeight: "bold",
						//fontSize: '24px',
						textShadow: "0 0 0px contrast, 0 0 0px contrast"
					},
					formatter: function () {
						return 'A';
					}
				},
				data: [[21, 23]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						color: '#888',
						fontWeight: "bold",
						//fontSize: '24px',
						textShadow: "0 0 0px contrast, 0 0 0px contrast"
					},
					formatter: function () {
						return 'B';
					}
				},
				data: [[19.5, 28]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						color: '#888',
						fontWeight: "bold",
						//fontSize: '24px',
						textShadow: "0 0 0px contrast, 0 0 0px contrast"
					},
					formatter: function () {
						return 'C';
					}
				},
				data: [[18.5, 33]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'line',
				name: '基准线1',
				dashStyle: 'LongDash',
				color: '#7cb5ec',
				data: [[26, 42], [20, 15], [20, 0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},
			{
				type: 'line',
				name: '基准线2',
				zones: [{
					color: '#434348'
				}],
				data: [[26,49],[18,13],[18,0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},
			{
				type: 'line',
				name: '基准线3',
				zones: [{
					color: '#7cb5ec',
					dashStyle: 'LongDash'
				}],
				data: [[26,50],[25.1,50],[17,13.5],[17,0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},

			{
				type: 'line',
				name: '基准线4',
				zones: [{
					color: '#434348'
				}],
				data: [[26,50],[24,50],[16,14],[16,0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},
			{
				type: 'line',
				name: '基准线5',
				zones: [{
					color: '#7cb5ec',
					dashStyle: 'LongDash'
				}],
				data: [[26,50], [22.9,50],[15,14.5],[15,0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},
			{
				type: 'line',
				name: '基准线6',
				zones: [{
					color: '#434348'
				}],
				data: [[26,50],[21.8,50],[14,15],[14,0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			}]
	});
	$('#container11').highcharts({
		chart: {
			plotBorderColor: 'red',
			plotBorderWidth: 2,
			marginRight: 30
		},
		legend: {
			enabled: false
		},
		tooltip: {
			enabled: false
		},
		credits: {
			enabled: false
		},
		plotOptions: {
			series: {
				//lineWidth: 4,
				states: {
					hover: {
						enabled: false
					}
				}
			}
		},
		exporting: {
			enabled: true
		},
		xAxis: {
			min: 23,
			max: 29,
			tickInterval: 1,
			labels: {
				//style: {
				//    fontSize: '18px'
				//},
				formatter: function () {
					return this.value + '°C';
				}
			},
			minTickInterval: 1,
			minorTickWidth: 1,
			gridLineWidth: 1,
			gridLineColor: 'red',
			lineColor: '#C0D0E0',
			title: {
				text: null
			},
			minorGridLineColor: 'red',
			minorGridLineWidth: 1,
			minorTickInterval: 0.5
		},
		yAxis: {
			min: 0,
			max: 30,
			tickInterval: 5,
			reversed: true,
			labels: {
				//style: {
				//    fontSize: '18px'
				//},
				formatter: function () {
					return this.value + 'kWh/㎡a';
				}
			},
			title: {
				text: null
			},
			lineColor: '#C0D0E0',
			gridLineWidth: 1,
			gridLineColor: 'red',
			minorGridLineColor: 'red',
			minorGridLineWidth: 1,
			minorTickInterval: 2.5
		},
		title: {
			text: '室内温度/空调能耗(Q/L)<sub>c</sub>评价',
			useHTML: true
		},
		series: [
			{
				type: 'scatter',
				name: 'Observations',
				zones: [{
					color: '#50B432'
				}],
				data: [[aveSummerTemperature, dwmjktnh]],
				marker: {
					radius: 4
				},
				zIndex: 20,
				lineWidth: 0
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						//fontSize: '18px'
						fontWeight: "bold"
					},
					formatter: function () {
						return '1';
					}
				},
				data: [[23.75, 6, 25]],
				marker: {
					enabled: false,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						//fontSize: '18px'
						fontWeight: "bold"
					},
					formatter: function () {
						return '2';
					}
				},
				data: [[23.75, 13.5]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						//fontSize: '18px'
						fontWeight: "bold"
					},
					formatter: function () {
						return '3';
					}
				},
				data: [[23.75, 17.75]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						//fontSize: '18px'
						fontWeight: "bold"
					},
					formatter: function () {
						return '4';
					}
				},
				data: [[23.75, 19.75]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						//fontSize: '18px'
						fontWeight: "bold"
					},
					formatter: function () {
						return '5';
					}
				},
				data: [[23.75, 22.25]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						//fontSize: '18px'
						fontWeight: "bold"
					},
					formatter: function () {
						return '6';
					}
				},
				data: [[23.75, 24.75]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						//fontSize: '18px'
						fontWeight: "bold"
					},
					formatter: function () {
						return '7';
					}
				},
				data: [[23.75, 27.5]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						color: '#888',
						fontWeight: "bold",
						//fontSize: '24px',
						textShadow: "0 0 0px contrast, 0 0 0px contrast"
					},
					formatter: function () {
						return 'A';
					}
				},
				data: [[25.25, 10]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						color: '#888',
						fontWeight: "bold",
						//fontSize: '24px',
						textShadow: "0 0 0px contrast, 0 0 0px contrast"
					},
					formatter: function () {
						return 'B';
					}
				},
				data: [[26.25, 12.5]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						color: '#888',
						fontWeight: "bold",
						//fontSize: '24px',
						textShadow: "0 0 0px contrast, 0 0 0px contrast"
					},
					formatter: function () {
						return 'C';
					}
				},
				data: [[26.75, 15]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'line',
				name: '基准线1',
				dashStyle: 'LongDash',
				color: '#7cb5ec',
				data: [[23, 10], [25, 10], [26, 5], [26, 0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},
			{
				type: 'line',
				name: '基准线2',
				zones: [{
					color: '#434348'
				}],
				data: [[23, 15], [25, 15], [27, 5], [27, 0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},
			{
				type: 'line',
				name: '基准线3',
				dashStyle: 'LongDash',
				color: '#7cb5ec',
				data: [[23, 17.5], [25, 17.5], [27.5, 5], [27.5, 0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},
			{
				type: 'line',
				name: '基准线4',
				zones: [{
					color: '#434348'
				}],
				data: [[23, 20], [25, 20], [28, 5], [28, 0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},
			{
				type: 'line',
				name: '基准线5',
				dashStyle: 'LongDash',
				color: '#7cb5ec',
				data: [[23, 22.5], [25, 22.5], [29, 2.5]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},
			{
				type: 'line',
				name: '基准线6',
				zones: [{
					color: '#434348'
				}],
				data: [[23, 25], [25, 25], [29, 5]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			}]
	});
	$('#container22').highcharts({
		chart: {
			plotBorderColor: 'red',
			plotBorderWidth: 2,
			marginRight: 30
		},
		legend: {
			enabled: false
		},
		tooltip: {
			enabled: false
		},
		credits: {
			enabled: false
		},
		plotOptions: {
			series: {
				//lineWidth: 4,
				states: {
					hover: {
						enabled: false
					}
				}
			}
		},
		exporting: {
			enabled: true
		},
		xAxis: {
			min: 160,
			max: 460,
			tickInterval:100,
			reversed: true,
			labels: {
				//style: {
				//    fontSize: '18px'
				//},
				formatter: function () {
					return this.value + 'lx';
				}
			},
			minTickInterval: 1,
			minorTickWidth: 1,
			gridLineWidth: 1,
			gridLineColor: 'red',
			lineColor: '#C0D0E0',
			title: {
				text: null
			},
			minorGridLineColor: 'red',
			minorGridLineWidth: 1,
			minorTickInterval: 20
		},
		yAxis: {
			min: 0,
			max: 15,
			tickInterval: 5,
			reversed: true,
			labels: {
				//style: {
				//    fontSize: '18px'
				//},
				formatter: function () {
					return this.value + 'kWh/㎡a';
				}
			},
			title: {
				text: null
			},
			lineColor: '#C0D0E0',
			gridLineWidth: 1,
			gridLineColor: 'red',
			minorGridLineColor: 'red',
			minorGridLineWidth: 1,
			minorTickInterval: 1
		},
		title: {
			text: '室内照度/照明能耗(Q/L)<sub>i</sub>评价',
			useHTML: true
		},
		series: [
			{
				type: 'scatter',
				name: 'Observations',
				zones: [{
					color: '#50B432'
				}],
				data: [[aveLightData, dwmjzmhn]],
				marker: {
					radius: 4
				},
				zIndex: 2,
				lineWidth: 0
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						//fontSize: '18px'
						fontWeight: "bold"
					},
					formatter: function () {
						return '1';
					}
				},
				data: [[430, 8]],
				marker: {
					enabled: false,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						//fontSize: '18px'
						fontWeight: "bold"
					},
					formatter: function () {
						return '2';
					}
				},
				data: [[430, 9]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						//fontSize: '18px'
						fontWeight: "bold"
					},
					formatter: function () {
						return '3';
					}
				},
				data: [[430, 10]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						//fontSize: '18px'
						fontWeight: "bold"
					},
					formatter: function () {
						return '4';
					}
				},
				data: [[430, 11]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						//fontSize: '18px'
						fontWeight: "bold"
					},
					formatter: function () {
						return '5';
					}
				},
				data: [[430, 12]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						//fontSize: '18px'
						fontWeight: "bold"
					},
					formatter: function () {
						return '6';
					}
				},
				data: [[430, 13]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						//fontSize: '18px'
						fontWeight: "bold"
					},
					formatter: function () {
						return '7';
					}
				},
				data: [[430, 14]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						color: '#888',
						fontWeight: "bold",
						//fontSize: '24px',
						textShadow: "0 0 0px contrast, 0 0 0px contrast"
					},
					formatter: function () {
						return 'A';
					}
				},
				data: [[340,7]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						color: '#888',
						fontWeight: "bold",
						//fontSize: '24px',
						textShadow: "0 0 0px contrast, 0 0 0px contrast"
					},
					formatter: function () {
						return 'B';
					}
				},
				data: [[310, 8]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						color: '#888',
						fontWeight: "bold",
						//fontSize: '24px',
						textShadow: "0 0 0px contrast, 0 0 0px contrast"
					},
					formatter: function () {
						return 'C';
					}
				},
				data: [[290, 9.5]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'line',
				name: '基准线1',
				dashStyle: 'LongDash',
				color: '#7cb5ec',
				data: [[460, 8], [400, 8], [300, 5], [300, 0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},
			{
				type: 'line',
				name: '基准线2',
				zones: [{
					color: '#434348'
				}],
				data: [[460, 9], [400, 9], [300, 6], [300, 0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},
			{
				type: 'line',
				name: '基准线3',
				dashStyle: 'LongDash',
				color: '#7cb5ec',
				data: [[460, 10], [400, 10], [250, 5.5], [250, 0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},
			{
				type: 'line',
				name: '基准线4',
				zones: [{
					color: '#434348'
				}],
				data: [[460, 11], [400, 11], [250, 6.5], [250, 0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},
			{
				type: 'line',
				name: '基准线5',
				zones: [{
					color: '#7cb5ec',
					dashStyle: 'LongDash'
				}],
				data: [[460, 12], [400, 12], [200, 6], [200, 0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},
			{
				type: 'line',
				name: '基准线6',
				zones: [{
					color: '#434348'
				}],
				data: [[460, 13], [400, 13], [200, 7], [200, 0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			}]
	});
	$('#container33').highcharts({
		chart: {
			plotBorderColor: 'red',
			plotBorderWidth: 2,
			marginRight: 30
		},
		legend: {
			enabled: false
		},
		tooltip: {
			enabled: false
		},
		credits: {
			enabled: false
		},
		plotOptions: {
			series: {
				//lineWidth: 4,
				states: {
					hover: {
						enabled: false
					}
				}
			}
		},
		exporting: {
			enabled: true
		},
		xAxis: {
			min: -5,
			max: 5,
			tickInterval: 5,
			reversed: true,
			labels: {
				//style: {
				//    fontSize: '18px'
				//},
				formatter: function () {
					return this.value;
				}
			},
			minTickInterval: 1,
			minorTickWidth: 1,
			gridLineWidth: 1,
			gridLineColor: 'red',
			lineColor: '#C0D0E0',
			title: {
				text: null
			},
			minorGridLineColor: 'red',
			minorGridLineWidth: 1,
			minorTickInterval: 1
		},
		yAxis: {
			min: 0,
			max: 40,
			tickInterval: 10,
			reversed: true,
			labels: {
				//style: {
				//    fontSize: '18px'
				//},
				formatter: function () {
					return this.value + 'kWh/㎡a';
				}
			},
			minTickInterval: 1,
			minorTickWidth: 1,
			gridLineWidth: 1,
			gridLineColor: 'red',
			lineColor: '#C0D0E0',
			title: {
				text: null
			},
			minorGridLineColor: 'red',
			minorGridLineWidth: 1,
			minorTickInterval: 5
		},
		title: {
			text: '其他环境质量/其他能耗(Q/L)<sub>s</sub>评价',
			useHTML: true
		},
		series: [
			{
				type: 'scatter',
				name: 'Observations',
				zones: [{
					color: '#50B432'
				}],
				data: [[aveMyd, qtdwmjhn]],
				marker: {
					radius: 4
				},
				zIndex: 2,
				lineWidth: 0
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						//fontSize: '18px'
						fontWeight: "bold"
					},
					formatter: function () {
						return '1';
					}
				},
				data: [[3.5, 3.5]],
				marker: {
					enabled: false,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						//fontSize: '18px'
						fontWeight: "bold"
					},
					formatter: function () {
						return '2';
					}
				},
				data: [[2.25, 3.5]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						//fontSize: '18px'
						fontWeight: "bold"
					},
					formatter: function () {
						return '3';
					}
				},
				data: [[1.25, 3.5]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						//fontSize: '18px'
						fontWeight: "bold"
					},
					formatter: function () {
						return '4';
					}
				},
				data: [[0.25, 3.5]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						//fontSize: '18px'
						fontWeight: "bold"
					},
					formatter: function () {
						return '5';
					}
				},
				data: [[-0.75, 3.5]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						//fontSize: '18px'
						fontWeight: "bold"
					},
					formatter: function () {
						return '6';
					}
				},
				data: [[-1.75, 3.5]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						//fontSize: '18px'
						fontWeight: "bold"
					},
					formatter: function () {
						return '7';
					}
				},
				data: [[-3.5, 3.5]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						color: '#888',
						fontWeight: "bold",
						//fontSize: '24px',
						textShadow: "0 0 0px contrast, 0 0 0px contrast"
					},
					formatter: function () {
						return 'A';
					}
				},
				data: [[3.5, 17]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						color: '#888',
						fontWeight: "bold",
						//fontSize: '24px',
						textShadow: "0 0 0px contrast, 0 0 0px contrast"
					},
					formatter: function () {
						return 'B';
					}
				},
				data: [[1.5, 18.5]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						color: '#888',
						fontWeight: "bold",
						//fontSize: '24px',
						textShadow: "0 0 0px contrast, 0 0 0px contrast"
					},
					formatter: function () {
						return 'C';
					}
				},
				data: [[-0.5, 19]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'line',
				name: '基准线1',
				dashStyle: 'LongDash',
				color: '#7cb5ec',
				data: [[5, 40], [2.5, 0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},
			{
				type: 'line',
				name: '基准线2',
				zones: [{
					color: '#434348'
				}],
				data: [[4, 40], [1.5, 0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},
			{
				type: 'line',
				name: '基准线3',
				dashStyle: 'LongDash',
				color: '#7cb5ec',
				data: [[3, 40], [0.5, 0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},
			{
				type: 'line',
				name: '基准线4',
				zones: [{
					color: '#434348'
				}],
				data: [[2, 40], [-0.5, 0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},
			{
				type: 'line',
				name: '基准线5',
				dashStyle: 'LongDash',
				color: '#7cb5ec',
				data: [[1, 40], [-1.5, 0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},
			{
				type: 'line',
				name: '基准线6',
				zones: [{
					color: '#434348'
				}],
				data: [[0, 40], [-2.5, 0]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			}]
	});
	$('#container44').highcharts({
		chart: {
			plotBorderColor: 'red',
			plotBorderWidth: 2,
			marginRight: 30
		},
		legend: {
			enabled: false
		},
		tooltip: {
			enabled: false
		},
		credits: {
			enabled: false
		},
		plotOptions: {
			series: {
				//lineWidth: 4,
				states: {
					hover: {
						enabled: false
					}
				}
			}
		},
		exporting: {
			enabled: true
		},
		xAxis: {
			min: 1,
			max: 7,
			tickInterval: 1,
			labels: {
				//style: {
				//    fontSize: '18px'
				//},
				formatter: function () {
					return this.value + '级';
				}
			},
			minTickInterval: 1,
			minorTickWidth: 1,
			gridLineWidth: 1,
			gridLineColor: 'red',
			lineColor: '#C0D0E0',
			title: {
				text: null
			},
			minorGridLineColor: 'red',
			minorGridLineWidth: 1,
			minorTickInterval: 0.5
		},
		yAxis: {
			min: 20,
			max: 140,
			tickInterval: 20,
			reversed: true,
			labels: {
				//style: {
				//    fontSize: '18px'
				//},
				formatter: function () {
					return this.value + 'kWh/㎡a';
				}
			},
			title: {
				text: null
			},
			lineColor: '#C0D0E0',
			gridLineWidth: 1,
			gridLineColor: 'red',
			minorGridLineColor: 'red',
			minorGridLineWidth: 1,
			minorTickInterval: 10
		},
		title: {
			text: '环境能源效率/总能耗(Q/L)评价',
			useHTML: true
		},
		series: [
			{
				type: 'scatter',
				name: 'Observations',
				zones: [{
					color: '#50B432'
				}],
				data: [[result5X,dwmjznh]],
				marker: {
					radius: 4
				},
				zIndex: 2,
				lineWidth: 0
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						color: '#888',
						fontWeight: "bold",

						textShadow: "0 0 0px contrast, 0 0 0px contrast"
					},
					formatter: function () {
						return 'A';
					}
				},
				data: [[3.25, 50]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						color: '#888',
						fontWeight: "bold",

						textShadow: "0 0 0px contrast, 0 0 0px contrast"
					},
					formatter: function () {
						return 'B';
					}
				},
				data: [[4.25, 70]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'scatter',
				name: '测量值',
				zones: [{
					color: '#50B432'
				}],
				dataLabels: {
					enabled: true,
					style: {
						color: '#888',
						fontWeight: "bold",

						textShadow: "0 0 0px contrast, 0 0 0px contrast"
					},
					formatter: function () {
						return 'C';
					}
				},
				data: [[4.75, 80]],
				marker: {
					enabled: false,
					lineWidth: 0,
					width: 0,
					height: 0,
					radius: 0
				}
			},
			{
				type: 'line',
				name: '基准线1',
				color: '#434348',
				data: [[1, 100], [2, 100], [4, 60], [4, 20]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},
			{
				type: 'line',
				name: '基准线2',
				color: '#434348',
				data: [[1, 120], [2, 120], [5, 60], [5, 20]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			},
			{
				type: 'line',
				name: '基准线3',
				color: '#434348',
				data: [[2, 140], [6, 60], [6, 20]],
				marker: {
					enabled: false
				},
				states: {
					hover: {
						lineWidth: 0
					}
				},
				enableMouseTracking: false
			}]
	});
});

