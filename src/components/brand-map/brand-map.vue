<template>
  <div class="brand-map" :style="{width:w,height:h}"></div>
</template>
<script>
export default {
  props: {
    w: {
      type: Number
    },
    h: {
      type: Number
    },
    type: {
      type: String
    }
  }
  data(){
    return {
      brandMap: {

      }
    }
  }
}
</script>
<style lang="stylus">
.brand-map
  width 32px
  height 32px
  border-radius 3px
  margin-right 12px
  background-repeat no-repeat
  background-size 100% 100%
  &.decrease
    bg-image('decrease_1')
  &.discount
    bg-image('discount_1')
  &.special
    bg-image('special_1')
  &.invoice
    bg-image('invoice_1')
  &.guarantee
    bg-image('guarantee_1')

</style>
