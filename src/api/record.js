import request from '@/utils/request'

export default{
	//考勤记录列表
	getRecordList(RecordListVO){
		return request({
			// url:'/eduservice/eduTeacher/pageTeacherByCondition/'+current+'/'+size,
			//url:`/record/list/${current}/${size}`,
			url:'/record/list',
			method:'post',
			//RecordListVO是条件对象，后端使用RequestBody接收，需要使用data
			data: RecordListVO
		})
	}
}