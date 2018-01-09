<template>
  <div class="createPost-container">
    <el-form class="form-container" :model="newsData"  ref="newsData">
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24" style="text-align:right;">
            <el-button type="primary" icon="el-icon-edit-outline"@click="submitForm()">发布</el-button>
            <el-button type="danger" icon="el-icon-circle-close-outline">取消</el-button>
          </el-col>
          <el-col :span="24">
            <el-form-item style="margin-bottom: 30px;" prop="title">
              <MDinput name="name" v-model="newsData.title" required :maxlength="100">
                标题
              </MDinput>
              <span v-show="newsData.title.length>=26" class='title-prompt'>app可能会显示不全</span>
            </el-form-item>
            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="45px" style="text-align:left;" label="作者:">
                      <el-select v-model="newsData.author" placeholder="请选择作者">
                        <el-option :label="name" :value="name"></el-option>
                      </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-tooltip class="item" effect="dark" content="将替换作者" placement="top">
                    <el-form-item label-width="50px" label="来源:" class="postInfo-container-item">
                      <el-input placeholder="将替换作者" style='min-width:150px;' v-model="newsData.sourceName">
                      </el-input>
                    </el-form-item>
                  </el-tooltip>
                </el-col>

                <el-col :span="8">
                  <el-form-item label-width="80px" label="发布时间:" class="postInfo-container-item">
                    <el-date-picker v-model="newsData.createdTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-form-item style="margin-bottom: 30px;" label-width="45px" label="摘要:">
          <el-input type="textarea" class="article-textarea" :rows="1" autosize placeholder="请输入内容" v-model="newsData.contentShort">
          </el-input>
          <span class="word-counter" v-show="contentShortLength">{{contentShortLength}}字</span>
        </el-form-item>
        <el-form-item style="margin-bottom: 30px;" label-width="45px" label="封面:">
          <el-upload
            class="avatar-uploader"
            action="http://www.eltur.cn/elturAdmin/upload"
            :headers="headers"
            name="cover"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="newsData.cover" :src="newsData.cover" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <div class="editor-container">
          <tinymce :height=400 ref="editor" v-model="newsData.content"></tinymce>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/singleImage3'
import MDinput from '@/components/MDinput'
import Multiselect from 'vue-multiselect'// 使用的一个多选框组件，element-ui的select不能满足所有需求
import 'vue-multiselect/dist/vue-multiselect.min.css'// 多选框组件css
import Sticky from '@/components/Sticky' // 粘性header组件
import { postNews } from '@/api/news'
import { getToken } from '@/utils/auth'
import { isEmptyParam } from '@/utils/validate'
export default {
  name: 'articleDetail',
  components: { Tinymce, MDinput, Upload, Multiselect, Sticky },
  data() {
    return {
      fetchSuccess: true,
      loading: false,
      newsData: {
        author: '',
        title: '', // 文章题目
        content: '', // 文章内容
        contentShort: '', // 文章摘要
        sourceName: '', // 来源
        cover: '', // 文章图片
        createdTime: undefined // 前台展示时间
      }
    }
  },
  computed: {
    contentShortLength() {
      return this.newsData.contentShort.length
    },
    name: function() {
      return this.$store.getters.name
    },
    headers: function() {
      return { 'Authorization': getToken() }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$store.dispatch('GetInfo').then(() => {
      }).catch(() => {
        this.$router.push('Login')
        console.log('获取用户信息失败')
      })
    })
  },
  methods: {
    handleAvatarSuccess(response, file) {
      if (response.code === 520 && response.success) {
        this.$message.success('上传成功')
        this.newsData.cover = response.url
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
    fetchData() {
    },
    submitForm() {
      const data = this.newsData
      if (isEmptyParam(data.title)) {
        this.$message.error('请输入标题！')
        return false
      }
      if (isEmptyParam(data.author) && isEmptyParam(data.sourceName)) {
        this.$message.error('请输入作者！')
        return false
      }
      // if (isEmptyParam(data.cover)) {
      //   this.$message.error('请上传封面')
      //   return false
      // }
      if (isEmptyParam(data.content)) {
        this.$message.error('请输入新闻内容')
        return false
      }
      data.author = isEmptyParam(data.sourceName) ? data.author : data.sourceName
      data.createdTime = isNaN(data.createdTime) ? parseInt(new Date().getTime()) : data.createdTime
      console.log(data)
      postNews(data).then(response => {
        console.log(response)
        if (response.code === 520 && response.success) {
          this.$message.success('发布成功')
        } else {
          this.$message.error('发布失败！')
        }
      }).catch(err => {
        this.fetchSuccess = false
        console.log(err)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .title-prompt{
    position: absolute;
    right: 0px;
    font-size: 12px;
    top:10px;
    color:#ff4949;
  }
  .createPost-container {
    position: relative;
    .createPost-main-container {
      padding: 40px 45px 20px 50px;
      .postInfo-container {
        position: relative;
        @include clearfix;
        margin-bottom: 10px;
        .postInfo-container-item {
          float: left;
        }
      }
      .editor-container {
        min-height: 500px;
        margin: 0 0 30px;
        .editor-upload-btn-container {
            text-align: right;
            margin-right: 10px;
            .editor-upload-btn {
                display: inline-block;
            }
        }
      }
    }
    .word-counter {
      width: 40px;
      position: absolute;
      right: -10px;
      top: 0px;
    }
  }
</style>
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
  width: 178px;
  height: 178px;
  display: block;
}
</style>
