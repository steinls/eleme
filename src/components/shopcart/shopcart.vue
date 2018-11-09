<template>
  <div class="shopcart">
    <!-- 购物车详情 -->
    <transition name="fade">
      <div class="sheet" v-if="isList" @click="hideList"></div>
    </transition>
    <transition name="yanshen">
      <div class="shopcont" v-if="isList">
        <div class="title">
          <div>购物车</div>
          <div class="btn" @click="clear">清空</div>
        </div>
        <b-scroll class="list"
          :data="goods"
          ref="list"
          :listenScrollEnd="true"
          @scrollEnd="goodScrollEnd"
          :style="{height:listHeight}"
        >
          <ul>
            <transition-group name="small-fade" tag="div">
              <li ref="listItem" v-for="item in goods" :key="item.name">
                <div>{{item.name}}</div>
                <count-control @reduce="reduce" :selectFoods="goods" :food="item"></count-control>
              </li>
            </transition-group>
          </ul>
        </b-scroll>
      </div>
    </transition>

    <!-- 购物车面板 -->
    <div class="panel">
      <div class="left" @click="showList">
        <div class="chircle" :class="{active:goods.length}">
          <div class="icon-wrap">
            <div class="case" ref="case">
              <transition-group
                @before-enter="dropBeforeenter"
                @enter="dropEnter"
                @after-enter="dropAfterenter"
              >
                <div class="ball-wrap" ref="ballWrap" v-for="(item, key) in balls" :key="key" v-if="item.show">
                  <div class="ball"></div>
                </div>
              </transition-group>
            </div>
            <i class="icon icon-shopping_cart"></i>
            <div class="label" v-if="goods.length">{{goodsNum}}</div>
          </div>
        </div>
        <div class="demand">
          <div class="price" :class="{active:isShip}">
            ￥{{total}}
          </div>
          <div class="line"></div>
          <div class="extra-fee">
            另需配送费￥{{surcharge}}元
          </div>
        </div>
      </div>
      <div class="endcount" :class="{active:isShip}">{{endcountString}}</div>
    </div>
  </div>
</template>

<script>
import BScroll from 'base/b-scroll/b-scroll.vue'
import CountControl from 'components/count-control/count-control.vue'
import delay from 'lib/delay.js'
import bus from 'lib/vue-bus.js'

export default {
  data(){
    return {
      isList: false,
      balls: []
    }
  },
  props: {
    surcharge: {
      type: Number,
      default: 4
    },
    minPrice: {
      type: Number,
      default: 18
    },
    goods: {
      type: Array,
      default(){
        return [
          {
            name: '烤鱿鱼串',
            price: 13,
            num: 1
          },
          {
            name: '辣子鸡',
            price: 18,
            num: 1
          },
          {
            name: '清蒸螃蟹',
            price: 20,
            num: 3
          }
        ]
      }
    }
  },
  created(){
    bus.$on('addcart', (obj) => {
      this.drop(obj.e.target)
    })
  },
  methods: {
    // 清空
    clear(){
      this.goods.splice(0, this.goods.length)
      this.hideList()
    },
    showList(){
      if (this.goods.length !== 0) {
        this.isList = true
      }
    },
    hideList(){
      this.isList = false
    },
    reduce(item){
      // 如果没有商品，不显示详情
      if (!this.goods.length) {
        this.isList = false
      }

      // 缓动操作
      // 移除物品&&购物详情被打开&&末尾4件商品
      let goodsNum = this.goods.length
      if (this.isList && !item.isRemove && item.idx >= (goodsNum - 4)) {
        let scroll = this.$refs.list.scroll
        // 滚动到底部&&商品高度溢出
        if (scroll.y <= (scroll.maxScrollY + 50) && goodsNum > 3){
          let height = this.$refs.listItem[item.idx].clientHeight
          let sh = scroll.maxScrollY + height
          scroll.scrollTo(0, sh, 650)
        }
      }
    },
    // 消除间隙
    goodScrollEnd(){
      this.$refs.list.refresh()
    },

    /* -----------小球动画开始-------------- */
    drop(el){
      this.balls.push({
        el,
        show: true
      })
    },
    dropBeforeenter(el){
      let caseRect = this.$refs.case.getBoundingClientRect()
      let ballRect = this.balls[this.balls.length - 1].el.getBoundingClientRect()

      // 设置球初始位置
      let x = ballRect.left - caseRect.left
      let y = ballRect.top - caseRect.top
      el.style.transform = `translate3d(${x}px, 0,0)`

      let inner = el.getElementsByClassName('ball')[0]
      inner.style.transform = `translate3d(0, ${y}px, 0)`
    },
    dropEnter(el, done){
      // 更新动画
      /* eslint-disable */
      el.offsetWidth

      el.style.transform = 'translate3d(0, 0, 0)'
      el.style.transition = 'all 0.8s'

      let inner = el.getElementsByClassName('ball')[0]
      inner.style.transform = 'translate3d(0, 0, 0)'
      inner.style.transition = 'all 0.8s cubic-bezier(.36,-0.68,.36,.82)'

      //Vue为了知道过渡的完成，必须设置相应的事件监听器。
      el.addEventListener('transitionend', done);
    },
    dropAfterenter(el){
      for (let ball of this.balls) {
        if (ball.show) {
          ball.show = false
          break
        }
      }
      delay(this.delayClearDump, 1500, this)()
    },
    // 用户不点击时清理一次balls数组
    delayClearDump(){
      this.balls.splice(0)
    }
    /* -----------小球动画结束-------------- */
  },
  computed: {
    total(){
      let sum = 0
      this.goods.forEach((v) => {
        sum += (v.price * v.num)
      })
      return sum
    },
    goodsNum(){
      let sum = 0
      this.goods.forEach((v) => {
        sum += v.num
      })
      return sum
    },
    isShip(){
      return this.total >= this.minPrice
    },
    endcountString(){
      return this.isShip ? `结算` : `￥${this.minPrice}起送`
    },
    listHeight(){
      if (!this.isList) {
        return
      }

      if (this.$refs.list) {
        let list = this.$refs.list
        let maxHeight = list.clientHeight

        if (this.goods.length < 4 && this.isList) {
          let totalHeight = 0
          this.$nextTick(() => {
            this.$refs.listItem.forEach((el) => {
              totalHeight += el.clientHeight
            })

            return totalHeight + 'px'
          })
        }

        return maxHeight + 'px'
      } else {
        return 'auto'
      }
    }
  },
  components: {
    BScroll,
    CountControl
  }
}
</script>

