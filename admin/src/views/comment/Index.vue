<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container" style="padding-bottom:15px;">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="评论内容">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-rowstyle="width: 100%">
      <el-table-column align="center" label="序号" width="65">
        <template slot-scope="scope">
          <span>{{scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="评论时间">
        <template slot-scope="scope">
          <span>{{Time(scope.row.createdTime)}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" align="center" label="评论文章">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)" v-text="scope.row.articleTitle"></span>
          <el-tag type="warning" v-text="itemList[scope.row.articlecategory]"></el-tag>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="评论者">
        <template slot-scope="scope">
          <span v-text="scope.row.name"></span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.cover" width="50px" alt="">
        </template>
      </el-table-column>
      <el-table-column min-width="150px" align="center" label="评论内容">
        <template slot-scope="scope">
          <span v-text="scope.row.text"></span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="success">审核</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-sizes="[10,25,50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getComments, deleteComment } from '@/api/comment'
import { parseTime } from '@/utils'
import waves from '@/directive/waves' // 水波纹指令
export default {
  name: 'comment',
  directives: {
    waves
  },
  data: () => ({
    list: [],
    total: null,
    listQuery: {
      page: 1,
      pageSize: 10
    },
    listLoading: false,
    tableKey: 0,
    itemList: ['推荐', '婚姻家庭', '交通事故', '劳动用工', '治安刑事', '医疗事故', '房产土地', '责权责务', '合同纠纷', '征地拆迁']
  }),
  mounted() {
    //  do something after mounting vue instance
    this.getComments()
  },
  methods: {
    handleDelete: function(item) {
      const query = {
        commentId: item.id,
        articleId: item.articleId
      }
      deleteComment(query).then(response => {
        if (response.success && response.code === 520) {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          const index = this.list.indexOf(item)
          this.list.splice(index, 1)
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    getComments: function() {
      this.listLoading = true
      getComments(this.listQuery).then(response => {
        this.list = response.list
        this.total = response.totalCount
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getComments()
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getComments()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getComments()
    },
    Time(time) {
      return parseTime(time, '{y}-{m}-{d} {h}:{i}')
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
