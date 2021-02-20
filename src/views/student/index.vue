<template>
	<div>
		<!-- 查询条件 -->
		<el-form :inline="true" :model="userListVO">
		  <el-form-item>
		    <el-input v-model="userListVO.uName" placeholder="学生姓名" clearable></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-input v-model="userListVO.sId" placeholder="学号" clearable></el-input>
		  </el-form-item>
			
		  <el-form-item>
		    <el-button type="primary" @click="getList(userListVO.page)">查询</el-button>
		    <!-- <el-button type="default" @click="resetData()">清空</el-button> -->
		  </el-form-item>
		</el-form>
		
		<!-- 显示列表 -->
		<el-table
		    :data="list"
		    border
		    style="width: 100%">
			<el-table-column
				label="序号"
				width="120">
				<template scope="scope">
					{{(userListVO.page-1)*userListVO.pageSize+(scope.$index + 1)}}
				</template>
			</el-table-column>
		    <el-table-column
		      prop="sId"
		      label="学号"
		      width="120">
		    </el-table-column>
		    <el-table-column
		      prop="uName"
		      label="姓名"
		      width="120">
		    </el-table-column>
		    <!-- <el-table-column
		      prop="level"
		      label="头衔"
		      width="300">
			  前端根据后台传的数据进行处理后显示，可以如下写法：
			  <template slot-scope='scope'>
				  scope.row表示每行
				  {{scope.row.level===1?'高级讲师':'首席讲师'}}  
			  </template>
		    </el-table-column> -->
			
			<!-- fixed="right" -->
		    <el-table-column
		      label="操作"
		      width="150">
		      <template slot-scope="scope">
		        <el-button v-if="scope.row.pictureFlag===0" @click="showFace(scope.row)" type="text" size="small">
		        	<a target="_blank" v-if="scope.row.pictureFlag===0" :href="scope.row.uFacePath">
		        		查看人脸
          			</a>
		    	</el-button>
            		
		        <el-button v-if="scope.row.pictureFlag===0" @click="resetFace(scope.row)" type="text" size="small">重置人脸</el-button>
		        
		        <span v-if="scope.row.pictureFlag===1">
		        	未上传人脸
		        </span>

		      </template>
		    </el-table-column>
		  </el-table>
          <!-- 分页 current-page、page-size、total要绑定数据 @current-change表示当前页变化时请求getList方法,会把current-page的值传到getList方法中的page参数-->
		  <el-pagination
			 @size-change="handlePageSizeChange"
			 @current-change="getList"
			 :current-page="1"
			 :page-size="10"
			 :page-sizes="[10, 30, 50]"
			 :total="total"
		     background
		     layout="prev, pager, next, sizes"
			/>
	</div>
</template>


<script>
	//引入teacher.js文件
	import rec from '@/api/student'  //.js可以省略
	import user from '@/api/user'
	//核心代码
	export default{
		// data:{
			
		// },  或使用下面的写法
		data(){  
			return{
				columns:null,
				list:null,  //接收接口返回的数据
				total:0,  //总记录数
				userListVO:{
					page:1,
					pageSize : 10
				}
			}
		},
		created(){  //页面渲染之前执行，一般用于调用methods中定义的方法
			this.getList();
		},
		methods:{  //定义具体的方法，调用teacher.js中的方法
			getList(page = 1){  //不用写axios发送请求，vue进行了封装，直接调用api中的方法即可
                this.userListVO.page = page;
			    rec.getUserList(this.userListVO)
				.then(response=>{
					this.list = response.content.list;
					this.total = response.content.total;
					this.columns = response.content.columns;
				})
				.catch(error=>{
					console.log(error);
				})
			},
			handlePageSizeChange(pageSize) {
				this.userListVO.pageSize = pageSize;
			},
			//清空条件，并查询所有
			resetData(){
				//清空表单数据
				this.recordListVO = {
					page:1,
					pageSize : 10
				}
				//空条件查询、
				this.getList()
			},
			showFace(rowData){
				// console.log("showFace : " + JSON.stringify(rowData));
			},
			resetFace(rowData){
				user.resetFace({'uId' : rowData.id})
				.then(response=>{
					if (response.status === 200) {
						this.$notify({
		                  title: '重置成功',
		                  type: 'success'
		                })
            			this.$router.push('/user/list')
					} else {
						this.$notify.error({
		                  title: '重置失败',
		                  type: 'success'
		                })
					}
				})
				.catch(error=>{
					this.$notify.error({
		                title: '重置失败 catch',
		            	message: error.msg,
		            });
					console.log(error)
				})
			}

		}
	}
</script>

<style>
</style>
