<template>
  <div class="shopcart">
    <div class="chircle" :class="{active:goods.length}">
      <div class="icon-wrap">
        <i class="icon icon-shopping_cart"></i>
        <div class="label">{{goodsNum}}</div>
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
    <div class="endcount" :class="{active:isShip}">{{endcountString}}</div>
  </div>
</template>

<script>
export default {
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
  methods: {},
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
