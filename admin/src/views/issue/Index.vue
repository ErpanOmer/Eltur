<template>
  <div id="issue">
    <el-container>
      <el-header>
        <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
          <el-tab-pane label="最新" name="new"></el-tab-pane>
          <el-tab-pane label="已回复" name="alreadyAnswered"></el-tab-pane>
        </el-tabs>
      </el-header>
      <el-main v-loading="listLoading" element-loading-text="给我一点时间">
        <el-row :gutter="20">
          <el-col :span="12" v-for="(item, index) in list" :key="item.id">
            <el-card :body-style="{ padding: '0px' }">
              <div slot="header" class="clearfix">
                <img :src="item.cover" class="cover">
                <span v-text="item.name" class="name"></span>
                <el-tag type="warning" v-text="itemList[item.category]" class="tag"></el-tag>
              </div>
              <div style="padding: 10px 15px 15px;">
                <div class="content">
                  <p>问题描述:</p>
                  <p v-text="item.question" style="margin-top:5px;color: #666;"></p>
                </div>
                <div>
                  <el-button type="primary" v-if="!item.alreadyAnswered" size="mini" @click="openReply(item)">回复</el-button>
                  <el-button size="mini" type="danger" @click="open()">删除</el-button>
                  <el-button type="text" v-text="formatTime(item.createdTime)" style="float:right;padding: 6px;"></el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
      <el-footer>
        <div class="pagination-container">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
            :page-sizes="[10,25,50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </el-footer>
    </el-container>
    <el-dialog title="问题回复" :visible.sync="dialogReply">
      <el-form :model="replyData">
        <el-tag type="warning" v-text="itemList[replyData.category]" class="tag"></el-tag>
        <el-form-item label="问题描述:"></el-form-item>
        <p v-text="replyData.question"></p>
        <el-form-item label="回复内容:" style="margin-bottom: 7.5px;"></el-form-item>
        <el-input type="textarea" v-model="replyData.answerText" rows="5"></el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogReply = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </div>
   </el-dialog>
  </div>
</template>
<script>
import { getIssue, replyIssue } from '@/api/issue'
import { formatTime } from '@/utils'
import { isEmptyParam } from '@/utils/validate'
export default {
  name: 'issue',
  data: () => ({
    itemList: ['推荐', '婚姻家庭', '交通事故', '劳动用工', '治安刑事', '医疗事故', '房产土地', '责权责务', '合同纠纷', '征地拆迁'],
    listLoading: false,
    activeName: 'new',
    listQuery: {
      page: 1,
      pageSize: 10,
      key: 'alreadyAnswered',
      value: 'false',
      type: 'eq'
    },
    total: null,
    list: [],
    dialogReply: false,
    replyData: {}
  }),
  mounted() {
    //  do something after mounting vue instance
    this.$nextTick(() => {
      this.getList()
    })
  },
  methods: {
    openReply: function(item) {
      this.replyData = item
      this.dialogReply = true
    },
    submit: function() {
      if (isEmptyParam(this.replyData.answerText)) {
        this.$message.error('恢复内容不要留空!')
        return false
      }
      const data = {
        id: this.replyData.id,
        answerText: this.replyData.answerText
      }
      replyIssue(data).then(response => {
        if (response.success && response.code) {
          this.$message({
            type: 'success',
            message: '回复成功'
          })
          this.dialogReply = false
        }
      })
    },
    open: function() {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    formatTime: formatTime,
    getList: function() {
      this.listLoading = true
      getIssue(this.listQuery).then(response => {
        console.log(response.list)
        this.list = response.list
        this.total = response.totalCount
        this.listLoading = false
      })
    },
    handleClick: function(tab) {
      if (Number(tab.index) === 0) {
        this.listQuery.value = 'false'
      } else {
        this.listQuery.value = 'true'
      }
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
    }
  }
}
</script>
<style lang="scss">
  #issue {
    box-sizing: border-box;
    padding: 15px 0;
    .el-dialog__body {
      padding: 5px 20px;
      .el-form-item {
        margin: 0;
      }
      p {
        margin: 0;
      }
    }
    .el-main {
      padding-top: 0;
    }
    .el-col {
      margin-bottom: 20px;
    }
    .el-card {
      .el-card__header {
        padding: 10px 15px;
        .cover {
          width: 60px;
          height: 60px;
          overflow: hidden;
          border-radius: 12px;
          vertical-align: middle;
        }
        .name {
          margin-left: 10px;
          color: #ffa500;
        }
        .tag {
          float: right;
          margin-top: 14px;
        }
      }
      .content {
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
        margin-bottom: 10px;
        p {
          margin: 0;
          font-size: 14px;
          line-height: 24px;
          color: #333;
        }
      }
    }
  }
  .time {
     font-size: 13px;
     color: #999;
   }

   .bottom {
     margin-top: 13px;
     line-height: 12px;
   }

   .button {
     padding: 0;
     float: right;
   }

   .clearfix:before,
   .clearfix:after {
       display: table;
       content: "";
   }

   .clearfix:after {
       clear: both
   }
</style>
