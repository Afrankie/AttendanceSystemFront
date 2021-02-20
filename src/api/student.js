import request from '@/utils/request'


export default{
  //考勤记录列表
  getUserList(UserListVO){
    return request({
      // url:'/eduservice/eduTeacher/pageTeacherByCondition/'+current+'/'+size,
      //url:`/record/list/${current}/${size}`,
      url:'/user/list',
      method:'post',
      //RecordListVO是条件对象，后端使用RequestBody接收，需要使用data
      data: UserListVO
    })
  }
}