<template>
  <div class="tab">
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
  display:flex
  width:100%
  height:80px
  border-1px(#e5e5e5)
  color:#4d555d
  font-size:28px
  .tab-item
    flex:1
    display:flex
    align-items:center
    justify-content:space-around
    &.router-link-active
      color:#f01414
</style>
