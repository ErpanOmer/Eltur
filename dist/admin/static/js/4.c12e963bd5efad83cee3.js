webpackJsonp([4],{H0jE:function(t,e,n){var a=n("xmkS");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n("rjj0")("1df45e3f",a,!0)},esL9:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={name:"Home",data:function(){return{}},computed:{name:function(){return this.$store.getters.name},token:function(){return this.$store.getters.token}},mounted:function(){var t=this;this.$store.dispatch("GetInfo").then(function(){}).catch(function(){t.$router.push("Login"),console.log("获取用户信息失败")})}},o={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"dashboard-container"},[e("div",{staticClass:"dashboard-text",domProps:{textContent:this._s("Hello! "+this.name)}})])},staticRenderFns:[]};var s=n("VU/8")(a,o,!1,function(t){n("H0jE")},"data-v-0a4aef10",null);e.default=s.exports},xmkS:function(t,e,n){(t.exports=n("FZ+f")(!1)).push([t.i,"\n.dashboard-container[data-v-0a4aef10] {\n  margin: 30px;\n}\n.dashboard-text[data-v-0a4aef10] {\n  font-size: 30px;\n  line-height: 46px;\n}\n",""])}});