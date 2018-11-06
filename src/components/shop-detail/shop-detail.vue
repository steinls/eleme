<template>
  <transition name="fadeInRight">
    <b-scroll class="shop-detail" v-if="ishow">
      <div class="top">
        <img :src="shop.image" alt="">
        <div class="bar">
          <div class="back icon-arrow_lift" @click="hide()"></div>
          <div class="title">
            {{shop.name}}
          </div>
        </div>
      </div>
      <div class="info">
        <div class="name">{{shop.name}}</div>
        <div class="sales">
          <div class="moon-sell">月售{{shop.sellCount}}份</div>
          <div class="like-rate">好评率{{shop.rating}}%</div>
        </div>
        <div class="price-wrap">
          <div class="price">
            <div class="now"><span>￥</span>{{shop.price}}</div>
            <div class="old" v-if="shop.oldPrice"><span>￥</span>{{shop.oldPrice}}</div>
          </div>
          <div>
            <div class="controls">
              加入购物车
            </div>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="title">商品介绍</div>
        <div class="des">{{shop.description||'店家暂无描述！'}}</div>
      </div>
      <div class="ratings-wrap">
        <div class="rating-top">
          <div class="title">商品评价</div>
          <div class="labels-box">
            <div class="label">
              <div>
                全部 <span>{{ratings.all.arr.length}}</span>
              </div>
            </div>
          </div>
          <div class="filter-btn">
            <span class="icon icon-check_circle"></span>只看有内容的评价
          </div>
        </div>
        <div class="ratings">
          <div class="rating">
            <div class="info">
              <div class="date"></div>
              <div class="user"></div>
            </div>
            <div class="text"></div>
          </div>
        </div>
      </div>
    </b-scroll>
  </transition>
</template>
<script>
import BScroll from 'base/b-scroll/b-scroll.vue'

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
        console.log(this.shop)
      })
    },
    hide(){
      this.ishow = false
    }
  },
  computed: {
    ratings(){
      let obj = {}
      obj.all = {
        name: 'all',
        text: '全部',
        arr: this.shop.ratings
      }
      obj.fine = {
        name: 'fine',
        text: '推荐',
        arr: []
      }
      obj.bad = {
        name: 'bad',
        text: '吐槽',
        arr: []
      }
      this.shop.ratings.forEach((item) => {
        if (item.rateType === 0) {
          obj.fine.arr.push(item)
        }
        if (item.rateType === 1) {
          obj.bad.arr.push(item)
        }
      })
      return obj
    },
    haveCont(){
      let arr = []
      for (let item of this.shop.ratings){
        if (item.text) {
          arr.push(item)
        }
      }
      return arr
    }
  },
  components: {
    BScroll
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
  bottom 98px
  left 0
  right 0
  background #f3f5f7
  overflow hidden
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
      background linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0))
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
  .info
    box-sizing border-box
    padding 36px
    height 218px
    border-bottom 2px solid #e6e7e8
    background #ffffff
    .name
      color #07111b
      font-size 28px
      font-weight bolder
    .sales
      display flex
      margin-top 16px
      font-size 18px
      color #93999f
      .moon-sell
        margin-right 23px
    .price-wrap
      margin-top 35px
      height 50px
      display flex
      align-items center
      justify-content space-between
      .price
        display flex
        font-size 16px
        align-items center
        .now
          color #f01414
          font-size 20px
          margin-right 16px
        .old
          color #93999f
          text-decoration line-through
        span
          font-size 16px
      .controls
        width 150px
        height 50px
        font-size 20px
        color #e9f4fb
        background #00a0dc
        display flex
        align-items center
        justify-content center
        border-radius 25px
  .content
    margin-top 32px
    border-top 2px solid #e6e7e8
    border-bottom 2px solid #e6e7e8
    box-sizing border-box
    width 100%
    height 217px
    padding 36px
    background #ffffff
    font-size 28px
    .des
      margin-top 12px
      font-size 24px
      line-height 48px
  .ratings-wrap
    box-sizing border-box
    margin-top 32px
    border-top 2px solid #e6e7e8
    border-bottom 2px solid #e6e7e8
    width 100%
    .rating-top
      box-sizing border-box
      padding 36px
      height 290px
      background #fff
      border-bottom 2px solid #e6e7e8
      .title
        font-size 30px
        color #07111b
      .labels-box
        margin-top 36px
        height 66px
        display flex
        border-1px-b(#e6e7e8)
        padding-bottom 36px
        .label
          width 120px
          height 64px
          border-radius 2px
          background #ccecf8
          margin-right 16px
          color #4d555d
          font-size 26px
          display flex
          justify-content center
          align-items center
          span
            font-size 18px
          &.active
            background #00a0dc
            color #ffffff
        .bad
          background #e9ebec
          &.active
            background #93999f
      .filter-btn
        height 96px
        display flex
        align-items center
        font-size 24px
        color #b7bbbf
        .icon
          font-size 40px
          margin-right 12px
</style>
