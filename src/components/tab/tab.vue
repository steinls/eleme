<template>
  <div class="tab">
    <div class="state"></div>
    <router-link tag="div" class="tab-item" to="/goods">
      <span>商品</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/seller">
      <span>商家</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/ratings">
      <span>评价</span>
    </router-link>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  }
}

</script>
<style lang="stylus">
@import '../../common/stylus/mixin.styl'
.tab
  position relative
  display:flex
  width:100%
  height:80px
  border-bottom 2px solid #e5e5e5
  color:#4d555d
  font-size:28px
  .tab-item
    flex:1
    display:flex
    align-items:center
    justify-content:space-around
    span
      padding 10px 0
    &.router-link-active
      color #f01414
  .state
    position absolute
    top 64px
    height 6px
    width 40px
    background rgb(156, 156, 250)
</style>
