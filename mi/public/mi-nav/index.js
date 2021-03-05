//根据当前窗口的父窗口的location. href的值， 判断出当前应该是哪个菜单处于激活状态
var reg=/.+\/(.+?)\/index.html$/;
var pageName = window.parent.location.href.match(reg)[1];
$(`li[data-page=${pageName}]`).addClass('active');
$('li').click(function() {
	window.parent.location.href = `../${this.dataset.page}/index.html`
});