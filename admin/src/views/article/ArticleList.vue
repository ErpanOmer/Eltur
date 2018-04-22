<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container" style="padding-bottom:15px;">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="标题">
      </el-input>
      <!-- <el-select clearable style="width: 90px" class="filter-item" placeholder="重要性">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-select clearable class="filter-item" style="width: 130px" placeholder="类型">
        <el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key">
        </el-option>
      </el-select>
      <el-select @change='handleFilter' style="width: 140px" class="filter-item">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select> -->
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <!-- <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">添加</el-button> -->
      <!-- <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">导出</el-button> -->
      <!-- <el-checkbox class="filter-item" style='margin-left:15px;' @change='tableKey=tableKey+1' v-model="showReviewer">审核人</el-checkbox> -->
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-rowstyle="width: 100%">
      <el-table-column align="center" label="序号" width="65">
        <template slot-scope="scope">
          <span>{{scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="发布时间">
        <template slot-scope="scope">
          <span>{{Time(scope.row.createdTime)}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" align="center" label="标题">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)" v-text="scope.row.title"></span>
          <el-tag type="warning" v-text="itemList[scope.row.category]"></el-tag>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" label="来源">
        <template slot-scope="scope">
          <span v-text="scope.row.author?scope.row.author : scope.row.source"></span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="阅读数" width="95">
        <template slot-scope="scope">
          <span v-text="scope.row.pageViews"></span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="点赞数" width="95">
        <template slot-scope="scope">
          <span v-text="scope.row.fabulous"></span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" label="评论数">
        <template slot-scope="scope">
          <span v-text="scope.row.comments.length"></span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <!-- <el-button v-if="scope.row.status!='published'" size="mini" type="success" @click="handleModifyStatus(scope.row,'published')">发布
          </el-button>
          <el-button v-if="scope.row.status!='draft'" size="mini" @click="handleModifyStatus(scope.row,'draft')">草稿
          </el-button> -->
          <el-button size="mini" type="danger" @click="handleDelete(scope.row,'deleted')">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-sizes="[10,25,50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="类型" prop="category">
          <el-select class="filter-item" v-model="temp.category" placeholder="Please select">
            <el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间" prop="createdTime">
          <el-date-picker v-model="temp.createdTime" type="date" format="yyyy-MM-dd HH:mm:ss" value-format="timestamp" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="temp.title"></el-input>
        </el-form-item>
        <el-form-item label="来源">
          <el-input v-model="temp.source"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="temp.author"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="updateData(temp)">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
import { getNews, deleteNews, editArticle } from '@/api/article'
import waves from '@/directive/waves' // 水波纹指令
const calendarTypeOptions = [
  { key: 0, display_name: '推荐' },
  { key: 1, display_name: '婚姻家庭' },
  { key: 2, display_name: '交通事故' },
  { key: 3, display_name: '劳动用工' },
  { key: 4, display_name: '治安刑事' },
  { key: 5, display_name: '医疗事故' },
  { key: 6, display_name: '房产土地' },
  { key: 7, display_name: '责权责务' },
  { key: 8, display_name: '合同纠纷' },
  { key: 9, display_name: '征地拆迁' }
]
export default {
  name: 'ArticleList',
  directives: {
    waves
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        pageSize: 10
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {},
      dialogFormVisible: false,
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      pvData: [],
      rules: {
        category: [{ required: true, message: '类型不能为空', trigger: 'change' }],
        createdTime: [{ required: true, message: '发布时间不能为空', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      itemList: ['推荐', '婚姻家庭', '交通事故', '劳动用工', '治安刑事', '医疗事故', '房产土地', '责权责务', '合同纠纷', '征地拆迁'],
      downloadLoading: false
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
    // typeFilter(type) {
    //   return calendarTypeKeyValue[type]
    // }
  },
  created() {
    this.fetchList()
  },
  methods: {
    fetchList() {
      this.listLoading = true
      getNews(this.listQuery).then(response => {
        this.list = response.list
        this.total = response.totalCount
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.fetchList()
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.fetchList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.fetchList()
    },
    // handleModifyStatus(row, status) {
    //   this.$message({
    //     message: '操作成功',
    //     type: 'success'
    //   })
    //   row.status = status
    // },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    Time(time) {
      return parseTime(time, '{y}-{m}-{d} {h}:{i}')
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.createdTime = this.temp.createdTime * 1000
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData: function(item) {
      this.$refs['dataForm'].validate((valid) => {
        const data = {
          source: item.source
        }
        if (valid) {
          editArticle(`${item.id}`, data).then(response => {
            console.log(response)
          })
        }
      })
    },
    handleDelete(row, status) {
      row.status = status
      const id = row.id
      if (id === undefined || id === null) {
        this.$message.error('操作无效')
      } else {
        deleteNews(row.id).then(response => {
          if (response.success && response.code === 520) {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
            const index = this.list.indexOf(row)
            this.list.splice(index, 1)
          } else {
            this.$message.error('删除失败')
          }
        })
      }
    }
    // handleDownload() {
    //   this.downloadLoading = true
    //   import('@/vendor/Export2Excel').then(excel => {
    //     const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
    //     const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
    //     const data = this.formatJson(filterVal, this.list)
    //     excel.export_json_to_excel(tHeader, data, 'table-list')
    //     this.downloadLoading = false
    //   })
    // },
    // formatJson(filterVal, jsonData) {
    //   return jsonData.map(v => filterVal.map(j => {
    //     if (j === 'timestamp') {
    //       return parseTime(v[j])
    //     } else {
    //       return v[j]
    //     }
    //   }))
    // }
  }
}
</script>
