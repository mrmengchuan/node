
module.exports = {
    LogDir: "/../log/", //日志目录
	RELEASE: true, // 是否为发布状态

	CONFIG: {
		db_name: "db_qr_code",
	},

	BEBUG_CONFIG: {
		db_name: "db_qr_code",
       host: "test-healthiptv.langma.cn",
       //  host: "10.254.30.100",
        // serverUrl: "http://10.254.30.100:8015/addData"
	},

	TABLE:{
		blood_user: "t_user_info_blood",
		address_user:"t_user_address_draw"
	},
};
