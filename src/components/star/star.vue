<template>
  <div class="star-wrap" :class="classType">
    <span class="star" v-for="(classItem,key) in classArr" :key="key" :class="classItem"></span>
  </div>
</template>
<script>
const max = 5
const starOn = 'star-on'
const starHalf = 'star-half'
const starOff = 'star-off'

export default {
  props: {
    number: {
      type: Number
    },
    type: {
      type: Number
    }
  },
  computed: {
    classType(){
      if (this.type === 1) {
        return 'star-small'
      } else if (this.type === 2) {
        return 'star-middle'
      } else {
        return 'star-big'
      }
    },
    classArr(){
      var core = Math.floor(this.number * 2) / 2
      var isHalf = (core % 1) !== 0
      var arr = []
      for (var i = 0; i < max; i++){
        if (i < core) {
          arr.push(starOn)
        } else if (i === (core + 1) && isHalf){
          arr.push(starHalf)
        } else {
          arr.push(starOff)
        }
      }
      return arr
    }
  }
}
</script>
<style lang="stylus">
@import '../../common/stylus/mixin.styl'
.star-wrap
  display flex
  .star
    background-size 100% 100%
    background-position: center center;
  &.star-big
    .star
      width 40px
      height 40px
      margin-right 40px
      &:last-child
        margin-right 0
      &.star-on
        bg-image('star48_on')
      &.star-half
        bg-image('star48_half')
      &.star-off
        bg-image('star48_off')
  &.star-middle
    .star
      width 30px
      height 30px
      margin-right 12px
      &:last-child
        margin-right 0
      &.star-on
        bg-image('star36_on')
      &.star-half
        bg-image('star36_half')
      &.star-off
        bg-image('star36_off')
  &.star-small
    .star
      width 20px
      height 20px
      margin-right 6px
      &:last-child
        margin-right 0
      &.star-on
        bg-image('star24_on')
      &.star-half
        bg-image('star24_half')
      &.star-off
        bg-image('star24_off')
</style>
