// Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
const mongoose = require('mongoose');
// 连接数据库 如果不自己创建 默认test数据库会自动生成
mongoose.connect('mongodb://localhost/attendance');

// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error',() => console.log('Mongo connection error'));
db.once('open',() => console.log('Mongo connection successed'));


/**
 *成员 
 */
const memberSchema = new mongoose.Schema({
	userId : String,
    account : String,
    memberType:String
});


/**
 * 考勤记录
 */
var absenceLogSchema = new mongoose.Schema(
    {
        id: mongoose.Schema.Types.ObjectId,
        member: String,
        absenceTypeValue:String,
        absenceDateRange:String,
        absenceCount:String,
        state:Boolean   
    }
);

/************** 定义模型Model **************/
const Models = {
    memberSchema: memberSchema,
    absenceLogSchema: absenceLogSchema,
    members: mongoose.model("members", memberSchema),
    workLogs: mongoose.model("workLogs", absenceLogSchema)
};
module.exports = Models;