<style lang="stylus">
@import '../../common/stylus/mixin.styl'
.fade-enter-active, .fade-leave-active
  transition opacity 0.5s
.fade-enter, .fade-leave-to
  opacity 0

.small-fade-leave-active
  animation: fadeOutDown 0.5s;
@keyframes fadeOutDown {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    margin-top: -97px;
    transform: scaleY(0);
  }
}

.yanshen-enter-active, .yanshen-leave-active
  transition all 0.62s
.yanshen-enter, .yanshen-leave-to
  transform translate3d(0,515px,0)

.shopcart
  position absolute
  bottom 0
  height 96px
  width 100%
  z-index 10
  .sheet
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    background rgba(0,0,0,0.5)
    backdrop-filter blur(10px)
  .shopcont
    max-height 471px
    width 100%
    padding-bottom 140px
    background #ffffff
    position absolute
    bottom 0
    left 0
    transition all 0.5s
    .title
      display flex
      justify-content space-between
      align-items center
      padding 0 36px
      background #f3f5f7
      height 80px
      box-sizing border-box
      border-bottom 2px solid #dbdee1
      color #07111b
      font-size 26px
      .btn
        color #3eade0
        font-size 22px
    .list
      max-height 390px
      padding 0 36px
      overflow hidden
      ul
        padding-bottom 20px
        li
          transform-origin bottom
          display flex
          height 97px
          align-items center
          justify-content space-between
          border-1px-b(#e6e7e8)
          color #07111b
          font-size 28px
  .panel
    display flex
    position relative
    z-index 3
    width 100%
    height 96px
    background #131d26
    .left
      flex 1
      display flex
      .chircle
        margin-top -20px
        margin-left 36px
        width 112px
        height 112px
        border-radius 50%
        background #131d26
        padding 12px
        box-sizing border-box
        &.active
          .icon-wrap .icon
            color #ffffff
          .icon-wrap
            background #00a0dc
        .icon-wrap
          position relative
          width 100%
          height 100%
          border-radius 50%
          background #2b343c
          display flex
          align-items center
          justify-content center
          .case
            width 40px
            height 40px
            position absolute
            top 0
            bottom 0
            left 0
            right 0
            margin auto
            .ball-wrap
              position absolute
              width 40px
              height 40px
              z-index 0
              .ball
                position absolute
                width 40px
                height 40px
                border-radius 50%
                background red
          .icon
            position relative
            z-index 2
            color #80858a
            font-size 40px
          .label
            position absolute
            right -12px
            top -12px
            font-size 20px
            color #ffffff
            background #f01414
            padding 9px 13px
            border-radius 14px
      .demand
        flex 1
        display flex
        align-items center
        color #919396
        font-size 26px
        .price
          font-weight bold
          margin 0 24px
          &.active
            color #ffffff
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
      &.active
        color #ffffff
        background #00b43c
</style>
