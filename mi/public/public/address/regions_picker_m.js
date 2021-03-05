var regionPicker = (function() {
	// 相关dom的动态创建
	$(`
	    <div class='city-picker-overlay'>
	        <div class='city-picker'>
	            <div class='city-picker-header'>
	                <a href="javascript:void(0)" class="btn-close">关闭</a>
	                <a href="javascript:void(0)" class="btn-ok">确定</a>
	            </div>
	            <div class='city-picker-content'>
	                <ul class='picker-title'>
	                    <li class='province active'>请选择</li>
	                    <li class='city'>请选择</li>
	                    <li class='area'>请选择</li>
	                    <li class='street'>请选择</li>
	                </ul>
	                <div class='picker-content'>
	                    <ul class='province active'></ul>
	                    <ul class='city'></ul>
	                    <ul class='area'></ul>
	                    <ul class='street'></ul>
	                </div>
	            </div>
	        </div>
	    </div>
	`).appendTo('body');
	
	var region = {
		_provinces: regions.map(function(item) { return item.name; }),
		_province: null,
		_provinceStr: '',
		_cities: [],
		_city: null,
		_cityStr: '',
		_areas: [],
		_area: null,
		_areaStr: '',
		_streets: [],
		_streetStr: ''
	};
	Object.defineProperty(region, 'streetStr', {
		get: function() { return this._streetStr; },
		set: function(val) { 
			this._streetStr = val;
			// dom更新
			$('.city-picker li.street').text(this._streetStr || '请选择');
			$('.city-picker ul.street>li').removeClass('active');
			if(this._streetStr) $(`.city-picker ul.street>li:contains(${ this._streetStr })`).addClass('active');
		}
	});
	Object.defineProperty(region, 'areaStr', {
		get: function() { return this._areaStr; },
		set: function(val) {
			this._areaStr = typeof val === 'string' ? val : (val[0] || '');
			this._area = this._areaStr ? this._city.childs.find(function(item) { return item.name === this._areaStr }.bind(this)) : null;
			this._streets = this._area ? this._area.childs.map(function(item) { return item.name; }) : [];
			// dom更新
			$('.city-picker li.area').text(this._areaStr || '请选择');
			$('.city-picker ul.area>li').removeClass('active');
			if(this._areaStr) $(`.city-picker ul.area>li:contains(${ this._areaStr })`).addClass('active');
			$('.city-picker ul.street').empty();
			this._streets.forEach(function(item) { $(`<li>${ item }</li>`).appendTo('.city-picker ul.street'); });
			// 触发下一级更新
			this.streetStr = typeof val === 'string' ? '' : (val[1] || '');
		}
	});
	Object.defineProperty(region, 'cityStr', {
		get: function() { return this._cityStr; },
		set: function(val) {
			this._cityStr = typeof val === 'string' ? val : (val[0] || '');
			this._city = this._cityStr ? this._province.childs.find(function(item) { return item.name === this._cityStr }.bind(this)) : null;
			this._areas = this._city ? this._city.childs.map(function(item) { return item.name; }) : [];
			// dom更新
			$('.city-picker li.city').text(this._cityStr || '请选择');
			$('.city-picker ul.city>li').removeClass('active');
			if(this._cityStr) $(`.city-picker ul.city>li:contains(${ this._cityStr })`).addClass('active');
			$('.city-picker ul.area').empty();
			this._areas.forEach(function(item) { $(`<li>${ item }</li>`).appendTo('.city-picker ul.area'); });
			// 触发下一级更新
			this.areaStr = typeof val === 'string' ? '' : val.slice(1);
		}
	})
	Object.defineProperty(region, 'provinceStr', {
		get: function() { return this._provinceStr; },
		set: function(val) {
			this._provinceStr = typeof val === 'string' ? val : val[0];
			this._province = this._provinceStr ? regions.find(function(item) { return item.name === this._provinceStr }.bind(this)) : null;
			this._cities = this._province ? this._province.childs.map(function(item) { return item.name; }) : [];
			// dom更新
			$('.city-picker li.province').text(this._provinceStr || '请选择');
			$('.city-picker ul.province>li').removeClass('active');
			if(this._provinceStr) $(`.city-picker ul.province>li:contains(${ this._provinceStr })`).addClass('active');
			$('.city-picker ul.city').empty();
			this._cities.forEach(function(item) { $(`<li>${ item }</li>`).appendTo('.city-picker ul.city'); });
			// 触发下一级更新
			this.cityStr = typeof val === 'string' ? '' : val.slice(1);
		}
	});
	// 准备(把所有省渲染出来)
	region._provinces.forEach(function(item) { $(`<li>${ item }</li>`).appendTo('.city-picker ul.province'); });
	// dom事件绑定
	$('.city-picker ul.province').on('click', 'li', function() {
		if($(this).hasClass('active')) return;
		region.provinceStr = $(this).text();
	});
	$('.city-picker ul.city').on('click', 'li', function() {
		if($(this).hasClass('active')) return;
		region.cityStr = $(this).text();
	});
	$('.city-picker ul.area').on('click', 'li', function() {
		if($(this).hasClass('active')) return;
		region.areaStr = $(this).text();
	});
	$('.city-picker ul.street').on('click', 'li', function() {
		if($(this).hasClass('active')) return;
		region.streetStr = $(this).text();
	});
	// 选项卡切换
	$('.city-picker ul.picker-title>li').on('click', function() {
		if($(this).hasClass('active')) return;
		$(this).add(`.city-picker .picker-content>ul:eq(${ $(this).index() })`)
			.addClass('active').siblings('.active').removeClass('active');
	});
	// 点击半透明按钮关闭
	$('.city-picker-overlay').on('click', function(e) {
		if(e.target === this) $(this).hide();
	});
	// 关闭按钮
	$('.city-picker a.btn-close').on('click', function() { 
	    $(this).closest('.city-picker-overlay').hide();
	 });
	// 确定按钮
	$('.city-picker a.btn-ok').on('click', function() {
		console.log(region._get());
		$('.regions-picker').val(region._get());
		$(this).closest('.city-picker-overlay').hide();
	});
	// 重要的内部方法
	region._set = function(address) { address = address.split(' '); this.provinceStr = address; };
	region._get = function() {
		var result = '';
		if(!this.provinceStr) return result;
		result += this.provinceStr;
		if(!this.cityStr) return result;
		result += ' ' + this.cityStr;
		if(!this.areaStr) return result;
		result += ' ' + this.areaStr;
		if(!this.streetStr) return result;
		result += ' ' + this.streetStr;
		return result;
	};
	region._reset = function() { this.provinceStr = ''; };
	// 关联相关表单元素
	$('.regions-picker').attr('readonly', true).on('focus', function() {
		if($(this).val() === '') { region._reset(); }
		else { region._set($(this).val()); }
		$('.city-picker li.province').trigger('click');
		$('.city-picker-overlay').show();
	});
	return region;
})();



