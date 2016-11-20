$(function () {
	$('.form_datetime').datetimepicker({
	language:  'zh-CN',
	weekStart: 1,
	todayBtn:  1,
	autoclose: 1,
	todayHighlight: 1,
	startView: 2,
	forceParse: 0,
	showMeridian: 1
	});
	$('.form_date').datetimepicker({
	language:  'zh-CN',
	weekStart: 1,
	todayBtn:  1,
	autoclose: 1,
	todayHighlight: 1,
	startView: 2,
	minView: 2,
	forceParse: 0
	});
	$('.form_time').datetimepicker({
	language:  'zh-CN',
	weekStart: 1,
	//showMeridian:true,
	todayBtn:  false,
	keyboardNavigation:false,
	autoclose: 1,
	todayHighlight: 1,
	startView: 1,
	minView: 0,
	maxView: 1,
	forceParse: 0
	});
	$('.clockpicker').clockpicker().find('input').change(function(){
		console.log(this.value);
	});
});
