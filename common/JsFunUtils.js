/**
 * js 函数操作相关工具
 * @type {{buildFunParamObj: module.exports.buildFunParamObj}}
 */
module.exports = {
    buildFParaObj: function (func, argumentArr) {
        var funcParamArr = [];

        var funcString = func.toString();
        var regExp = /function\s*\w*\(([\s\S]*?)\)/;

        if (regExp.test(funcString)) {
            var argList = RegExp.$1.split(',');
            funcParamArr = argList.map(function (arg) {
                return arg.replace(/\s/g, '');
            });
        }

        var retObj = {};
        for (var i = 0; i < funcParamArr.length; i++) {
            retObj[funcParamArr[i]] = argumentArr[i]
        }

        return retObj;
    },

    /**
     * 生成[n,m]随机数据
     */
    randomNum: function(minNum, maxNum) {
        switch (arguments.length) {
            case 1:
                return parseInt(Math.random() * minNum + 1, 10);
                break;
            case 2:
                return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
                break;
            default:
                return 0;
                break;
        }
    },
};
