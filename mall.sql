/*
Navicat MySQL Data Transfer

Source Server         : WODE
Source Server Version : 80011
Source Host           : 127.0.0.1:3306
Source Database       : mall

Target Server Type    : MYSQL
Target Server Version : 80011
File Encoding         : 65001

Date: 2021-03-05 15:18:28
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for dt_address
-- ----------------------------
DROP TABLE IF EXISTS `dt_address`;
CREATE TABLE `dt_address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `receiveName` varchar(10) NOT NULL,
  `receivePhone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `receiveRegion` varchar(255) NOT NULL,
  `receiveDetail` varchar(255) NOT NULL,
  `isDefault` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_address_name` (`name`),
  CONSTRAINT `fk_address_name` FOREIGN KEY (`name`) REFERENCES `dt_user` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dt_address
-- ----------------------------
INSERT INTO `dt_address` VALUES ('32', 'zhangsan', '张三啊', '1231231231', '北京市 市辖区 西城区 展览路街道', '是这里吗', '0');
INSERT INTO `dt_address` VALUES ('33', 'zhangsan', '李四', '1231232123', '天津市 市辖区 河西区', '312312', '1');

-- ----------------------------
-- Table structure for dt_cart
-- ----------------------------
DROP TABLE IF EXISTS `dt_cart`;
CREATE TABLE `dt_cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `pid` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_name` (`name`),
  KEY `fk_pid` (`pid`),
  CONSTRAINT `fk_name` FOREIGN KEY (`name`) REFERENCES `dt_user` (`name`),
  CONSTRAINT `fk_pid` FOREIGN KEY (`pid`) REFERENCES `dt_product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dt_cart
-- ----------------------------
INSERT INTO `dt_cart` VALUES ('58', 'zhangsan', '2', '2');

-- ----------------------------
-- Table structure for dt_category
-- ----------------------------
DROP TABLE IF EXISTS `dt_category`;
CREATE TABLE `dt_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fid` int(11) NOT NULL,
  `name` varchar(10) NOT NULL,
  `avatar` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dt_category
-- ----------------------------
INSERT INTO `dt_category` VALUES ('1', '0', '有品推荐', '/images/category/1.jpg');
INSERT INTO `dt_category` VALUES ('2', '0', '家具家装', '/images/category/2.jpg');
INSERT INTO `dt_category` VALUES ('3', '0', '家用电器', '/images/category/3.jpg');
INSERT INTO `dt_category` VALUES ('4', '0', '智能家庭', '/images/category/4.jpg');
INSERT INTO `dt_category` VALUES ('5', '0', '居家餐厨', '/images/category/5.jpg');
INSERT INTO `dt_category` VALUES ('6', '0', '运动户外', '/images/category/6.jpg');
INSERT INTO `dt_category` VALUES ('7', '0', '鞋靴箱包', '/images/category/7.jpg');
INSERT INTO `dt_category` VALUES ('8', '0', '日用文创', '/images/category/8.jpg');
INSERT INTO `dt_category` VALUES ('9', '0', '电视影音', '/images/category/9.jpg');
INSERT INTO `dt_category` VALUES ('10', '0', '服装配饰', '/images/category/10.jpg');
INSERT INTO `dt_category` VALUES ('11', '0', '数码配件', '/images/category/11.jpg');
INSERT INTO `dt_category` VALUES ('12', '0', '美妆个护', '/images/category/12.jpg');
INSERT INTO `dt_category` VALUES ('13', '1', '居家好物', '/images/category/13.png');
INSERT INTO `dt_category` VALUES ('14', '1', '空调', '/images/category/14.png');
INSERT INTO `dt_category` VALUES ('15', '1', '智能手表', '/images/category/15.png');
INSERT INTO `dt_category` VALUES ('16', '1', '耳机', '/images/category/16.png');
INSERT INTO `dt_category` VALUES ('17', '1', '电视机', '/images/category/17.png');
INSERT INTO `dt_category` VALUES ('18', '1', '行李箱', '/images/category/18.png');
INSERT INTO `dt_category` VALUES ('19', '1', '灯具', '/images/category/19.png');
INSERT INTO `dt_category` VALUES ('20', '1', '亲子时光', '/images/category/20.png');
INSERT INTO `dt_category` VALUES ('21', '1', '运动健身', '/images/category/21.png');
INSERT INTO `dt_category` VALUES ('22', '1', '回购榜单', '/images/category/22.png');
INSERT INTO `dt_category` VALUES ('23', '1', '装修好物', '/images/category/23.png');
INSERT INTO `dt_category` VALUES ('24', '1', '夏日解暑', '/images/category/24.png');
INSERT INTO `dt_category` VALUES ('25', '2', '淋浴花洒', '/images/category/25.png');
INSERT INTO `dt_category` VALUES ('26', '2', '浴霸吊顶', '/images/category/26.png');
INSERT INTO `dt_category` VALUES ('27', '2', '马桶', '/images/category/27.png');
INSERT INTO `dt_category` VALUES ('28', '2', '水槽', '/images/category/28.png');
INSERT INTO `dt_category` VALUES ('29', '2', '厨卫龙头', '/images/category/29.png');
INSERT INTO `dt_category` VALUES ('30', '2', '厨卫收纳', '/images/category/30.png');
INSERT INTO `dt_category` VALUES ('31', '2', '饮水工具', '/images/category/31.png');
INSERT INTO `dt_category` VALUES ('32', '2', '浴室柜', '/images/category/32.png');
INSERT INTO `dt_category` VALUES ('33', '2', '浴缸', '/images/category/33.png');
INSERT INTO `dt_category` VALUES ('34', '2', '门窗地板吊顶', '/images/category/34.png');
INSERT INTO `dt_category` VALUES ('35', '2', '客厅家具', '/images/category/35.png');
INSERT INTO `dt_category` VALUES ('36', '2', '儿童家具', '/images/category/36.png');

-- ----------------------------
-- Table structure for dt_order
-- ----------------------------
DROP TABLE IF EXISTS `dt_order`;
CREATE TABLE `dt_order` (
  `id` varchar(10) NOT NULL,
  `name` varchar(20) NOT NULL,
  `account` int(11) NOT NULL,
  `orderTime` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pay` int(1) NOT NULL DEFAULT '0',
  `addressId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_order_addressId` (`addressId`),
  KEY `fk_order_name` (`name`),
  CONSTRAINT `fk_order_addressId` FOREIGN KEY (`addressId`) REFERENCES `dt_address` (`id`),
  CONSTRAINT `fk_order_name` FOREIGN KEY (`name`) REFERENCES `dt_user` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dt_order
-- ----------------------------
INSERT INTO `dt_order` VALUES ('MI12980810', 'zhangsan', '8350', '2020-12-14 09:49:23.350', '1', '33');
INSERT INTO `dt_order` VALUES ('MI54990637', 'zhangsan', '0', '2020-12-10 23:18:00.374', '0', '32');
INSERT INTO `dt_order` VALUES ('MI66410123', 'zhangsan', '7995', '2020-12-10 23:28:44.780', '1', '32');
INSERT INTO `dt_order` VALUES ('MI7173051', 'zhangsan', '0', '2020-12-10 21:35:40.591', '0', '32');
INSERT INTO `dt_order` VALUES ('MI77999861', 'zhangsan', '977', '2020-12-10 23:17:24.517', '0', '32');
INSERT INTO `dt_order` VALUES ('MI9077852', 'zhangsan', '599', '2020-12-10 23:19:37.861', '0', '32');

-- ----------------------------
-- Table structure for dt_order_detail
-- ----------------------------
DROP TABLE IF EXISTS `dt_order_detail`;
CREATE TABLE `dt_order_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderId` varchar(10) NOT NULL,
  `pid` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_order_detail_orderId` (`orderId`),
  KEY `fk_order_detail_pid` (`pid`),
  CONSTRAINT `fk_order_detail_orderId` FOREIGN KEY (`orderId`) REFERENCES `dt_order` (`id`),
  CONSTRAINT `fk_order_detail_pid` FOREIGN KEY (`pid`) REFERENCES `dt_product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dt_order_detail
-- ----------------------------
INSERT INTO `dt_order_detail` VALUES ('32', 'MI77999861', '10', '1');
INSERT INTO `dt_order_detail` VALUES ('34', 'MI9077852', '2', '1');
INSERT INTO `dt_order_detail` VALUES ('35', 'MI66410123', '1', '5');
INSERT INTO `dt_order_detail` VALUES ('39', 'MI12980810', '1', '2');
INSERT INTO `dt_order_detail` VALUES ('40', 'MI12980810', '10', '2');

-- ----------------------------
-- Table structure for dt_product
-- ----------------------------
DROP TABLE IF EXISTS `dt_product`;
CREATE TABLE `dt_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cid` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `avatar` varchar(100) NOT NULL,
  `brief` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `sale` int(11) NOT NULL,
  `rate` int(11) NOT NULL,
  `bannerImgs` text,
  `otherImgs` text,
  PRIMARY KEY (`id`),
  KEY `fk_cid` (`cid`),
  CONSTRAINT `fk_cid` FOREIGN KEY (`cid`) REFERENCES `dt_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dt_product
-- ----------------------------
INSERT INTO `dt_product` VALUES ('1', '17', '小米电视4A 55英寸', '/images/product/01.png', '极致超窄边框，4K超高清，蓝牙语音遥控，人工智能操作系统', '1599.00', '534', '2747', '/images/product/banner001.jpg,/images/product/banner002.jpeg,/images/product/banner003.jpeg,/images/product/banner004.jpeg,/images/product/banner005.jpeg', '/images/product/other001.jpg,/images/product/other002.jpg,/images/product/other003.jpg,/images/product/other004.jpg,/images/product/other005.jpg,/images/product/other006.jpg,/images/product/other007.jpg,/images/product/other008.jpg,/images/product/other009.jpg,/images/product/other010.jpg');
INSERT INTO `dt_product` VALUES ('2', '17', '小米电视4C 32英寸', '/images/product/02.png', '卧室推荐，人工智能系统', '599.00', '245', '2887', null, null);
INSERT INTO `dt_product` VALUES ('3', '17', '小米电视4A 60英寸', '/images/product/03.png', '4K HDR 超高清/ 人工智能语音 / 2G+8G大存储', '1899.00', '65', '688', null, null);
INSERT INTO `dt_product` VALUES ('4', '17', '小米电视4C 43英寸', '/images/product/04.png', '人工智能，钢琴烤漆，杜比音效，杜比音效，海量片源', '999.00', '1000', '2738', null, null);
INSERT INTO `dt_product` VALUES ('5', '17', '小米电视4A 70英寸', '/images/product/05.png', '人工智能语音系统，4K HDR，内置小爱同学，海量片源', '2999.00', '666', '2912', null, null);
INSERT INTO `dt_product` VALUES ('6', '17', '小米全面屏电视55英寸 E55X', '/images/product/06.png', '全面屏，内置小爱同学，64位四核处理器，海量内容，大存储空间', '1599.00', '46', '2319', null, null);
INSERT INTO `dt_product` VALUES ('7', '17', 'Redmi 智能电视 X65', '/images/product/07.png', '全金属边框，全面屏97%高屏占比，4K高清，MEMC运动补偿', '2999.00', '4', '2399', null, null);
INSERT INTO `dt_product` VALUES ('8', '17', '小米电视4A 50英寸', '/images/product/08.png', '4KHDR，人工智能语音遥控，海量片源，2G+8G大存储', '1399.00', '523', '226', null, null);
INSERT INTO `dt_product` VALUES ('9', '17', '小米全面屏电视65英寸 E65C', '/images/product/09.png', '全面屏高屏占比，4K HDR，内置小爱同学，大存储空间', '2499.00', '224', '1340', null, null);
INSERT INTO `dt_product` VALUES ('10', '17', '小米全面屏电视43英寸 E43K', '/images/product/10.png', '全面屏，全高清分辨率，海量内容，1G+8G大存储空间', '977.00', '27', '333', null, null);
INSERT INTO `dt_product` VALUES ('11', '17', 'Redmi 智能电视 X50', '/images/product/11.png', '金属全面屏,MEMC运动补偿，远场语音+AI0T控制，超高清', '1799.00', '795', '29', null, null);
INSERT INTO `dt_product` VALUES ('12', '17', 'Redmi 红米电视 70英寸  R70A', '/images/product/12.png', '70英寸巨屏,4K HDR , 2GB+16GB大存储', '2999.00', '88', '1725', null, null);
INSERT INTO `dt_product` VALUES ('13', '17', '小米电视4A 65英寸', '/images/product/13.png', '极致超窄边框，4K超高清，HDR，蓝牙语音遥控，海量片源', '2499.00', '676', '2667', null, null);
INSERT INTO `dt_product` VALUES ('14', '17', '小米全面屏电视E32C', '/images/product/14.png', '智能家居控制中心，PatchWall，海量内容，DTS解码', '699.00', '1232', '1099', null, null);
INSERT INTO `dt_product` VALUES ('15', '17', '小米全面屏电视 43英寸PRO E43S', '/images/product/15.png', '全面屏设计，内置小爱同学，4K超高清画质，支持8K视频内容', '1499.00', '976', '917', null, null);
INSERT INTO `dt_product` VALUES ('16', '17', '小米全面屏电视43英寸 E43X', '/images/product/16.png', '全面屏高屏占比，内置小爱同学，海量内容满足全家人需求', '1099.00', '576', '432', null, null);

-- ----------------------------
-- Table structure for dt_user
-- ----------------------------
DROP TABLE IF EXISTS `dt_user`;
CREATE TABLE `dt_user` (
  `name` varchar(20) NOT NULL,
  `pwd` varchar(20) NOT NULL,
  `phone` varchar(11) NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dt_user
-- ----------------------------
INSERT INTO `dt_user` VALUES ('user1', '123', '13888888999');
INSERT INTO `dt_user` VALUES ('zhangsan', '123', '13888888888');

-- ----------------------------
-- View structure for order_product_address
-- ----------------------------
DROP VIEW IF EXISTS `order_product_address`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `order_product_address` AS select `t1`.`id` AS `orderId`,`t1`.`name` AS `uName`,`t1`.`account` AS `account`,`t1`.`orderTime` AS `orderTime`,`t1`.`addressId` AS `addressId`,`t1`.`pay` AS `pay`,`t4`.`receiveName` AS `receiveName`,`t4`.`receivePhone` AS `receivePhone`,`t4`.`receiveRegion` AS `receiveRegion`,`t4`.`receiveDetail` AS `receiveDetail`,`t2`.`count` AS `count`,`t3`.`id` AS `id`,`t3`.`cid` AS `cid`,`t3`.`name` AS `name`,`t3`.`avatar` AS `avatar`,`t3`.`brief` AS `brief`,`t3`.`price` AS `price`,`t3`.`sale` AS `sale`,`t3`.`rate` AS `rate`,`t3`.`bannerImgs` AS `bannerImgs`,`t3`.`otherImgs` AS `otherImgs` from ((((select `dt_order`.`id` AS `id`,`dt_order`.`name` AS `name`,`dt_order`.`account` AS `account`,`dt_order`.`orderTime` AS `orderTime`,`dt_order`.`pay` AS `pay`,`dt_order`.`addressId` AS `addressId` from `dt_order`) `t1` join (select `dt_order_detail`.`id` AS `id`,`dt_order_detail`.`orderId` AS `orderId`,`dt_order_detail`.`pid` AS `pid`,`dt_order_detail`.`count` AS `count` from `dt_order_detail`) `t2` on((`t1`.`id` = `t2`.`orderId`))) join (select `dt_product`.`id` AS `id`,`dt_product`.`cid` AS `cid`,`dt_product`.`name` AS `name`,`dt_product`.`avatar` AS `avatar`,`dt_product`.`brief` AS `brief`,`dt_product`.`price` AS `price`,`dt_product`.`sale` AS `sale`,`dt_product`.`rate` AS `rate`,`dt_product`.`bannerImgs` AS `bannerImgs`,`dt_product`.`otherImgs` AS `otherImgs` from `dt_product`) `t3` on((`t2`.`pid` = `t3`.`id`))) join (select `dt_address`.`id` AS `id`,`dt_address`.`name` AS `name`,`dt_address`.`receiveName` AS `receiveName`,`dt_address`.`receivePhone` AS `receivePhone`,`dt_address`.`receiveRegion` AS `receiveRegion`,`dt_address`.`receiveDetail` AS `receiveDetail`,`dt_address`.`isDefault` AS `isDefault` from `dt_address`) `t4` on((`t1`.`addressId` = `t4`.`id`))) ;

-- ----------------------------
-- Procedure structure for p_addProductToCart
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_addProductToCart`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `p_addProductToCart`(
	_name varchar(20),
	_pid int,
	_count int
)
BEGIN
  DECLARE _curCount INT DEFAULT NULL;
	SELECT `count` INTO _curCount FROM `dt_cart` WHERE `pid` = _pid AND `name` = _name;
	IF _curCount IS NULL THEN	-- 如果没有在购物车中存在
		IF _count > 5 THEN
			SELECT '单个商品购买上限为5个' AS 'result';
		ELSE 
			INSERT `dt_cart`(`name`,`pid`,`count`) 
			VALUES(_name, _pid, _count);
			SELECT '' AS 'result';
		END IF;
	ELSE 											-- 如果已经在购物车中存在
		IF _curCount + _count > 5 THEN
			SELECT '单个商品购买上限为5个' AS 'result';
		ELSE
			UPDATE `dt_cart` SET `count` = `count` + _count 
			WHERE `pid` = _pid AND `name` = _name;
			SELECT '' AS 'result';
		END IF;
	END IF;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for p_getProduct
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_getProduct`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `p_getProduct`(
	_name VARCHAR(20),
	_cid INT,
	_orderCol VARCHAR(20),
	_orderDir VARCHAR(10),
  _begin INT,
  _pageSize INT
)
BEGIN
	SET @whereSql = 'where 1 = 1';
	
	IF _name != '' THEN 
		SET @whereSql = CONCAT(@whereSql, ' AND `name` LIKE ''%', _name, '%''');
	ELSEIF _cid != 0 THEN
		SET @whereSql = CONCAT(@whereSql, ' AND `cid` = ', _cid);
	END IF;

-- 	SET @selectSql = 'SELECT * FROM `dt_product` ';
	SET @selectSql = CONCAT(
		'SELECT * FROM `dt_product` ', 
		@whereSql, 
		' ORDER BY ', _orderCol, ' ', _orderDir,
		' LIMIT ', _begin, ',', _pageSize
	);

	PREPARE selectStmt FROM @selectSql;
	EXECUTE selectStmt;
	DEALLOCATE PREPARE selectStmt;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for p_orderConfirm
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_orderConfirm`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `p_orderConfirm`(
	_ids varchar(50),						-- 要结算的购物记录id
	_account int,								-- 结算的总金额
	_orderTime varchar(30),	    -- 订单产生时间
	_name varchar(20),					-- 用户名
	_addressId int              -- 订单地址id
)
BEGIN
	DECLARE _pid INT;
	DECLARE _count INT;
	DECLARE _id varchar(10) DEFAULT '';
	-- 0. 生成一个随机的有效的课单编号id
	DECLARE _orderId varchar(10);
  SET _orderId = CONCAT('MI', CONVERT(FLOOR(RAND() * 100000000),CHAR));
	-- 1. 向dt_order表插入数据
	INSERT `dt_order`(`id`,`name`,`account`,`orderTime`,`addressId`) 
	VALUES (_orderId,_name,_account,_orderTime,_addressId);
	-- 2. 向dt_order_detail表插入数据
  -- 3. 删除dt_cart表的相关数据
	SET _id = substring_index(_ids, ',', 1);
	WHILE LENGTH(_id) > 0 DO
			SELECT `pid`,`count` INTO _pid,_count FROM `dt_cart` WHERE `id` = CONVERT(_id, SIGNED);
			INSERT `dt_order_detail`(`orderId`,`pid`,`count`) VALUES (_orderId,_pid,_count);

			DELETE FROM `dt_cart` WHERE `id` = CONVERT(_id, SIGNED);
			SET _ids = substring(_ids, length(_id) + 2);
			SET _id = substring_index(_ids, ',', 1);
	END WHILE;
	SELECT _orderId as 'orderId';
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for p_register
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_register`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `p_register`(
	_name varchar(50),		-- 用户名
	_pwd int,							-- 密码
	_phone varchar(30)	  -- 电话号码
)
BEGIN
	DECLARE temp INT DEFAULT 0;
	DECLARE result varchar(20) DEFAULT '';

	SELECT count(*) INTO temp FROM `dt_user` WHERE `name` = _name;
	IF temp != 0 THEN
		SET result = '用户名已存在';
	END IF;
	SELECT count(*) INTO temp FROM `dt_user` WHERE `phone` = _phone;
	IF temp != 0 THEN
		SET result = '手机号已被使用';
	END IF;
	IF result = '' THEN
		insert into `dt_user`(`name`,`pwd`,`phone`) values(_name,_pwd,_phone);
	END IF;
	SELECT result as result;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for p_removeAddress
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_removeAddress`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `p_removeAddress`(
	_id INT
)
BEGIN
	DECLARE temp INT DEFAULT 0;
	DECLARE result varchar(50) DEFAULT '';
	-- 统计出有没有其它分类依赖于当前要删除的分类
	SELECT COUNT(*) INTO temp FROM `dt_order` WHERE `addressId` = _id;
	IF temp > 0 THEN
		SET result = '有订单与要删除的地址相关，无法删除..';
	ELSE 
		DELETE FROM `dt_address` WHERE `id` = _id;
	END IF;
	SELECT result;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for p_removeOrder
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_removeOrder`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `p_removeOrder`(
	_id varchar(10)
)
BEGIN
	DELETE FROM `dt_order_detail` WHERE `orderId` = _id;
	DELETE FROM `dt_order` WHERE `id` = _id;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for p_setDefaultAddress
-- ----------------------------
DROP PROCEDURE IF EXISTS `p_setDefaultAddress`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `p_setDefaultAddress`(
	_id int,					-- 默认地址id
	_name varchar(20) -- 用户名
)
BEGIN
	UPDATE `dt_address` SET `isDefault` = 0 WHERE `name` = _name;
	UPDATE `dt_address` SET `isDefault` = 1 WHERE `id` = _id;
END
;;
DELIMITER ;
