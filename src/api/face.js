import request from '@/utils/request'

export default{
	//考勤记录列表
	canSave(){
		return request({
			// url:'/eduservice/eduTeacher/pageTeacherByCondition/'+current+'/'+size,
			//url:`/record/list/${current}/${size}`,
			url:'/face/canSave',
			method:'get'
		})
	}
}