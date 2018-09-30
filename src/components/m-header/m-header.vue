<template>
  <div class="header">
    <!-- 背景 -->
    <div class="bg">
      <img :src="seller.avatar" alt="">
    </div>

    <div class="top">
      <div class="content-wrap">
        <div class="content">
          <div class="avatar">
            <img :src="seller.avatar" alt="">
          </div>

          <div class="massage">
            <div class="name">
              <div class="brand"></div>
              <div class="text">
                {{seller.name}}
              </div>
            </div>

            <div class="time">
              {{seller.description}} / {{seller.deliveryTime}} 分钟送达
            </div>

            <div class="offer" v-if="seller.supports">
              <brand-map></brand-map>
              <div class="text">
                {{seller.supports[0].description}}
              </div>
            </div>

            <span class="offer-count" v-if="seller.supports" @click="showOfferDetail">
              {{seller.supports.length}}个
              <span class="icon icon-keyboard_arrow_right"></span>
            </span>
          </div>
        </div>
      </div>
      <div class="info" @click="showOfferDetail">
        <div class="bulletin"></div>
        <div class="text">
          {{seller.bulletin}}
        </div>
        <span class="icon icon-keyboard_arrow_right"></span>
      </div>
    </div>

    <transition name="fade">
      <div class="sheet" v-if="offerDetail">
        <div class="detail">
          <div class="name">{{seller.name}}</div>

          <star :number="seller.score" :type="3"></star>

          <div class="supprts-wrap" v-if="seller.supports">
            <div class="title-wrap">
              <div class="title">
                优惠信息
              </div>
            </div>

            <ul class="supprts" >
              <li class="supprts-item" v-for="(item,key) in seller.supports" :key="key">
                <brand-map :type="item.type" :size="1"></brand-map>
                <div class="text">{{item.description}}</div>
              </li>
            </ul>
          </div>

          <div class="seller">
            <div class="title-wrap">
              <div class="title">
                商家公告
              </div>
            </div>

            <div class="seller-bulletin">
              {{seller.bulletin}}
            </div>
          </div>
        </div>
        <div class="close">
          <i @click="hideOfferDetail" class="icon icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import Star from 'components/star/star.vue'
import BrandMap from 'components/brand-map/brand-map.vue'

export default {
  data(){
    return {
      offerDetail: false,
      supprts: [
        'decrease',
        'discount',
        'special',
        'invoice',
        'guarantee'
      ]
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  methods: {
    showOfferDetail() {
      this.offerDetail = true
    },
    hideOfferDetail() {
      this.offerDetail = false
    }
  },
  components: {
    Star,
    BrandMap
  }
}
</script>
<style lang="stylus">
@import '../../common/stylus/mixin.styl'
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.filter-blur
.header
  font-family '微软雅黑'
  position relative
  display flex
  height 268px
  color #fff
  .bg
    display flex
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    overflow hidden
    z-index 0
    img
      height 132%
      width 100%
      bottom 0
      position absolute
      filter blur(10px)
    &:after
      content ''
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      background rgba(7,17,27,0.6)
  .top
    flex 1
    position relative
    .content-wrap
      display flex
      box-sizing border-box
      height:212px
      padding 48px 24px 30px 48px
      .content
        position relative
        display flex
        flex 1
        .avatar
          width 128px
          height 128px
          overflow hidden
          border-radius 4px
          margin-right 32px
          img
            width 100%
            height 100%
        .massage
          flex 1
          font-size 32px
          .name
            display flex
            align-items center
            margin-top 4px
            margin-bottom 12px
            .brand
              width 60px
              height 36px
              bg-image('brand')
              background-repeat no-repeat
              background-size 100% 100%
              border-radius 3px
              margin-right 12px
            .text
              font-weight bold
          .time
            height 24px
            font-size 24px
            margin-bottom 20px
          .offer
            display flex
            font-size 20px
            .brand-map
              margin-right 9px
        .offer-count
          position absolute
          right 0
          bottom 0
          padding 16px 20px
          border-radius 25px
          font-size 18px
          background rgba(7,17,27,0.6)
    .info
      display flex
      align-items center
      box-sizing border-box
      height 56px
      font-size 24px
      background rgba(7,17,27,0.6)
      padding 0 24px
      .bulletin
        width 44px
        height 24px
        background-repeat no-repeat
        background-size 100% 100%
        bg-image('bulletin')
        margin-right 12px
      .text
        flex 1
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width 400px
  .sheet
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background rgba(7,17,27,0.6)
    z-index 99
    overflow auto
    .detail
      width 100%
      min-height 100%
      box-sizing border-box
      padding 130px 72px 140px 72px
      backdrop-filter blur(10px)
      .name
        font-size 32px
        line-hegiht 32px
        text-align center
        font-weight bold
        margin-bottom 36px
      .star-wrap
        justify-content center
        margin-bottom 62px
      .title-wrap
          display flex
          align-items center
          height 30px
          font-size 30px
          font-weight bold
          margin-bottom 47px
          &:before
            flex 1
            content ''
            height 2px
            background #61676d
          &:after
            flex 1
            content ''
            height 2px
            background #61676d
          .title
            padding 0 24px
      .supprts-wrap
        margin-bottom 56px
        .supprts
          padding-left 26px
          .supprts-item
            display flex
            align-items center
            height 32px
            font-size 24px
            margin-bottom 24px
            &:last-child
              margin-bottom 0
            .brand-map
              margin-right 12px
      .seller
        .seller-bulletin
          font-size 24px
          line-height 52px
          padding 0 26px
    .close
      position relative
      z-index 3
      margin-top -116px
      text-align center
      .icon
        extend-click()
</style>
