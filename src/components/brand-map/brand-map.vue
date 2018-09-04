<template>
  <div class="brand-map" :class="[brandClass,sizeClass]"></div>
</template>
<script>
export default {
  props: {
    type: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 0
    }
  },
  data(){
    return {
      brandMap: [
        'decrease',
        'discount',
        'special',
        'invoice',
        'guarantee'
      ],
      sizeArr: [
        'brand-map-small',
        'brand-map-big'
      ]
    }
  },
  computed: {
    brandClass() {
      return this.brandMap[this.type] + (this.size === 0 ? '_1' : '_2')
    },
    sizeClass() {
      return this.sizeArr[this.size]
    }
  }
}
</script>
<style lang="stylus">
@import '../../common/stylus/mixin.styl'

.brand-map
  background-repeat no-repeat
  background-size 100% 100%
  &.brand-map-small
    width 24px
    height 24px
    border-radius 2px
  &.decrease_1
    bg-image('decrease_1')
  &.discount_1
    bg-image('discount_1')
  &.special_1
    bg-image('special_1')
  &.invoice_1
    bg-image('invoice_1')
  &.guarantee_1
    bg-image('guarantee_1')
  &.brand-map-big
    width 32px
    height 32px
    border-radius 4px
  &.decrease_2
    bg-image('decrease_2')
  &.discount_2
    bg-image('discount_2')
  &.special_2
    bg-image('special_2')
  &.invoice_2
    bg-image('invoice_2')
  &.guarantee_2
    bg-image('guarantee_2')
</style>
