<template>
  <transition name="fadeInRight">
    <div class="shop-detail" v-if="ishow">
      <div class="top">
        <img :src="shop.image" alt="">
        <div class="bar">
          <div class="back icon-arrow_lift" @click="hide()"></div>
          <div class="title">
            {{shop.name}}
          </div>
        </div>
      </div>
      <div class="content"></div>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    shop: {
      type: Object
    }
  },
  data(){
    return {
      ishow: false
    }
  },
  methods: {
    show(){
      this.ishow = true
      this.$nextTick(() => {
        console.log(1111111111111)
        console.log(this.shop)
      })
    },
    hide(){
      this.ishow = false
    }
  }
}
</script>
<style lang="stylus">
@import '../../common/stylus/mixin.styl'

@keyframes fadeInRight {
  from {
    opacity: 0.3;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.fadeInRight-leave-active
  animation fadeInRight 0.5s reverse
.fadeInRight-enter-active
  animation fadeInRight 0.5s

.shop-detail
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  background #fff
  .top
    position relative
    width 100%
    height 0
    padding-top 100%
    img
      position absolute
      top 0
      left 0
      width 100%
      height 100%
    .bar
      color #fff
      position absolute
      top 0
      left 0
      width 100%
      height 100px
      background rgba(0,0,0,0.2)
      display flex
      align-items center
      justify-content center
      .back
        extend-click()
        margin-left 40px
        position absolute
        left 20px
        font-size 38px
      .title
        font-size 34px
  .content
    width 100%
    height 217px
</style>
