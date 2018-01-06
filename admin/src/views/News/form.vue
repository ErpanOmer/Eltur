<template>
  <div class="createPost-container">
    <el-form class="form-container" :model="newsData"  ref="newsData">
<!--
      <sticky :className="'sub-navbar '+postForm.status">
        <template v-if="fetchSuccess">

          <router-link style="margin-right:15px;" v-show='isEdit' :to="{ path:'create-form'}">
            <el-button type="info">创建form</el-button>
          </router-link>

          <el-dropdown trigger="click">
            <el-button plain>{{!postForm.comment_disabled?'评论已打开':'评论已关闭'}}
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </el-button>
            <el-dropdown-menu class="no-padding" slot="dropdown">
              <el-dropdown-item>
                <el-radio-group style="padding: 10px;" v-model="postForm.comment_disabled">
                  <el-radio :label="true">关闭评论</el-radio>
                  <el-radio :label="false">打开评论</el-radio>
                </el-radio-group>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-dropdown trigger="click">
            <el-button plain>平台
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </el-button>
            <el-dropdown-menu class="no-border" slot="dropdown">
              <el-checkbox-group v-model="postForm.platforms" style="padding: 5px 15px;">
                <el-checkbox v-for="item in platformsOptions" :label="item.key" :key="item.key">
                  {{item.name}}
                </el-checkbox>
              </el-checkbox-group>
            </el-dropdown-menu>
          </el-dropdown>

          <el-dropdown trigger="click">
            <el-button plain>
              外链
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </el-button>
            <el-dropdown-menu class="no-padding no-border" style="width:300px" slot="dropdown">
              <el-form-item label-width="0px" style="margin-bottom: 0px" prop="source_uri">
                <el-input placeholder="请输入内容" v-model="postForm.source_uri">
                  <template slot="prepend">填写url</template>
                </el-input>
              </el-form-item>
            </el-dropdown-menu>
          </el-dropdown>


          <el-button v-loading="loading" type="warning" @click="draftForm">草稿</el-button>

        </template>
        <template v-else>
          <el-tag>发送异常错误,刷新页面,或者联系程序员</el-tag>
        </template>

      </sticky> -->

      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput name="name" v-model="newsData.title" required :maxlength="100">
                标题
              </MDinput>
              <span v-show="newsData.title.length>=26" class='title-prompt'>app可能会显示不全</span>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="作者:">
                      <el-select v-model="newsData.author" placeholder="请选择作者">
                        <el-option :label="name" :value="name"></el-option>
                      </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-tooltip class="item" effect="dark" content="将替换作者" placement="top">
                    <el-form-item label-width="50px" label="来源:" class="postInfo-container-item">
                      <el-input placeholder="将替换作者" style='min-width:150px;' v-model="newsData.source_name">
                      </el-input>
                    </el-form-item>
                  </el-tooltip>
                </el-col>

                <el-col :span="8">
                  <el-form-item label-width="80px" label="发布时间:" class="postInfo-container-item">
                    <el-date-picker v-model="newsData.display_time" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-form-item style="margin-bottom: 40px;" label-width="45px" label="摘要:">
          <el-input type="textarea" class="article-textarea" :rows="1" autosize placeholder="请输入内容" v-model="newsData.content_short">
          </el-input>
          <span class="word-counter" v-show="contentShortLength">{{contentShortLength}}字</span>
        </el-form-item>
        <el-upload
          class="avatar-uploader"
          action="http://www.eltur.cn/elturAdmin/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="newsData.image_uri" :src="newsData.image_uri" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
import { fetchArticle } from '@/api/news'
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
        content_short: '', // 文章摘要
        source_uri: '', // 文章外链
        image_uri: '', // 文章图片
        display_time: undefined // 前台展示时间
      }
    }
  },
  computed: {
    contentShortLength() {
      return this.newsData.content_short.length
    },
    name: function() {
      return this.$store.getters.name
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
    handleAvatarSuccess(res, file) {
      console.log(res)
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    fetchData() {
      fetchArticle().then(response => {
        this.newsData = response.data
      }).catch(err => {
        this.fetchSuccess = false
        console.log(err)
      })
    },
    submitForm() {
      this.newsData.display_time = parseInt(this.display_time / 1000)
      console.log(this.newsData)
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
