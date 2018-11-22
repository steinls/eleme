<template>
  <transition name="fadeInRight">
    <div class="shop-detail" v-if="ishow">
      <div ref="bar" class="bar">
        <div class="back icon-arrow_lift" @click="hide()"></div>
        <div class="title">
          {{shop.name}}
        </div>
      </div>
      <!-- 菜品图片 -->
      <div ref="bgBox" class="top">
        <img ref="bgImg" :src="shop.image" alt="">
        <div ref="filter" class="filter"></div>
      </div>

      <!-- 内容 -->
      <b-scroll class="next-wrap"
        ref="scroll"
        :listenScroll="true"
        @scroll="scroll"
      >
          <div class="next">
            <!-- 信息 -->
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
                  <transition name="fade">
                    <div class="control" v-show="!isHave()" @click="add($event)">
                      加入购物车
                    </div>
                  </transition>
                  <count-control v-show="isHave()" ref="countControl" :food="shop" :selectFoods="goods"></count-control>
                </div>
              </div>
            </div>

            <!--商品介绍 -->
            <div class="content">
              <div class="title">商品介绍</div>
              <div class="des">{{shop.description||'店家暂无描述！'}}</div>
            </div>

            <!-- 评价 -->
              <!-- 标题 -->
            <rating-type :data="shop.ratings" @change="select" @filterEmpty="filterEmpty"></rating-type>
              <!-- 列表 -->
            <b-scroll class="list">
              <div class="list-item" v-for="(item, key) in shop.ratings" :key="key" v-if="showType(item.rateType, item.text)">
                <div class="list-item-top">
                  <div class="date">{{item.rateTime | toDate}}</div>
                  <div class="user">
                    <div class="user-name">{{item.username}}</div>
                    <img :src="item.avatar" alt="" class="user-avatar">
                  </div>
                </div>
                <div class="text">
                  <div class="icon" :class="isLaud(item.rateType)"></div>
                  {{item.text || '用户暂无评价！'}}
                </div>
              </div>
            </b-scroll>
          </div>
      </b-scroll>

    </div>
  </transition>
</template>
<script>
import BScroll from 'base/b-scroll/b-scroll.vue'
import CountControl from 'components/count-control/count-control.vue'
import RatingType from 'components/rating-type/rating-type.vue'
import {ratingTypeMixin} from 'vmixin/ratingTypeMixin.js'

export default {
  mixins: [ratingTypeMixin],
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
      scrollY: 0
    }
  },
  methods: {
    show(){
      this.ishow = true
      this.onlycontent = false
      this.selectType = this.ALL

      this.$nextTick(() => {
        // 初始化参数
        this.BAR_HEIGHT = this.$refs.bar.clientHeight
        this.BG_HEIGHT = this.$refs.bgBox.clientHeight
        this.MIN_SCROLLY = this.BAR_HEIGHT - this.BG_HEIGHT

        // 初始化scroll位置
        let h = this.$refs.bgBox.clientHeight
        let scroll = this.$refs.scroll
        scroll.$el.style.top = `${h}px`
        scroll.refresh()
      })
    },
    hide(){
      this.ishow = false
    },
    // 购物车，是否具有这个商品
    isHave(){
      for (let item of this.goods) {
        if (item.name === this.shop.name) return true
      }
      return false
    },
    add(e){
      if (this.isHave()) return
      this.$refs.countControl.add(e)
    },
    scroll(pos){
      this.scrollY = pos.y
    },
    changeDom(newY){
      const zoom = Math.abs(newY / this.$refs.bgBox.clientHeight)

      // .top部分 向下放大，向上模糊
      if (newY > 0) {
        this.$refs.bgBox.style.transform = `scale(${1 + zoom})`
      } else {
        this.$refs.bgImg.style.filter = `blur(${Math.min(zoom * 16, 16)}px)`
      }

      // 当距离顶部一定距离后，改变top样式
      if (newY <= this.MIN_SCROLLY) {
        Object.assign(this.$refs.bgBox.style, {
          height: `${this.BAR_HEIGHT}px`,
          paddingTop: 0,
          zIndex: 10
        })

        this.$refs.bgImg.style.height = `${this.BG_HEIGHT}px`
        this.$refs.filter.style.opacity = 1
      } else {
        Object.assign(this.$refs.bgBox.style, {
          height: 0,
          paddingTop: '80%',
          zIndex: 1
        })

        this.$refs.filter.style.opacity = 0
      }
    }
  },
  components: {
    BScroll,
    CountControl,
    RatingType
  },
  watch: {
    scrollY(newY){
      this.changeDom(newY)
    }
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
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }

  to {
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
  display flex
  flex-direction column
  .bar
    color #fff
    position absolute
    top 0
    left 0
    width 100%
    height 100px
    background linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0))
    display flex
    align-items center
    justify-content center
    z-index 99
    .back
      extend-click()
      margin-left 40px
      position absolute
      left 20px
      font-size 38px
    .title
      font-size 34px
  .top
    position relative
    width 100%
    height 0
    padding-top 80%
    transform-origin top
    overflow hidden
    img
      position absolute
      top 0
      left 0
      width 100%
      height 100%
    .filter
      position absolute
      top 0
      bottom 0
      left 0
      right 0
      z-index 10
      background: rgba(7, 17, 27, 0.4)
      opacity 0
      transform translateZ(0)
      transition opacity 1s
  .next-wrap
    position absolute
    bottom 0
    top 0
    left 0
    right 0
    z-index 8
    .next
      background #f3f5f7
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
        .title
          font-size 28px
          color #07111b
          font-weight 500
        .des
          margin-top 12px
          font-size 24px
          line-height 48px
          color #4d555d
    .list
      height 600px
      box-sizing border-box
      padding 0 36px
      background #ffffff
      overflow auto
      .list-item
        padding 32px 0
        display flex
        flex-direction column
        border-1px-t(#e6e7e8)
        .list-item-top
          display flex
          color #93999f
          justify-content space-between
          font-size 20px
          align-items center
          .user
            display flex
            align-items center
            .user-avatar
              margin-left 13px
              width 24px
              height 24px
              border-radius 50%
        &:first-child:after
          display none
        .text
          display flex
          color #07111b
          font-size 22px
          margin-top 21px
          .icon
            font-size 24px
            margin-right 10px
            &.up
              color #00a0dc
            &.down
              color #b7bbbf
  </style>
