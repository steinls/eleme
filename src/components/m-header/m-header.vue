<template>
  <div class="header">
    <div class="content-wrap">
      <div class="top">
        <div class="avatar">
          <img :src="seller.avatar" alt="">
        </div>
        <div class="content">
          <div class="name">
            <div class="brand"></div>
            <div class="text">{{seller.name}}</div>
          </div>
          <div class="arrival">
            {{seller.description}} / {{seller.deliveryTime}}分钟送达
          </div>
          <div class="offer" v-if="seller.supports">
            <span class="icon"></span>
            <div class="text">{{seller.supports[0].description}}</div>
          </div>
          <div class="offer-count" v-if="seller.supports">
            <span class="count">{{seller.supports.length}}个</span>
            <span class="icon icon-keyboard_arrow_right"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="info">
      <div class="post"></div>
      <div class="text">
        {{seller.bulletin}}
      </div>
      <span class="icon icon-keyboard_arrow_right"></span>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    seller: {
      type: Object
    }
  }
}
</script>
<style lang="stylus">
@import '../../common/stylus/mixin.styl'
.header
  background:gray
  .content-wrap
    box-sizing:border-box
    height:214px
    width:100%
    padding-left:46px
    padding-top:48px
    padding-right:24px
    padding-bottom:30px
    .top
      position:relative
      display:flex
      width:100%
      height:100%
      color:#fff
      .avatar
        width:128px
        height:128px
        overflow:hidden
        border-radius:4px
        margin-right:30px
        img
          width:100%
          height:100%
      .content
        .name
          display:flex
          height:36px
          margin-top:4px
          align-items:center
          .brand
            width:60px
            height:36px
            bg-image('brand')
            margin-right:13px
          .text
            font-size:30px
        .arrival
          font-size:23px
          line-height:23px
          margin-top:13px
        .offer
          display:flex
          margin-top:20px
          align-items:center
          .icon
            width:24px
            height:24px
            bg-image('decrease_1')
            margin-right:8px
          .text
            font-size:18px
        .offer-count
          padding:16px 20px
          font-size:18px
          position:absolute
          right:0px
          bottom:0px
          background:rgba(0,0,0,0.5)
          overflow:hidden
          border-radius:24px
  .info
    display:flex
    height:55px
    padding:0 24px
    font-size:20px
    color:#fff
    width:100%
    align-items:center
    .post
      width:44px
      height:24px
      bg-image('bulletin')
      margin-right:8px
    .text
      width:624px
      overflow:hidden
      text-overflow:ellipsis
      white-space:nowrap
</style>
