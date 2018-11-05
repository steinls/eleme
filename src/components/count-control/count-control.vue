<template>
  <div class="count-control" @click.stop.prevent>
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
    add(el){
      let idx = this.inquire(this.food.name)
      let isAdd = false
      if (idx === -1) {
        this.selectFoods.push(Object.assign({num: 1}, this.food))
        isAdd = true
      } else {
        this.selectFoods[idx].num++
      }

      this.$emit('add', {
        idx,
        isAdd,
        el
      })
    },
    reduce(el){
      let idx = this.inquire(this.food.name)
      let isRemove = false
      if (idx !== -1) {
        if (this.selectFoods[idx].num === 1) {
          this.selectFoods.splice(idx, 1)
        } else {
          this.selectFoods[idx].num--
          isRemove = true
        }
      }

      this.$emit('reduce', {
        idx,
        isRemove,
        el
      })
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
  transition opacity 0.5s
.fade-enter, .fade-leave-to
  opacity 0

.slide-fade-enter-active, .slide-fade-leave-active
  transition all 0.5s
.slide-fade-enter, .slide-fade-leave-to
  opacity 0
  transform translate3d(60px,0,0) rotate(180deg)

.count-control
  height 42px
  display flex
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
