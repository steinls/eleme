<template>
  <div class="seller">
    <div class="seller-wrap">
      <div class="top">
        <div class="sell-wrap">
          <div class="name">{{seller.name}}</div>
          <div class="sell">
            <star :type="2" :number="seller.score"></star>
            <span class="month-sell">月售{{seller.sellCount}}单</span>
          </div>
        </div>

        <div class="favorite-wrap">
          <div class="icon icon-favorite"></div>
          <div class="text">已收藏</div>
        </div>
      </div>

      <div class="bottom">
        <div class="boxs">
          <div class="box">
            <div class="title">起送价</div>
            <div class="text">{{seller.minPrice}}</div>
          </div>
          <div class="box">
            <div class="title">商家配送</div>
            <div class="text">{{seller.deliveryPrice}}</div>
          </div>
          <div class="box">
            <div class="title">平均配送时间</div>
            <div class="text">{{seller.deliveryTime}}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="bulletin-wrap border-wrap-2px">
      <div class="bulletin">
        <div class="title">
          公告与活动
        </div>
        <div class="text">
          {{seller.bulletin}}
        </div>
      </div>
      <div class="labels">
        <div class="label" v-for="(item, key) in seller.supports" :key="key">
          <brand-map :type="item.type" :size="1"></brand-map>
          <div class="text">{{item.description}}</div>
        </div>
      </div>
    </div>

    <div class="overview border-wrap-2px">
      <div class="title">
        商家实景
      </div>
      <b-scroll ref="views" :scrollX="true" class="views">
        <div class="views-cont" ref="viewsCont" >
          <!-- <div ref="view" class="view" v-for="(item, key) in seller.pics" :key="key">
            <img :src="item" alt="">
          </div> -->
        </div>
      </b-scroll>
    </div>
  </div>
</template>
<script>
import Star from 'components/star/star.vue'
import BrandMap from 'components/brand-map/brand-map.vue'
import BScroll from 'base/b-scroll/b-scroll.vue'

export default {
  props: {
    seller: {
      type: Object,
      default: null
    }
  },
  mounted(){
    this.$nextTick(() => {
      // console.log(this.$refs.viewsCont)
      // let width = this.$refs.view.clientWidth
      // this.$refs.viewsCont.style.background = 'red'
      // this.$refs.viewsCont.style.width = 2000 + 'px'
      // this.$refs.views.refresh()

    })
  },
  components: {
    Star,
    BrandMap,
    BScroll
  }
}
</script>
<style lang="stylus">
@import '../../common/stylus/mixin.styl'

.seller
  overflow auto
  position fixed
  top 352px
  left 0
  right 0
  bottom 0
  background #f3f5f7
  .border-wrap-2px
    padding 0 36px
    border-top 2px solid #e6e7e8
    border-bottom 2px solid #e6e7e8
    .title
        font-size 28px
        color #07111b
  .seller-wrap
    box-sizing border-box
    padding 36px
    border-bottom 2px solid #e6e7e8
    margin-bottom 33px
    background #ffffff
    .top
      border-1px-b(#e6e7e8)
      padding-bottom 32px
      display flex
      justify-content space-between
      .sell-wrap
        .name
          font-size 30px
          color #07111b
          font-weight 500px
          margin-bottom 18px
        .sell
          display flex
          align-items center
          font-size 18px
          color #4d555d
          .month-sell
            margin-left 22px
      .favorite-wrap
        font-size 42px
        text-align center
        .icon
          color #f01414
          margin-bottom 10px
        .text
          font-size 18px
    .bottom
      .boxs
        display flex
        height 80px
        margin-top 35px
        .box
          flex 1
          text-align center
          border-1px-r(#e6e7e8)
          &:last-child:after
            display none
          .title
            color #93999f
            font-size 18px
            margin-bottom 16px
          .text
            color #07111b
            font-size 38px
  .bulletin-wrap
    box-sizing border-box
    background #ffffff
    margin-bottom 33px
    .bulletin
      padding 36px 0
      .title
        margin-bottom 17px
      .text
        font-size 22px
        color #f24b4b
        line-height 46px
        padding 0 30px 0 25px
    .label
      height 97px
      border-1px-t(#e6e7e8)
      padding 0 24px
      display flex
      align-items center
      font-size 22px
      color #07111b
      .text
        margin-left 12px
  .overview
    height 304px
    background #ffffff
    padding-top 33px
    .title
      margin-bottom 33px
    .views
      width 200px
      height 180px
      overview auto
      .views-cont
        width 400px
        height 400px
        background red
        // .view
        //   width 240px
        //   height 180px
        //   padding-right 12px
        //   &:last-child
        //     padding-right 0
</style>
