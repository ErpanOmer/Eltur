<script>
  let Data = {}
  Data.install = function (Vue, options) {
    Vue.prototype.$getData = function (url, string, success) {
      if (typeof url === 'undefined') {
        this.$vux.toast.show({
          text: '数据错误',
          type: 'cancel'
        })
        return false
      }
      if (this.$isEmptyParam(string)) {
        string = ''
      }
      this.$http.get(this.$configs.apiURL + url + string)
      .then(response => {
        console.log(response)
        if (!this.$isEmptyParam(response) && !this.$isEmptyParam(response.data) && !this.$isEmptyParam(response.data.responseHeader) && !this.$isEmptyParam(response.data.responseHeader.returnCode) && response.data.responseHeader.returnCode === 0) {
          if (!this.$isEmptyParam(response.data.responseData)) {
            success(response.data.responseData)
          } else {
            success(true)
          }
        }
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
      })
    }
    Vue.prototype.$postData = function (url, param, success) {
      if (this.$isEmptyParam(url)) {
        this.$vux.toast.show({
          text: this.$t('error.http_request_url_error'),
          type: 'cancel'
        })
        return false
      }
      this.$http.post(this.$configs.apiURL + url, param)
      .then((response) => {
        let header = response.data.responseHeader
        if (header.returnCode !== 0 && !this.$isEmptyParam(header.message)) {
          let message = header.message.split(':')[1]
          this.$vux.toast.text(message)
          return
        }
        if (!this.$isEmptyParam(response) && !this.$isEmptyParam(response.data) && !this.$isEmptyParam(response.data.responseHeader) && !this.$isEmptyParam(response.data.responseHeader.returnCode) && response.data.responseHeader.returnCode === 0) {
          if (!this.$isEmptyParam(response.data.responseData)) {
            success(response.data.responseData)
          } else {
            success(true)
          }
        }
      })
      .catch(function (response) {
        if (!this.$isEmptyParam(response.data.responseData)) {
          success(response.data.responseData)
        } else {
          success(true)
        }
        let message = this.$t('error.http_request_error')
        if (!this.$isEmptyParam(response) && !this.$isEmptyParam(response.data) && !this.$isEmptyParam(response.data.responseHeader) && !this.$isEmptyParam(response.data.responseHeader.message)) {
          message = response.data.responseHeader.message
        }
        this.$vux.toast.show({
          text: message,
          type: 'cancel'
        })
      })
    }
    Vue.prototype.$putData = function (url, param, success) {
      if (this.$isEmptyParam(url)) {
        this.$vux.toast.show({
          text: this.$t('error.http_request_url_error'),
          type: 'cancel'
        })
        return false
      }
      this.$http.put(this.$configs.apiURL + url, param)
      .then((response) => {
        if (!this.$isEmptyParam(response) && !this.$isEmptyParam(response.data) && !this.$isEmptyParam(response.data.responseHeader) && !this.$isEmptyParam(response.data.responseHeader.returnCode) && response.data.responseHeader.returnCode === 0) {
          if (!this.$isEmptyParam(response.data.responseData)) {
            success(response.data.responseData)
          } else {
            success(true)
          }
        }
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
      })
    }
    Vue.prototype.$deleteData = function (url, string, success) {
      if (this.$isEmptyParam(url)) {
        this.$vux.toast.show({
          text: this.$t('error.http_request_url_error'),
          type: 'cancel'
        })
        return false
      }
      if (this.$isEmptyParam(string)) {
        string = ''
      }
      this.$http.delete(this.$configs.apiURL + url + string)
      .then((response) => {
        if (!this.$isEmptyParam(response) && !this.$isEmptyParam(response.data) && !this.$isEmptyParam(response.data.responseHeader) && !this.$isEmptyParam(response.data.responseHeader.returnCode) && response.data.responseHeader.returnCode === 0) {
          if (!this.$isEmptyParam(response.data.responseData)) {
            success(response.data.responseData)
          } else {
            success(true)
          }
        }
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
      })
    }
  }
  module.exports = Data
</script>
