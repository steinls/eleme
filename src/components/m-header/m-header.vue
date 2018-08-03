<template>
  <div class="header">
    <div class="top">
      <div class="avatar">
        <img :src="seller.avatar" alt="">
      </div>
    </div>
  </div>
</template>
<script>
import {ERR_OK} from 'api/config'
export default {
  data() {
    return {
      seller: {}
    }
  },
  created() {
    this.$http.get('/api/seller').then((response) => {
      let data = response.body
      if (data.errno === ERR_OK) {
        this.seller = data.data
      }
      console.log(this.seller)
    })
  }
}
</script>
<style lang="stylus">
@import '../../common/stylus/mixin.styl'
.header
  box-sizing:border-box
  background:red
  height:268px
  width:100%
  padding-left:46px
  padding-top:48px
  padding-right:24px
  padding-bottom:30px
  .top
    width:100%;
    height:100%;
    background:#000
    .avatar
      width:128px
      height:128px
      overflow:hidden
      border-radius:4px;
      img
        width:100%
        height:100%
</style>
