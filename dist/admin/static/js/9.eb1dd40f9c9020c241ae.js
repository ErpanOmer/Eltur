webpackJsonp([9],{QWGN:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("woOf"),n=a.n(i),l=a("0xDb"),s=a("viA7"),r=[{key:0,display_name:"推荐"},{key:1,display_name:"婚姻家庭"},{key:2,display_name:"交通事故"},{key:3,display_name:"劳动用工"},{key:4,display_name:"治安刑事"},{key:5,display_name:"医疗事故"},{key:6,display_name:"房产土地"},{key:7,display_name:"责权责务"},{key:8,display_name:"合同纠纷"},{key:9,display_name:"征地拆迁"}],o={name:"ArticleList",directives:{waves:a("cAgV").a},data:function(){return{tableKey:0,list:null,total:null,listLoading:!0,listQuery:{page:1,pageSize:10},importanceOptions:[1,2,3],calendarTypeOptions:r,sortOptions:[{label:"ID Ascending",key:"+id"},{label:"ID Descending",key:"-id"}],statusOptions:["published","draft","deleted"],showReviewer:!1,temp:{},dialogFormVisible:!1,textMap:{update:"Edit",create:"Create"},pvData:[],rules:{category:[{required:!0,message:"类型不能为空",trigger:"change"}],createdTime:[{required:!0,message:"发布时间不能为空",trigger:"change"}],title:[{required:!0,message:"title is required",trigger:"blur"}]},itemList:["推荐","婚姻家庭","交通事故","劳动用工","治安刑事","医疗事故","房产土地","责权责务","合同纠纷","征地拆迁"],downloadLoading:!1}},filters:{statusFilter:function(e){return{published:"success",draft:"info",deleted:"danger"}[e]}},created:function(){this.fetchList()},methods:{fetchList:function(){var e=this;this.listLoading=!0,Object(s.c)(this.listQuery).then(function(t){e.list=t.list,e.total=t.totalCount,e.listLoading=!1})},handleFilter:function(){this.listQuery.page=1,this.fetchList()},handleSizeChange:function(e){this.listQuery.pageSize=e,this.fetchList()},handleCurrentChange:function(e){this.listQuery.page=e,this.fetchList()},resetTemp:function(){this.temp={id:void 0,importance:1,remark:"",timestamp:new Date,title:"",status:"published",type:""}},Time:function(e){return Object(l.b)(e,"{y}-{m}-{d} {h}:{i}")},handleUpdate:function(e){var t=this;this.temp=n()({},e),this.temp.createdTime=1e3*this.temp.createdTime,this.dialogFormVisible=!0,this.$nextTick(function(){t.$refs.dataForm.clearValidate()})},updateData:function(e){this.$refs.dataForm.validate(function(t){var a={source:e.source};t&&Object(s.b)(""+e.id,a).then(function(e){console.log(e)})})},handleDelete:function(e,t){var a=this;e.status=t;var i=e.id;void 0===i||null===i?this.$message.error("操作无效"):Object(s.a)(e.id).then(function(t){if(t.success&&520===t.code){a.$notify({title:"成功",message:"删除成功",type:"success",duration:2e3});var i=a.list.indexOf(e);a.list.splice(i,1)}else a.$message.error("删除失败")})}}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container calendar-list-container"},[a("div",{staticClass:"filter-container",staticStyle:{"padding-bottom":"15px"}},[a("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"标题"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.handleFilter(t)}}}),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v("搜索")])],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,attrs:{data:e.list,"element-loading-text":"给我一点时间",border:"",fit:"","highlight-current-rowstyle":"width: 100%"}},[a("el-table-column",{attrs:{align:"center",label:"序号",width:"65"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.$index+1))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"150px",align:"center",label:"发布时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e.Time(t.row.createdTime)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{"min-width":"150px",align:"center",label:"标题"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticClass:"link-type",domProps:{textContent:e._s(t.row.title)},on:{click:function(a){e.handleUpdate(t.row)}}}),e._v(" "),a("el-tag",{attrs:{type:"warning"},domProps:{textContent:e._s(e.itemList[t.row.category])}})]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"110px",align:"center",label:"来源"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{domProps:{textContent:e._s(t.row.author?t.row.author:t.row.source)}})]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"阅读数",width:"95"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{domProps:{textContent:e._s(t.row.pageViews)}})]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"点赞数",width:"95"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{domProps:{textContent:e._s(t.row.fabulous)}})]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"110px",align:"center",label:"评论数"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{domProps:{textContent:e._s(t.row.comments.length)}})]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",width:"300","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){e.handleUpdate(t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){e.handleDelete(t.row,"deleted")}}},[e._v("删除\n        ")])]}}])})],1),e._v(" "),a("div",{staticClass:"pagination-container"},[a("el-pagination",{attrs:{background:"","current-page":e.listQuery.page,"page-sizes":[10,25,50],"page-size":e.listQuery.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.$set(e.listQuery,"page",t)}}})],1),e._v(" "),a("el-dialog",{attrs:{title:"编辑",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"dataForm",staticStyle:{width:"400px","margin-left":"50px"},attrs:{rules:e.rules,model:e.temp,"label-position":"left","label-width":"70px"}},[a("el-form-item",{attrs:{label:"类型",prop:"category"}},[a("el-select",{staticClass:"filter-item",attrs:{placeholder:"Please select"},model:{value:e.temp.category,callback:function(t){e.$set(e.temp,"category",t)},expression:"temp.category"}},e._l(e.calendarTypeOptions,function(e){return a("el-option",{key:e.key,attrs:{label:e.display_name,value:e.key}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"时间",prop:"createdTime"}},[a("el-date-picker",{attrs:{type:"date",format:"yyyy-MM-dd HH:mm:ss","value-format":"timestamp",placeholder:"选择日期时间"},model:{value:e.temp.createdTime,callback:function(t){e.$set(e.temp,"createdTime",t)},expression:"temp.createdTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"标题",prop:"title"}},[a("el-input",{model:{value:e.temp.title,callback:function(t){e.$set(e.temp,"title",t)},expression:"temp.title"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"来源"}},[a("el-input",{model:{value:e.temp.source,callback:function(t){e.$set(e.temp,"source",t)},expression:"temp.source"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"作者"}},[a("el-input",{model:{value:e.temp.author,callback:function(t){e.$set(e.temp,"author",t)},expression:"temp.author"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.updateData(e.temp)}}},[e._v("确定")])],1)],1)],1)},staticRenderFns:[]},u=a("VU/8")(o,c,!1,null,null,null);t.default=u.exports},viA7:function(e,t,a){"use strict";t.c=function(e){return Object(i.a)({url:n.a.News,method:"get",params:e})},t.a=function(e){return Object(i.a)({url:n.a.News+"/"+e,method:"delete"})},t.b=function(e,t){return Object(i.a)({url:n.a.News+"/"+e,method:"put",data:t})},t.d=function(e){return Object(i.a)({url:n.a.News,method:"post",data:e})};var i=a("vLgD"),n=a("T452")}});