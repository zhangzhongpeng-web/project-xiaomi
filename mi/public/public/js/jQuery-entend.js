
$.extend({
	myAjax:  function(userOptions){
		// 构造默认配置
		var defaultOptions = {
			type:  "get",
			headers:  {
				"Authorization":  sessionStorage.getItem("token"),
				"Content-type":  "application/json"
			}
		};
		// 合并默认配置和用户配置
		var options = Object.assign({},defaultOptions,userOptions);
		if(options.data) options.data = JSON.stringify(options.data);
		options.success = function(result){
			if(result.code === 200){
				userOptions.success(result.data);
			} else{
				alert(result.msg);
			}
		}
		// 发起真正的ajax
		$.ajax(options)
		
	},
	debounce: function debounce(func,wait){
		var lock = false;
		return function(args){
			if(lock) return;
			lock = true;
			setTimeout(function(){ lock = false },wait);
			func.call(this,args)
		}
	}
})