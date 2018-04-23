<template>
  <div id="swiper">
    <el-container>
      <el-main>
        <el-carousel :interval="3000" type="card" height="300px">
          <el-carousel-item v-for="item in list" :key="item">
            <div :style="'height: 300px;background:url(' + item + ') center center no-repeat;background-size: cover;'"></div>
          </el-carousel-item>
        </el-carousel>
      </el-main>
      <el-footer>
        <div style="margin:20px auto;text-align: center;">
          <el-button type="primary" v-waves icon="el-icon-plus" @click="dialogSwiper=true">增加轮播图</el-button>
          <el-button type="primary" v-waves @click="ok()">确定</el-button>
        </div>
        <el-table :data="list" row-key="id"  v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
          <el-table-column align="center" label="序号" width="65px">
            <template slot-scope="scope">
              <span>{{scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="轮播图">
            <template slot-scope="scope">
              <div :style="'height: 100px;width:150px;background:url(' + scope.row + ') center center no-repeat;background-size: cover;margin: 0 auto;'"></div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="上传时间">
            <template slot-scope="scope">
              <span>2018-4-23</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作"class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button type="primary" size="mini">查看</el-button>
              <el-button size="mini" type="success">修改</el-button>
              <el-button size="mini" type="danger" @click="open(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- $t is vue-i18n global function to translate lang (lang in @/lang)  -->
        <!-- <div class='show-d'>{{list}}</div>
        <div class='show-d'>{{newList}}</div> -->
      </el-footer>
    </el-container>
    <el-dialog title="轮播图上传" :visible.sync="dialogSwiper">
      <el-form class="form-container" ref="newsData">
        <el-form-item style="margin-bottom: 30px;margin-left: -45px;text-align:center;" label-width="45px">
          <el-upload
            class="avatar-uploader"
            action="http://www.eltur.cn/elturAdmin/upload"
            :headers="headers"
            name="file"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="temp" :src="temp" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSwiper = false;temp='';">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </div>
   </el-dialog>
  </div>
</template>
<script>
import Sortable from 'sortablejs'
import waves from '@/directive/waves' // 水波纹指令
import { getToken } from '@/utils/auth'
import Upload from '@/components/Upload/singleImage3'
import { getSwiper, postSwiper } from '@/api/swiper'
export default {
  name: 'swiper',
  directives: {
    waves
  },
  components: {
    Upload
  },
  data: () => ({
    list: [],
    listLoading: false,
    newList: [],
    dialogSwiper: false,
    temp: ''
  }),
  computed: {
    headers: function() {
      return { 'Authorization': getToken() }
    }
  },
  mounted() {
    this.newList = this.list
    //  do something after mounting vue instance
    this.$nextTick(() => {
      this.setSort()
    })
  },
  methods: {
    ok: function() {
      postSwiper({ list: this.list }).then(response => {
        console.log(response)
      })
    },
    handleAvatarSuccess(response, file) {
      if (response.code === 520 && response.success) {
        this.$message.success('上传成功')
        this.temp = response.url
      } else {
        this.$message.error('上传失败')
      }
    },
    beforeAvatarUpload(file) {
      const isImage = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isImage) {
        this.$message.error('上传图片只能是 JPG 或者 PNG 格式!')
        return
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
        return
      }
      return isImage && isLt2M
    },
    submit: function() {
      this.$set(this.list, this.list.length, this.temp)
      this.temp = ''
      this.dialogSwiper = false
    },
    open: function(index) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.list.splice(index, 1)
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    setSort() {
      const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        onEnd: evt => {
          const targetRow = this.list.splice(evt.oldIndex, 1)[0]
          this.list.splice(evt.newIndex, 0, targetRow)

          // for show the changes, you can delete in you code
          const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
          this.newList.splice(evt.newIndex, 0, tempIndex)
        }
      })
    }
  }
}
</script>
<style media="screen">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  max-width: 100%;
  height: auto;
  display: block;
}
</style>
