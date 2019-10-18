<template>
  <b-scroll class="seller">
    <div class="seller-wrap">
      <div class="top">
        <div class="sell-wrap">
          <div class="name">{{seller.name}}</div>
          <div class="sell">
            <star :type="2" :number="seller.score"></star>
            <span class="month-sell">月售{{seller.sellCount}}单</span>
          </div>
        </div>

        <div class="favorite-wrap" @click="tagFavorite" :class="{active: isFavorite}">
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
      <b-scroll ref="views" :scrollY="false" :scrollX="true" class="views">
        <div ref="view" class="view" v-for="(item, key) in seller.pics" :key="key">
          <img :src="item" alt="">
        </div>
      </b-scroll>
    </div>

    <div class="seller-info-wrap border-wrap-2px">
      <div class="title">商家信息</div>
      <div class="seller-info">
        <div class="seller-info-item" v-for="(item, key) in seller.infos" :key="key">
          {{item}}
        </div>
      </div>
    </div>
  </b-scroll>
</template>
<script>
import Star from 'components/star/star.vue'
import BrandMap from 'components/brand-map/brand-map.vue'
import BScroll from 'base/b-scroll/b-scroll.vue'

export default {
  data(){
    return {
      isFavorite: true
    }
  },
  props: {
    seller: {
      type: Object,
      default: null
    }
  },
  mounted(){
    this.$nextTick(() => {
      let width = this.$refs.view[0].clientWidth
      this.$refs.views.$el.childNodes[0].style.width = width * this.seller.pics.length + 'px'
      this.$refs.views.$el.childNodes[0].style.display = 'flex'
      this.$refs.views.refresh()
    })
  },
  methods: {
    tagFavorite(){
      this.isFavorite = !this.isFavorite
    }
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
    background #ffffff
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
        &.active .icon
          color #f01414
        .icon
          color gray
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
    padding-top 33px
    margin-bottom 33px
    .title
      margin-bottom 33px
    .views
      width 100%
      height 180px
      overview hidden
      .view
        width 240px
        height 180px
        padding-right 12px
        &:last-child
          padding-right 0
        img
          width 100%
          height 100%
  .seller-info-wrap
    padding-top 36px
    .seller-info
      margin-top 24px
      padding 0 36px
      .seller-info-item
        padding 36px 22px
        font-size 24px
        line-height 36px
        color #07111b
        border-1px-t(#e6e7e8)
</style>
