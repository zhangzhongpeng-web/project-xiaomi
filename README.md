# project-xiaomi
## 项目二：基于手机端浏览器的小米有品官网仿写
### 项目描述  
此项目为适应移动端浏览器的移动端项目，实现了商城的首页、列表页、商品详情页、订单列表页、购物车、以及到支付页的购物流程。
此项目通过向node服务器发送ajax请求，实现对数据库内数据的增删改查。

### 相关技术  
html5、css、ajax、jQuery

### 运行准备  
1、安装node服务  
2、安装mysql数据库和数据库管理软件（本人使用的是Navicat），并导入创建mall数据库  
3、修改config中的index.js文件中的数据库配置user和password  
4、配置完成后进入根目录，在根目录下打开命令窗口，输入node index.js启动node服务器  
5、打开浏览器(建议使用谷歌浏览器)，在地址栏中输入localhost:3000/index/index.html  
6、按f12进入手机预览模式浏览  

### 测试账号  
用户名：zhangsan；密码：123

### 注意事项  
1、手机短信登录未开发请切换至用户名密码登录  
2、分类操作跳转列表页请点击电视机（只有电视机数据库中有数据）  
3、列表页跳转至详情页请搜索并点击 小米电视4A 55英寸（只有此商品有详细数据）