<template>
  <b-scroll class="ratings">
    <div class="score-wrap">
      <div class="cont">
        <div class="left">
          <div class="total-score-wrap">
            <div class="total-score">{{seller.score}}</div>
            <div class="name">综合评分</div>
          </div>
          <div class="des">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="right">
          <div class="center">
            <div class="text">
              <div class="title">
                服务评分
              </div>
              <star :type="2" :number="seller.serviceScore"></star>
            </div>
            <div class="text">
              <div class="title">
                商品评分
              </div>
              <star :type="2" :number="seller.foodScore"></star>
            </div>
            <div class="text">
              <div class="title">
                送达时间
              </div>
              <div class="date">
                {{seller.deliveryTime}}分钟
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- 评论 -->
    <rating-type @change="select" @filterEmpty="filterEmpty" :data="ratings" :type="['全部','满意','不满意']"></rating-type>
    <div class="list" :data="ratings">
      <div class="list-item" v-for="(item, key) in ratings" :key="key" v-if="showType(item.rateType, item.text)">
        <div class="top">
          <div class="user">
            <div class="user-avatar"><img :src="item.avatar" alt=""></div>
            <div class="right">
              <div class="user-name">{{item.username}}</div>
              <div class="star">
                <star :type="1" :number="item.score"></star>
              </div>
            </div>
          </div>
          <div class="date">{{item.rateTime | toDate}}</div>
        </div>

        <div class="bottom">
          <div class="text">{{item.text}}</div>
          <div class="labels-wrap">
            <div class="icon" :class="isLaud(item.rateType)"></div>
            <div class="labels" v-if="item.recommend.length">
              <div class="labels-item" v-for="label in item.recommend">
                {{label}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </b-scroll>
</template>
<script>
import RatingType from 'components/rating-type/rating-type.vue'
import BScroll from 'base/b-scroll/b-scroll.vue'
import Star from 'components/star/star.vue'
import {ERR_OK} from 'api/config.js'
import {ratingTypeMixin} from 'vmixin/ratingTypeMixin.js'

export default {
  props: {
    seller: {
      type: Object
    }
  },
  mixins: [ratingTypeMixin],
  data () {
    return {
      ratings: []
    }
  },
  mounted(){
    this.$http.get('api/ratings').then((res) => {
      let response = res.data
      if (response.errno === ERR_OK) {
        this.ratings = response.data
        console.log(this.ratings)
      }
    })
  },
  components: {
    RatingType,
    BScroll,
    Star
  }
}
</script>
<style lang="stylus">
@import '../../common/stylus/mixin.styl'

.ratings
  position fixed
  top 352px
  left 0
  right 0
  bottom 96px
  display flex
  flex-direction column
  overflow auto
  background #f3f5f7
  .score-wrap
    box-sizing border-box
    padding 36px 0
    overflow hidden
    height 214px
    background #ffffff
    .cont
      display flex
      .left
        height 100%
        width 278px
        text-align center
        border-1px-r(#e6e7e8)
        .total-score-wrap
          margin-top 8px
          .total-score
            font-size 44px
            color #ff9900
          .name
            margin-top 20px
            font-size 24px
            color #07111b
        .des
          margin-top 16px
          font-size 18px
          color #93999f
      .right
        flex 1
        margin-top 8px
        .center
          width 375px
          height 130px
          margin auto
          .text
            display flex
            font-size 24px
            color #07111b
            margin-bottom 27px
            &:after
              margin 0
            .title
              margin-right 24px
            .date
              color #93999f
  .list
    flex 1
    .list-item
      box-sizing border-box
      padding 36px
      min-height 263px
      border-1px-t(#e6e7e8)
      display flex
      flex-direction column
      color #07111b
      background #ffffff
      .top
        display flex
        justify-content space-between
        font-size 20px
        .user
          display flex
          .user-avatar
            width 60px
            height 60px
            border-radius 50%
            overflow hidden
            margin-right 24px
            img
              width 100%
              height 100%
          .right
            display flex
            flex-direction column
            div
              flex 1
              display flex
              align-items center
        .date
          color #93999f
      .bottom
        margin-top 12px
        padding 0 10px 0 80px
        .text
          font-size 24px
          line-height 40px
        .labels-wrap
          margin-top 22px
          display flex
          // height 32px
          .icon
            position relative
            top 3px
            font-size 24px
            &.up
              color #00a0dc
            &.down
              color #b7bbbf
          .labels
            font-size 20px
            color #a4a9ae
            overflow hidden
            .labels-item
              float left
              box-sizing border-box
              width 125px
              height 34px
              margin-left 15px
              margin-bottom 10px
              padding 6px 11px
              text-align center
              overflow hidden
              text-overflow ellipsis
              white-space nowrap
              align-items center
              borde-radius 2px
              border 1px solid #e6e7e8
</style>
