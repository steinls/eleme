<template>
  <div class="count-control">
    <transition name="slide-fade">
      <div v-if="foodNum>0" @click="reduce" class="reduce icon-remove_circle_outline"></div>
    </transition>

    <transition name="fade">
      <div v-if="foodNum>0" class="num">{{foodNum}}</div>
    </transition>

    <div @click="add" class="add icon-add_circle"></div>
  </div>
</template>
<script>
export default {
  props: {
    food: {
      type: Object
    },
    selectFoods: {
      type: Array
    }
  },
  methods: {
    add(){
      let idx = this.inquire(this.food.name)
      console.log(this.selectFoods)
      if (idx === -1) {
        this.selectFoods.push(Object.assign({num: 1}, this.food))
      } else {
        this.selectFoods[idx].num++
      }

      this.$emit('add')
    },
    reduce(){
      let idx = this.inquire(this.food.name)
      if (idx !== -1) {
        if (this.selectFoods[idx].num === 1) {
          this.selectFoods.splice(idx, 1)
        } else {
          this.selectFoods[idx].num--
        }
      }

      this.$emit('reduce')
    },
    inquire(name){
      for (let [k, v] of this.selectFoods.entries()) {
        if (v.name === name) {
          return k
        }
      }
      return -1
    }
  },
  computed: {
    foodNum(){
      let idx = this.inquire(this.food.name)
      if (idx !== -1) {
        return this.selectFoods[idx].num
      }
      return 0
    }
  }
}
</script>
<style lang="stylus">
@import '../../common/stylus/mixin.styl'
.fade-enter-active, .fade-leave-active
  transition opacity 2s
.fade-enter, .fade-leave-to
  opacity 0

.slide-fade-enter-active, .slide-fade-leave-active
  transition all 0.5s
.slide-fade-enter, .slide-fade-leave-to
  opacity 0
  transform translate3d(24px,0,0)

.count-control
  display flex
  position absolute
  bottom 40px
  right 40px
  .add,.reduce
    font-size 40px
    color #00a0dc
    extend-click()
  .num
    display flex
    align-items center
    transform translate3d(0,0,0)
    font-size 20px
    padding 0 22px
</style>
