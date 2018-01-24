<script>
  let Data = {}
  Data.install = function (Vue, options) {
    Vue.prototype.$getData = function (url, string = '', success) {
      this.$loading()
      if (typeof url === 'undefined') {
        this.$vux.toast.show({
          text: '数据错误',
          type: 'cancel'
        })
        this.$loading.end()
        return false
      }
      this.$http.get(this.$configs.apiURL + url + string)
      .then(response => {
        const header = response.data.responseHeader
        if (header.returnCode !== 0 && !this.$isEmptyParam(header.message)) {
          let message = header.message.split(':')
          message = message.length === 1 ? message[0] : message[1]
          this.$vux.toast.text(message)
          this.$loading.end()
          return
        }
        if (!this.$isEmptyParam(response) && !this.$isEmptyParam(response.data) && !this.$isEmptyParam(response.data.responseHeader) && !this.$isEmptyParam(response.data.responseHeader.returnCode) && response.data.responseHeader.returnCode === 0) {
          if (!this.$isEmptyParam(response.data.responseData)) {
            success(response.data.responseData)
          } else {
            success(true)
          }
        }
        this.$loading.end()
      })
      .catch(response => {
        if (!this.$isEmptyParam(response) && !this.$isEmptyParam(response.data) && !this.$isEmptyParam(response.data.responseHeader) && !this.$isEmptyParam(response.data.responseHeader.returnCode) && response.data.responseHeader.returnCode === 0) {
          if (!this.$isEmptyParam(response.data.responseData)) {
            success(response.data.responseData)
          } else {
            success(true)
          }
        } else {
          this.$vux.toast.show({
            text: '出错了',
            type: 'cancel'
          })
        }
        this.$loading.end()
      })
    }
    Vue.prototype.$postData = function (url, data, success) {
      this.$loading()
      if (this.$isEmptyParam(url)) {
        this.$loading.end()
        return false
      }
      this.$http.post(this.$configs.apiURL + url, data)
      .then(response => {
        if (response.code === 8888 && !response.success) {
          this.$vux.toast.text(response.message)
          this.$loading.end()
          return false
        }
        if (!this.$isEmptyParam(response) && !this.$isEmptyParam(response.code) && response.code === 520 && response.success) {
          if (!this.$isEmptyParam(response.data)) {
            success(response.data)
          } else {
            success(true)
          }
        }
        this.$loading.end()
      }).catch(response => {
        if (response.code === 8888 && !response.success) {
          this.$vux.toast.text(response.message)
          this.$loading.end()
          return false
        }
        if (!this.$isEmptyParam(response) && !this.$isEmptyParam(response.code) && response.code === 520 && response.success) {
          if (!this.$isEmptyParam(response.data)) {
            success(response.data)
          } else {
            success(true)
          }
        } else {
          console.log(response)
        //   this.$vux.toast.show({
        //     text: '出错了',
        //     type: 'cancel'
        //   })
        }
        this.$loading.end()
      })
    }
    Vue.prototype.$putData = function (url, param, success) {
      this.$loading()
      if (this.$isEmptyParam(url)) {
        this.$vux.toast.show({
          text: this.$t('error.http_request_url_error'),
          type: 'cancel'
        })
        this.$loading.end()
        return false
      }
      this.$http.put(this.$configs.apiURL + url, param)
      .then((response) => {
        const header = response.data.responseHeader
        if (header.returnCode !== 0 && !this.$isEmptyParam(header.message)) {
          let message = header.message.split(':')
          message = message.length === 1 ? message[0] : message[1]
          this.$vux.toast.text(message)
          this.$loading.end()
          return
        }
        if (!this.$isEmptyParam(response) && !this.$isEmptyParam(response.data) && !this.$isEmptyParam(response.data.responseHeader) && !this.$isEmptyParam(response.data.responseHeader.returnCode) && response.data.responseHeader.returnCode === 0) {
          if (!this.$isEmptyParam(response.data.responseData)) {
            success(response.data.responseData)
          } else {
            success(true)
          }
        }
        this.$loading.end()
      })
      .catch(function (response) {
        let message = this.$t('error.http_request_error')
        if (!this.$isEmptyParam(response) && !this.$isEmptyParam(response.data) && !this.$isEmptyParam(response.data.responseHeader) && !this.$isEmptyParam(response.data.responseHeader.message)) {
          message = response.data.responseHeader.message
        }
        this.$vux.toast.show({
          text: message,
          type: 'cancel'
        })
        this.$loading.end()
      })
    }
    Vue.prototype.$deleteData = function (url, string = '', success) {
      this.$loading()
      if (this.$isEmptyParam(url)) {
        this.$vux.toast.show({
          text: this.$t('error.http_request_url_error'),
          type: 'cancel'
        })
        this.$loading.end()
        return false
      }
      this.$http.delete(this.$configs.apiURL + url + string)
      .then((response) => {
        const header = response.data.responseHeader
        if (header.returnCode !== 0 && !this.$isEmptyParam(header.message)) {
          let message = header.message.split(':')
          message = message.length === 1 ? message[0] : message[1]
          this.$vux.toast.text(message)
          this.$loading.end()
          return
        }
        if (!this.$isEmptyParam(response) && !this.$isEmptyParam(response.data) && !this.$isEmptyParam(response.data.responseHeader) && !this.$isEmptyParam(response.data.responseHeader.returnCode) && response.data.responseHeader.returnCode === 0) {
          if (!this.$isEmptyParam(response.data.responseData)) {
            success(response.data.responseData)
          } else {
            success(true)
          }
        }
        this.$loading.end()
      })
      .catch(function (response) {
        let message = this.$t('error.http_request_error')
        if (!this.$isEmptyParam(response) && !this.$isEmptyParam(response.data) && !this.$isEmptyParam(response.data.responseHeader) && !this.$isEmptyParam(response.data.responseHeader.message)) {
          message = response.data.responseHeader.message
        }
        this.$vux.toast.show({
          text: message,
          type: 'cancel'
        })
        this.$loading.end()
      })
    }
  }
  module.exports = Data
</script>
