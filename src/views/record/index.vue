<template>
	<div>
		<!-- 查询条件 -->
		<el-form :inline="true" :model="recordListVO">
		  <el-form-item>
		    <el-input v-model="recordListVO.uName" placeholder="学生姓名" clearable></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-input v-model="recordListVO.sId" placeholder="学号" clearable></el-input>
		  </el-form-item>
		  <!-- <el-form-item>
		    <el-select v-model="teacherQuery.level" placeholder="讲师头衔">
		      <el-option label="高级讲师" :value="1"></el-option>
		      <el-option label="首席讲师" :value="2"></el-option>
		    </el-select>
		  </el-form-item> -->
		  <el-form-item>
		  	<el-date-picker
		      v-model="recordListVO.dateRange"
		      type="daterange"
		      value-format="yyyy-MM-dd"
		      range-separator="至"
		      start-placeholder="开始日期"
		      end-placeholder="结束日期">
		    </el-date-picker>
		  </el-form-item>
			
		  <el-form-item>
		    <el-button type="primary" @click="getList(recordListVO.page)">查询</el-button>
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
					{{(recordListVO.page-1)*recordListVO.pageSize+(scope.$index + 1)}}
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
		    <el-table-column
		      prop="createTime"
		      label="考勤时间"
		      width="180">
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

		   <!--  <el-table-column
		      fixed="right"
		      label="操作"
		      width="150">
		      <template slot-scope="scope">
		        <el-button @click="showFace(scope.row)" type="text" size="small">查看人脸</el-button>
		        <el-button @click="resetFace(scope.row)" type="text" size="small">重置人脸</el-button>
		      </template>
		    </el-table-column> -->
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
	import rec from '@/api/record'  //.js可以省略
	//核心代码
	export default{
		// data:{
			
		// },  或使用下面的写法
		data(){  
			return{
				columns:null,
				list:null,  //接收接口返回的数据
				total:0,  //总记录数
				recordListVO:{
					page:1,
					pageSize:10
				}
			}
		},
		created(){  //页面渲染之前执行，一般用于调用methods中定义的方法
			this.getList();
		},
		methods:{  //定义具体的方法，调用teacher.js中的方法
			getList(page=1){  //不用写axios发送请求，vue进行了封装，直接调用api中的方法即可
                this.recordListVO.page = page
			    rec.getRecordList(this.recordListVO)
				.then(response=>{
					this.list = response.content.list
					this.total = response.content.total
					this.columns = response.content.columns
				})
				.catch(error=>{
					console.log(error);
				})
			},
			handlePageSizeChange(pageSize) {
				this.recordListVO.pageSize = pageSize;
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
			}

		}
	}
</script>

<style>
</style>
