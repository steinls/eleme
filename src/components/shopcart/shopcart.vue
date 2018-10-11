<template>
  <div class="shopcart">
    <transition name="fade">
      <div class="sheet" v-if="isList" @click="hideList"></div>
    </transition>
    <transition name="yanshen">
      <div class="list" v-if="isList" :style="{height:listHeight+'px'}">
        <div class="title">
          <div>购物车</div>
          <div class="btn" @click="clear">清空</div>
        </div>
        <b-scroll class="cont" :data="goods" ref="list">
          <ul>
            <transition-group name="small-fade" tag="div">
              <li v-for="item in goods" :key="item.name">
                <div>{{item.name}}</div>
                <count-control @reduce="reduce" :selectFoods="goods" :food="item"></count-control>
              </li>
            </transition-group>
          </ul>
        </b-scroll>
      </div>
    </transition>
    <div class="panel">
      <div class="left" @click="showList">
        <div class="chircle" :class="{active:goods.length}">
          <div class="icon-wrap">
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

export default {
  data(){
    return {
      isList: false
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
  mounted(){
    console.log(this.goods)
  },
  methods: {
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
    reduce(){
      if (!this.goods.length) {
        this.isList = false
      }
    }
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
      let num = this.goods.length > 4 ? 4 : this.goods.length
      return num * 97 + 80
    }
  },
  components: {
    BScroll,
    CountControl
  },
  watch: {
    goods(newV){
      this.$refs.list && this.$refs.list.refresh()
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
  .sheet
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    background rgba(0,0,0,0.5)
    backdrop-filter blur(10px)
  .list
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
    .cont
      max-height 392px
      padding 0 36px
      overflow hidden
      li
        transform-origin bottom
        display flex
        height 97px
        align-items center
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
          .icon
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
