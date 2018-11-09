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
          <div class="control-wrap">
            <!-- <transition name="fade"> -->
              <div class="control" v-show="!isHave()" @click="add($event)">
                加入购物车
              </div>
            <!-- </transition> -->
            <count-control v-show="isHave()" ref="countControl" :food="shop" :selectFoods="goods"></count-control>
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
            <div class="label" :class="{active:selected==='all'}" @click="select('all')">
              <div>
                全部 <span>{{ratings.all.arr.length}}</span>
              </div>
            </div>
            <div class="label" :class="{active:selected==='fine'}" @click="select('fine')">
              <div>
                推荐 <span>{{ratings.fine.arr.length}}</span>
              </div>
            </div>
            <div class="label bad" :class="{active:selected==='bad'}" @click="select('bad')">
              <div>
                吐槽 <span>{{ratings.bad.arr.length}}</span>
              </div>
            </div>
          </div>
          <div class="filter-btn" :class="{active: haveCont}" @click="haveCont = !haveCont">
            <span class="icon icon-check_circle"></span>只看有内容的评价
          </div>
        </div>

        <div class="ratings">
          <div class="rating-box" v-for="(item, key) in currentRatings" :key="key">
            <transition name="ratignOut">
              <div class="rating">
                <div class="rating-info">
                  <div class="date">{{item.rateTime|dateParse}}</div>
                  <div class="user">{{item.username}}</div>
                </div>
                <div class="text"><span class="icon" :class="getIcon(item.rateType)"></span>{{item.text || '暂无评论，默认好评！'}}</div>
              </div>
            </transition>
          </div>
        </div>

      </div>
    </b-scroll>
  </transition>
</template>
<script>
import BScroll from 'base/b-scroll/b-scroll.vue'
import CountControl from 'components/count-control/count-control.vue'
import { formatDate } from 'lib/date.js'

export default {
  props: {
    shop: {
      type: Object
    },
    goods: {
      type: Array
    }
  },
  data(){
    return {
      ishow: false,
      selected: 'all',
      haveCont: false
    }
  },
  methods: {
    show(){
      this.ishow = true
    },
    hide(){
      this.ishow = false
    },
    select(param){
      this.selected = param
    },
    getIcon(type){
      return !type ? 'icon-thumb_up up' : 'icon-thumb_down down'
    },
    isHave(){
      for (let item of this.goods) {
        if (item.name === this.shop.name) return true
      }
    },
    add(e){
      this.$refs.countControl.add(e)
    }
  },
  computed: {
    ratings(){
      let obj = {}
      obj.all = {
        name: 'all',
        arr: this.shop.ratings
      }
      obj.fine = {
        name: 'fine',
        arr: []
      }
      obj.bad = {
        name: 'bad',
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
    currentRatings(){
      let arr = this.ratings[this.selected].arr
      if (this.haveCont) {
        arr = arr.filter((v) => {
          console.log(v)
          return v.text !== ''
        })
      }
      return arr
    }
  },
  filters: {
    dateParse(val){
      let date = new Date(val)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
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
  transition opacity 0.85s
.fade-enter, .fade-leave-to
  opacity 0

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
  z-index 1
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
      .control-wrap
        width 150px
        height 50px
        position relative
        .control
          position absolute
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
      padding-bottom 0
      // height 290px
      height 300px
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
          margin-left 4px
        &.active
          .icon
            color #00c850
    .rating-box
      padding 0 36px
      background #fff
      border-1px-b(#e6e7e8)
      .rating
        box-sizing border-box
        height 134px
        padding 36px 0
        .rating-info
          display flex
          justify-content space-between
          color #93999f
          font-size 20px
          margin-bottom 23px
        .text
          font-size 24px
          color #2c3238
          .icon
            margin-right 10px
            &.up
              color #00a0dc
            &.down
              color #b7bbbf
</style>
