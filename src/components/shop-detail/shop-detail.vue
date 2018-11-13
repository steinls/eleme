<template>
  <transition name="fadeInRight">
    <div class="shop-detail" v-if="ishow">
      <div ref="bar" class="bar">
        <div class="back icon-arrow_lift" @click="hide()"></div>
        <div class="title">
          {{shop.name}}
        </div>
      </div>
      <!-- 图片 -->
      <div ref="bgBox" class="top">
        <img ref="bgImg" :src="shop.image" alt="">
        <div ref="filter" class="filter"></div>
      </div>

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
                   <div class="rating">
                     <div class="rating-info">
                       <div class="date">{{item.rateTime|dateParse}}</div>
                       <div class="user">{{item.username}}</div>
                     </div>
                     <div class="text"><span class="icon" :class="getIcon(item.rateType)"></span>{{item.text || '暂无评论，默认好评！'}}</div>
                   </div>
                 </div>
                 <div class="empty" v-if="!currentRatings.length">
                   <div>暂无数据！</div>
                 </div>
               </div>
            </div>
          </div>
      </b-scroll>

    </div>
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
      haveCont: false,
      scrollY: 0
    }
  },
  created(){
    this.BAR_HEIGHT = 0
    this.BG_Height = 0
  },
  methods: {
    show(){
      this.ishow = true

      this.$nextTick(() => {
        // 初始化参数
        this.BAR_HEIGHT = this.$refs.bar.clientHeight
        this.BG_HEIGHT = this.$refs.bgBox.clientHeight
        this.MIN_SCROLLY = this.BAR_HEIGHT - this.BG_HEIGHT

        this.selected = 'all'
        this.haveCont = false

        // 调整scroll位置
        // 重绘
        let h = this.$refs.bgBox.clientHeight
        let scroll = this.$refs.scroll
        scroll.$el.style.top = `${h}px`
        scroll.refresh()
      })
    },
    hide(){
      this.ishow = false
    },
    select(param){
      this.selected = param
      // this.changeDom(this.$refs.scroll.$el.style.top)
    },
    getIcon(type){
      return !type ? 'icon-thumb_up up' : 'icon-thumb_down down'
    },
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
        this.$refs.bgImg.style.filter = `blur(${Math.min(zoom * 20, 20)}px)`
      }

      if (newY < this.MIN_SCROLLY) {
        Object.assign(this.$refs.bgBox.style, {
          height: `${this.BAR_HEIGHT}px`,
          paddingTop: 0,
          zIndex: 10
        })

        Object.assign(this.$refs.bgImg.style, {
          height: `${this.BG_HEIGHT}px`
        })

        Object.assign(this.$refs.filter.style, {
          display: 'block'
        })
      } else {
        Object.assign(this.$refs.bgBox.style, {
          height: 0,
          paddingTop: '80%',
          zIndex: 1
        })

        Object.assign(this.$refs.filter.style, {
          display: 'none'
        })
      }
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
    // opacity: 0.3;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }

  to {
    // opacity: 1;
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
    transform translate3d(0, 0, 0)
    img
      position absolute
      top 0
      left 0
      width 100%
      height 100%
    .filter
      transform3d translate3d(0,0,0)
      position absolute
      top 0
      bottom 0
      left 0
      right 0
      z-index 10
      filter blur(3px)
      background: rgba(7, 17, 27, 0.1)
      display none
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
        font-size 28px
        .des
          margin-top 12px
          font-size 24px
          line-height 48px
      .ratings-wrap
        box-sizing border-box
        margin-top 32px
        border-top 2px solid #e6e7e8
        width 100%
        .rating-top
          box-sizing border-box
          padding 36px
          padding-bottom 0
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
        .ratings
          height 600px
          overflow auto
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
      .empty
        font-size 26px
        color gray
        display flex
        justify-content center
        align-items center
        height 260px
  </style>
