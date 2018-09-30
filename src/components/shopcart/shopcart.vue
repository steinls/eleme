<template>
  <div class="shopcart">
    <div class="chircle">
      <div class="icon-wrap">
        <i class="icon icon-shopping_cart"></i>
      </div>
    </div>
    <div class="demand">
      <div class="price">
        ￥0
      </div>
      <div class="line"></div>
      <div class="extra-fee">
        另需配送费￥4元
      </div>
    </div>
    <div class="endcount">￥20起送</div>
  </div>
</template>

<script>
export default {
  props: {
    selectMeal: {
      type: Array
    }
  }
}
</script>

<style lang="stylus">
.shopcart
  display flex
  position absolute
  bottom 0
  height 96px
  width 100%
  background #131d26
  .chircle
    margin-top -20px
    margin-left 36px
    width 112px
    height 112px
    border-radius 50%
    background #131d26
    padding 12px
    box-sizing border-box
    .icon-wrap
      width 100%
      height 100%
      border-radius 50%
      background #2b343c
      display flex
      align-items center
      justify-content center
      .icon
        color #80858a
        font-size 40px
  .demand
    flex 1
    display flex
    align-items center
    color #919396
    font-size 26px
    .price
      font-weight bold
      margin 0 24px
    .line
      width 1px
      height 50px
      background #2b333b
    .extra-fee
      margin-left 24px
      color 919396
      font-size 20px
  .endcount
    display flex
    height 100%
    width 210px
    background #2b333b
    font-size 26px
    font-weight bold
    color #979a9c
    align-items center
    justify-content center
</style>
