webpackJsonp([3],{"2m7f":function(t,n,e){var a=e("cO3j");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);e("8bSs")("367bf611",a,!0)},cO3j:function(t,n,e){(t.exports=e("BkJT")(!1)).push([t.i,"\n.dashboard-container[data-v-0a4aef10] {\n  margin: 30px;\n}\n.dashboard-text[data-v-0a4aef10] {\n  font-size: 30px;\n  line-height: 46px;\n}\n",""])},esL9:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a={name:"Home",data:function(){return{}},computed:{name:function(){return this.$store.getters.name},token:function(){return this.$store.getters.token}},mounted:function(){var t=this;this.$store.dispatch("GetInfo").then(function(){}).catch(function(){t.$router.push("Login"),console.log("获取用户信息失败")})}},o={render:function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"dashboard-container"},[n("div",{staticClass:"dashboard-text",domProps:{textContent:this._s("Hello! "+this.name)}})])},staticRenderFns:[]};var s=e("/Xao")(a,o,!1,function(t){e("2m7f")},"data-v-0a4aef10",null);n.default=s.exports}});